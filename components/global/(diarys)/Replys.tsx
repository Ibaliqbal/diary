"use client";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import ReplyCommentForm from "@/components/auth/ReplyCommentForm";
import { ICooments } from "@/utils/supabase";
import { UUID } from "crypto";
import CommentAction from "./CommentAction";

export const revalidate = 0;

type Props = {
  diary_id: number;
  data: ICooments[] | undefined;
  setCommentId: React.Dispatch<React.SetStateAction<UUID | undefined>>;
  commentId: UUID | undefined;
  comment_id: UUID | undefined;
  email_user: string | undefined;
};

const Replys = ({
  data,
  diary_id,
  commentId,
  setCommentId,
  comment_id,
  email_user,
}: Props) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="divider"></div>
      {data?.map((reply, i) => {
        return (
          <Comment comment={reply} key={reply.id}>
            <CommentAction
              diary_id={diary_id}
              id={comment_id}
              type="reply"
              reply_id={reply.id}
              email={reply.email}
              email_user={email_user}
            >
              <label
                htmlFor="my_modal_7"
                className="text-2xl cursor-pointer"
                onClick={() => setCommentId(reply.id)}
              >
                <i className="bx bxs-message-dots" />
              </label>
            </CommentAction>
          </Comment>
        );
      })}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal modal-scroll" role="dialog">
        <div className="modal-box">
          <ReplyCommentForm
            diary_id={diary_id}
            id={commentId}
            modal_id="my_modal_7"
            replys_to_reply={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Replys;
