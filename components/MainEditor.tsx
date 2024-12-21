"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { initiate } from "@/app/_utils/Editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

export default function MainEditor({
  data,
}: {
  data?: { title: string; content: string; id?: string };
}) {
  const ref = useRef<EditorJS | undefined>(undefined);
  const { postid } = useParams();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const router = useRouter();

  const formHandler: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (ref.current) {
      const editorData = await ref.current.save();
      const response = await fetch("/api/user/posts/create", {
        method: "POST",
        body: JSON.stringify({
          id: postid,
          ...data,
          content: editorData,
        }),
        credentials: "include",
      });
      const postData = await response.json();
      if (response.ok && postData.status === 200) {
        router.push(`/post/${postData.data.id}`);
      } else {
        setError("title", {
          type: "manual",
          message: postData.message || "Something went wrong",
        });
      }
    } else {
      setError("title", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (data) {
      initiate(ref, JSON.parse(data.content));
      if (data.title) setValue("title", data.title);
    } else initiate(ref);

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="border border-border p-2">
        <form
          onSubmit={handleSubmit(formHandler)}
          className="flex flex-col gap-2 min-h-[85vh]"
        >
          {errors.title && (
            <p className="text-red-500">{errors.title.message as String}</p>
          )}
          <Input
            type="text"
            className="md:text-2xl font-semibold p-6 text-center"
            placeholder="Title"
            {...register("title", {
              required: "Title for your story is required",
              maxLength: 60,
            })}
          ></Input>
          <div
            className="border border-border rounded-md flex-grow"
            id="editorjs"
          ></div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="disabled:bg-gray-400"
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
