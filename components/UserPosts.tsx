"use client";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Prisma } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Post = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

export function UserPosts({
  userid,
  personal,
}: {
  userid: string;
  personal: boolean;
}) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <GetUserPosts userid={userid} personal={personal} />
    </QueryClientProvider>
  );
}

function GetUserPosts({
  userid,
  personal,
}: {
  userid: string;
  personal: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return fetchUserPosts(userid, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const value =
        lastPage.currPage + 1 <= lastPage.pages
          ? lastPage.currPage + 1
          : undefined;
      return value;
    },
    getPreviousPageParam: (firstPage, pages) => {
      const value =
        firstPage.currPage - 1 >= 1 ? firstPage.currPage - 1 : undefined;
      return value;
    },
    maxPages: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "pending")
    return (
      <div className="flex items-center justify-center h-[75vh] animate-spin">
        <CgSpinner size={50} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      {error && <div>{error.message}</div>}
      {data?.pages.map(
        (page: { data: Post[]; currPage: number; pages: number }) =>
          page.data.map((post: Post) => {
            return (
              <div
                key={post.id}
                className="flex flex-nowrap justify-between items-center rounded-lg border border-border p-3 m-2 hover:bg-secondary hover:text-secondary-foreground hover:p-4 transition-all ease-in-out"
              >
                <Link href={`/post/${post.id}`} className="max-w-[75%]">
                  <h2 className="text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.title}
                  </h2>
                </Link>
                {personal && (
                  <div>
                    <Link
                      href={`/post/${post.id}/edit`}
                      className="text-secondary-foreground md:p-2 hover:underline hover:rounded-md p-1"
                    >
                      <span>
                        <MdEdit className="inline" size={"1.5rem"} />
                      </span>
                    </Link>
                    <span className="text-2xl text-gray-500 dark:text-gray-300">
                      |
                    </span>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button>
                          <span>
                            <MdDelete className="inline" size={"1.5rem"} />
                          </span>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {`Do you want to delete "${post.title}"?`}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post!!
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              const response = await axios.delete(
                                `/api/posts`,
                                {
                                  data: {
                                    postid: post.id,
                                  },
                                }
                              );
                              // console.log(response);
                              if (response.status === 200) {
                                // window.location.reload();
                                refetch();
                              }
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            );
          })
      )}
      {hasNextPage && <div ref={ref}></div>}
      {isFetchingNextPage && (
        <CgSpinner size={50} className="animate-spin mx-auto" />
      )}
    </div>
  );
}

async function fetchUserPosts(userid: string, pageParam: number = 1) {
  const response = await axios.get(
    `/api/user/posts?userid=${userid}&page=${pageParam}`
  );
  if (response.status !== 200) throw new Error("Something went wrong");
  return { ...response.data };
}
