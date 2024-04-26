import { ICooments, IDiary } from "@/utils/supabase";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";

const Comments = ({ data }: { data: any[] | undefined }) => {
  return (
    <div className="flex flex-col gap-4 md:col-span-3">
      {data?.map((comment: ICooments) => {
        return (
          <div
            key={comment.id}
            className="card card-body card-bordered mt-4 pt-4 shadow-lg shadow-black"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={comment.avatar as string}
                alt={(comment.username as string) || (comment.email as string)}
                width={70}
                height={70}
                className="rounded-full"
              />
              <div className="flex flex-col justify-between gap-5">
                <h4>{comment.username || comment.email}</h4>
                <p>
                  {formatDistance(comment.created_at as Date, new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        );
      })}
      <div className="divider"></div>
    </div>
  );
};

export default Comments;
