import { diaryAction } from "@/actions/diary";
import React from "react";

type Props = {
  edit: boolean;
  content?: string;
  diary_id?: number | undefined;
};

const CreateDiaryForm = ({ edit, content, diary_id }: Props) => {
  const actions = !edit ? diaryAction.create : diaryAction.edit;
  return (
    <form
      action={actions}
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
