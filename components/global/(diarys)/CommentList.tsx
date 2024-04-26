"use client";
import { ICooments } from "@/utils/supabase";
import React, { useState } from "react";
import ReplyCommentForm from "@/components/auth/ReplyCommentForm";
import { UUID } from "crypto";
import { paginate } from "@/utils/paginate";
import Comment from "./Comment";
import Replys from "./Replys";
import CommentAction from "./CommentAction";

type ContenListPorps = {
  diary_id: number;
  data: any;
  email_user: string | undefined;
};

export type PaginateRepyls = {
  id: number | UUID;
  status: boolean;
  data: any[];
};

const CommentList = ({ diary_id, data, email_user }: ContenListPorps) => {
  const [open, setOpen] = useState<PaginateRepyls[]>([]);
  const limit = 3;
  const [commentId, setCommentId] = useState<UUID>();
  return (
    <div className="flex flex-col gap-4">
      {data?.map((comment: ICooments, i: number) => {
        return (
          <section
            key={comment.id}
            className="shadow-lg shadow-black p-4 pb-8 flex flex-col gap-4 rounded-md"
          >
            <Comment comment={comment}>
              <CommentAction
                diary_id={diary_id}
                id={comment.id}
                email={comment.email}
                type="comment"
                email_user={email_user}
              >
                <label
                  htmlFor="my_modal_6"
                  className="text-2xl cursor-pointer"
                  onClick={() => setCommentId(comment.id)}
                >
                  <i className="bx bxs-message-dots" />
                </label>
              </CommentAction>
            </Comment>
            {open.find((o) => o.id === comment.id) &&
            open.find((o) => o.id === comment.id)?.status ? (
              <Replys
                data={open.find((reply) => reply.id === comment.id)?.data}
                diary_id={diary_id}
                commentId={commentId}
                setCommentId={setCommentId}
                comment_id={comment.id}
                email_user={email_user}
              />
            ) : null}
            {comment.comments?.length || 0 > 0 ? (
              comment.comments?.length ===
              open.find((reply) => reply.id === comment.id)?.data.length ? (
                <button
                  className="btn btn-lg btn-ghost"
                  onClick={() => {
                    setOpen((prev: PaginateRepyls[]) =>
                      prev.filter((reply) => reply.id !== comment.id)
                    );
                  }}
                >
                  Hidden reply
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-ghost"
                  onClick={() => {
                    setOpen((prev: PaginateRepyls[]) => {
                      const findLastPaginate = prev.find(
                        (d) => d.id === comment.id
                      );
                      const findIndex = open.findIndex(
                        (d) => d.id === comment.id
                      );
                      const findReplys = comment.comments || [];
                      const updatePaginate =
                        findLastPaginate !== undefined
                          ? prev.with(findIndex, {
                              ...prev[findIndex],
                              data: [
                                ...prev[findIndex].data,
                                ...paginate(
                                  prev[findIndex].data.length,
                                  prev[findIndex].data.length + limit,
                                  findReplys
                                ),
                              ],
                            })
                          : [
                              ...prev,
                              {
                                id: comment.id,
                                status: true,
                                data: paginate(0, limit, findReplys),
                              },
                            ];
                      return updatePaginate;
                    });
                  }}
                >
                  Show reply
                </button>
              )
            ) : null}
          </section>
        );
      })}
      <div className="divider"></div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal modal-scroll" role="dialog">
        <div className="modal-box">
          <ReplyCommentForm
            diary_id={diary_id}
            id={commentId}
            modal_id="my_modal_6"
            replys_to_reply={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentList;
