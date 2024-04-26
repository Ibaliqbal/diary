import {
  createDiaryAction,
  deleteDiary,
  editDiaryAction,
  favDiary,
} from "./diaryAction";

export const diaryAction = {
  create: createDiaryAction,
  delete: (id: number | undefined) => deleteDiary(id),
  edit: editDiaryAction,
  favorite: (id: number | undefined, red: string, type: "like" | "unlike") =>
    favDiary(id, red, type),
};
