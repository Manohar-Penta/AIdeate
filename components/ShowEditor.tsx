"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { initiate } from "@/app/_utils/Editor";

export function ShowEditorPage({
  data,
}: {
  data: { content: string; title: string };
}) {
  const ref = useRef<EditorJS | undefined>(undefined);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const jsonContent = JSON.parse(data.content);

    setTitle(data.title);
    initiate(ref, jsonContent, true);

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="border border-border p-2">
        <h1 className="text-2xl md:text-4xl font-bold p-6 text-center text-primary">
          {title}
        </h1>
        <div
          className="border border-border rounded-md flex-grow min-h-[95vh]"
          id="editorjs"
        ></div>
      </div>
    </>
  );
}
