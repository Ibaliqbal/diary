"use client";
import { commentAction } from "@/actions/comment";
import { useRouter } from "next/navigation";
import React, { RefObject, useRef } from "react";

type CommentFormProps = {
  diary_id: string;
};

const CommentsForm = ({ diary_id }: CommentFormProps) => {
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const resetForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(formRef.current as HTMLFormElement);
    const result = await commentAction.create(form);
    if (result === false) {
      router.push("/sign-in");
    }
    setTimeout(() => {
      formRef.current?.reset();
    }, 1000);
  };
  return (
    <form
      onSubmit={(e) => resetForm(e)}
      ref={formRef}
      className="flex flex-col gap-4 mx-auto w-full"
    >
      <textarea
        placeholder="Tuliskan komentar anda"
        className="h-52 p-4 text-lg border border-primary textarea resize-none"
        name="content"
      />
      <input type="hidden" value={diary_id} name="diary_id" />
      <button type="submit" className="btn btn-primary max-w-sm w-full mx-auto">
        Comment Now
      </button>
    </form>
  );
};

export default CommentsForm;
