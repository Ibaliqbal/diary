import React from "react";
import Image from "next/image";
import { getUser, IDiary } from "@/utils/supabase";
import Link from "next/link";
import { formatDistance } from "date-fns";
import UserAction from "./UserAction";
import CardLayout from "../CardLayout";

const Card = async ({
  diary_id,
  avatar,
  content,
  email,
  username,
  created_at,
  likes,
}: IDiary) => {
  const user = await getUser();
  return (
    <CardLayout>
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={avatar as string}
          alt={avatar as string}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="font-semibold">{username || email}</p>
      </div>
      <p className="line-clamp-5 mb-4">{content}</p>
      <div className="flex justify-around items-center w-full">
        <p>
          Posted{" "}
          {formatDistance(new Date(created_at as string), new Date(), {
            addSuffix: true,
          })}
        </p>
        <Link href={`/diary/${diary_id}`}>See more</Link>
      </div>
      <UserAction
        diary_id={diary_id}
        userDetail={user![0]?.favorites}
        likes={likes}
      />
    </CardLayout>
  );
};

export default Card;
