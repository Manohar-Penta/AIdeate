"use client";

import { Prisma } from "@prisma/client";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

type Post = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

export default function AllPosts({ page }: { page: number }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <GetAllPosts page={page} />
    </QueryClientProvider>
  );
}

export function GetAllPosts({ page = 1 }: { page?: number }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
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

  if (error) return <div>{error.message}</div>;

  return (
    <div className="p-4 gap-2 flex flex-col relative max-w-5xl mx-auto">
      {data?.pages.map((page) =>
        page.data.map((post: Post) => {
          return (
            <Link href={`/post/${post.id}`} key={post.id} className="">
              <div className="border-2 border-border rounded-lg p-2 hover:text-secondary-foreground hover:bg-secondary hover:p-3 transition-all ease-in-out">
                <h2 className="text-xl md:text-3xl font-serif font-light overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {post.title}
                </h2>
                <div className="flex justify-start gap-2 items-center">
                  <div className="object-contain size-4">
                    <img
                      src={post.user.image as string}
                      alt=""
                      className="rounded-full border border-border"
                    />
                  </div>
                  <h3 className="text-xs">{post.user.name}</h3>
                </div>
              </div>
            </Link>
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

async function fetchAllPosts({ pageParam }: any) {
  const response = await axios.get(`/api/posts?page=${pageParam}`);
  if (response.status !== 200) throw new Error("Something went wrong");
  return { ...response.data };
}
