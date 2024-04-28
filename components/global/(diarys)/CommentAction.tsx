// "use client"
import { commentAction } from "@/actions/comment";
import { replyAction } from "@/actions/reply";
import { getUser } from "@/utils/supabase";
import { UUID } from "crypto";
import React from "react";
type Props = {
  children: React.ReactNode;
  diary_id: number;
  id: UUID | undefined;
  type: "comment" | "reply";
  reply_id?: UUID | undefined;
  email: string | undefined;
  email_user: string | undefined;
};

const CommentAction = ({
  children,
  diary_id,
  id,
  type,
  reply_id,
  email,
  email_user,
}: Props) => {
  const action = type === "comment" ? commentAction.delete : replyAction.delete;
  return (
    <ul className="menu rounded-box menu-horizontal mt-4">
      <li>{children}</li>
      {email === email_user ? (
        <li>
          <form action={action}>
            <input type="hidden" name="diary_id" value={diary_id} />
            <input type="hidden" name="comment_id" value={id} />
            {type === "reply" ? (
              <input type="hidden" name="reply_id" value={reply_id} />
            ) : null}
            <button type="submit">
              <i className="bx bx-trash-alt text-2xl" />
            </button>
          </form>
        </li>
      ) : null}
    </ul>
  );
};

export default CommentAction;
