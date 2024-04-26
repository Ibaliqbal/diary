"use client";
import { commentAction } from "@/actions/comment";
import React, { RefObject, useRef } from "react";

type CommentFormProps = {
  diary_id: string;
};

const CommentsForm = ({ diary_id }: CommentFormProps) => {
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const resetForm = () => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 1000);
  };
  return (
    <form
      action={commentAction.create}
      onSubmit={resetForm}
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
