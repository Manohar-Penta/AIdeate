"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 text-3xl text-center h-[75vh] flex flex-col items-center justify-center">
      <h2>{error.message}</h2>
    </div>
  );
}
