"use client";
import { replyAction } from "@/actions/reply";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  id: UUID | undefined;
  diary_id: number;
  modal_id: string;
  replys_to_reply: boolean;
};

const ReplyCommentForm = ({
  id,
  diary_id,
  modal_id,
  replys_to_reply,
}: Props) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.getElementById(modal_id) as HTMLInputElement;
    const form = e.target as HTMLFormElement;
    const data = {
      content: form.content.value,
      diary_id,
      comment_id: id,
    };
    const result = await replyAction.create(data, replys_to_reply);
    if (result === false) {
      router.push("/sign-in");
    }
    form.reset();
    input.checked = false;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-auto w-full"
    >
      <textarea
        placeholder="Tuliskan komentar anda"
        className="h-52 p-4 text-lg border border-primary textarea resize-none"
        name="content"
      />
      <input type="hidden" value={id || " "} name="comment_id" />
      <input type="hidden" value={diary_id} name="diary_id" />
      <div className="flex gap-5 md:gap-3 flex-col md:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary max-w-sm w-full mx-auto disabled:cursor-not-allowed disabled:bg-opacity-80"
        >
          Comment Now
        </button>
        <div className="modal-action mt-0">
          <label htmlFor={modal_id} className="btn">
            Close!
          </label>
        </div>
      </div>
    </form>
  );
};

export default ReplyCommentForm;
