import { UUID } from "crypto";
import { createCommentsAction, deleteCommentAction } from "./commentAction";

export const commentAction = {
  create: createCommentsAction,
  delete: deleteCommentAction,
};
