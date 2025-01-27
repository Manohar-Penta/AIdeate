"use server";

import { prisma } from "@/utils/prisma";

export async function followHandler(followerId: string, followeeId: string) {
  await prisma.followers.upsert({
    where: { userId_followerId: { userId: followeeId, followerId } },
    create: { userId: followeeId, followerId },
    update: {},
  });

  await prisma.following.upsert({
    where: {
      userId_followingId: { userId: followerId, followingId: followeeId },
    },
    create: { userId: followerId, followingId: followeeId },
    update: {},
  });
}

export async function unFollowHandler(followerId: string, followeeId: string) {
  await prisma.followers.delete({
    where: { userId_followerId: { userId: followeeId, followerId } },
  });

  await prisma.following.delete({
    where: {
      userId_followingId: { userId: followerId, followingId: followeeId },
    },
  });
}
