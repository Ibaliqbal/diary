import { UUID } from "crypto";
import { createReplyAction, deleteReplyAction } from "./replyAction";

export const replyAction = {
  create: (
    formData: {
      content: string;
      comment_id: UUID | undefined;
      diary_id: number;
    },
    reply_to_replys: boolean
  ) => createReplyAction(formData, reply_to_replys),
  delete: deleteReplyAction,
};
