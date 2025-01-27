"use client";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { CgSpinner } from "react-icons/cg";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FormData = {
  comment: string;
};

export function Comments({ postid }: { postid: string }) {
  const session = useSession();
  const client = new QueryClient();
  const { register, formState, handleSubmit, reset, setError } =
    useForm<FormData>();
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
      <div className="p-2">
        <h2 className="p-2 underline font-semibold">Comments</h2>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (!session.data || session.status !== "authenticated") {
            setError("comment", {
              type: "manual",
              message: "You must be logged in to comment",
            });
            return;
          }
          const response = await axios.post("/api/posts/comments", {
            userid: session.data?.user?.id,
            postid: postid,
            comment: data.comment,
          });
          reset();
          setRefresh((refresh) => !refresh);
        })}
        className="px-2 relative"
      >
        {formState.errors.comment && (
          <p className="text-destructive">{formState.errors.comment.message}</p>
        )}
        <Input
          type="text"
          {...register("comment", {
            required: true,
            disabled: formState.isSubmitting,
            validate: (value: string, FormData: FormData) => {
              if (value.trim() == "") return "Comment cannot be empty";
              return true;
            },
          })}
          placeholder="Leave your comment here..."
        />
        <Button
          type="submit"
          className="my-2 ml-auto mr-0 block"
          disabled={formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
      <QueryClientProvider client={client}>
        <CommentsComponent postid={postid} refresh={refresh} />
      </QueryClientProvider>
    </>
  );
}

type Comment = Prisma.CommentGetPayload<{ include: { user: true } }>;

function CommentsComponent({
  postid,
  refresh,
}: {
  postid: string;
  refresh: boolean;
}) {
  async function fetchComments({ pageParam }: { pageParam: number }) {
    const response = await axios.get(
      `/api/posts/comments?postid=${postid}&page=${pageParam}`
    );
    if (response.status !== 200) throw new Error("Something went wrong");
    // console.log(response.data);
    return { ...response.data };
  }
  const session = useSession();
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
    getNextPageParam: (lastPage, pages) => {
      // console.log(lastPage.currPage, lastPage.pages);
      const value =
        lastPage.currPage + 1 <= lastPage.pages
          ? lastPage.currPage + 1
          : undefined;
      // console.log(value);
      return value;
    },
    getPreviousPageParam: (firstPage, pages) => {
      const value =
        firstPage.currPage - 1 >= 1 ? firstPage.currPage - 1 : undefined;
      return value;
    },
    initialPageParam: 1,
    maxPages: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [refresh]);

  if (status === "pending")
    return (
      <div className="flex items-center justify-center h-[75vh] animate-spin">
        <CgSpinner size={50} />
      </div>
    );

  return (
    <div>
      {error && <div>{error.message}</div>}
      {data?.pages.map((page) => {
        return (
          <div key={page.currPage} className="p-3">
            {page.data.map((comment: Comment) => {
              // console.log(comment);
              return (
                <div key={comment.id} className="p-3 border-border border-b-2">
                  <p className="text-xl mb-2">{comment.message}</p>
                  <Link href={`/user/${comment.userId}/posts`}>
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.user?.image as string}
                        className="w-4 h-4 rounded-full"
                      />
                      <p
                        className={cn(
                          "text-sm",
                          session.data?.user?.id == comment.userId
                            ? "text-blue-400 font-semibold"
                            : ""
                        )}
                      >
                        {session.data?.user?.id == comment.userId
                          ? "You"
                          : comment.user?.name}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
      {hasNextPage && <div ref={ref}></div>}
      {isFetchingNextPage && (
        <CgSpinner size={50} className="animate-spin mx-auto" />
      )}
    </div>
  );
}
