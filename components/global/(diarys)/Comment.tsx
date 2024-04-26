import React from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { ICooments } from "@/utils/supabase";
import { motion } from "framer-motion";

type Props = {
  comment: ICooments;
  children?: React.ReactNode;
};

const Comment = ({ comment, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card card-body max-w-full w-full card-bordered mt-4 pt-4 shadow-lg shadow-black"
    >
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={comment.avatar as string}
          alt={(comment.username as string) || (comment.email as string)}
          width={70}
          height={70}
          className="rounded-full"
        />
        <div className="flex flex-col text-sm justify-between gap-5">
          <h4>{comment.username || comment.email}</h4>
          <p>
            {formatDistance(comment.created_at as Date, new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      {comment.reply_to ? (
        <p className="italic">Reply to : {comment.reply_to}</p>
      ) : null}
      <p>{comment.content}</p>
      {children}
    </motion.div>
  );
};

export default Comment;
