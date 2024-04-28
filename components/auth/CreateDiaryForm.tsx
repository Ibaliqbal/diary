"use client";
import { diaryAction } from "@/actions/diary";
import { useRouter } from "next/navigation";
import React, { RefObject, useRef } from "react";

type Props = {
  edit: boolean;
  content?: string;
  diary_id?: number | undefined;
};

const CreateDiaryForm = ({ edit, content, diary_id }: Props) => {
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const actions = !edit ? diaryAction.create : diaryAction.edit;
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(formRef.current as HTMLFormElement);
    const result = await actions(form);
    if (result === true) {
      router.push("/dashboard/my-diary");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
      className="flex flex-col col-span-3 gap-4 w-full mt-4 mx-auto pb-24"
    >
      <textarea
        placeholder="Isi diary"
        className="h-52 p-4 text-lg border border-primary textarea resize-none w-full"
        name="content"
        defaultValue={edit ? content : ""}
      />
      <input type="hidden" value={diary_id} name="diary_id" />
      <button type="submit" className="btn btn-primary">
        {edit ? "Edit" : "Create Now"}
      </button>
    </form>
  );
};

export default CreateDiaryForm;
