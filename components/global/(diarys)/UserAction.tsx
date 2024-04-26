"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { diaryAction } from "@/actions/diary";

const UserAction = ({
  diary_id,
  userDetail,
  likes,
}: {
  diary_id: number | undefined;
  userDetail: any;
  likes: number | undefined;
}) => {
  const pathname = usePathname();

  return pathname === "/dashboard/my-diary" ? (
    <div className="flex items-center gap-5 text-xl mt-4">
      <Link href={`/diary/${diary_id}/edit`}>
        <i className="bx bxs-edit-alt" />
      </Link>
      <form action={diaryAction.delete.bind(null, diary_id)}>
        <button type="submit">
          <i className="bx bxs-trash-alt" />
        </button>
      </form>
      <form
        action={diaryAction.favorite.bind(
          null,
          diary_id,
          "/dashboard/my-diary",
          userDetail?.includes(diary_id) ? "unlike" : "like"
        )}
      >
        <button type="submit" className="flex items-center gap-2 justify-start">
          <i
            className={`bx ${
              userDetail?.includes(diary_id) ? "bxs-heart" : "bx-heart"
            } text-2xl`}
          />
          {likes ? likes : 0}
        </button>
      </form>
    </div>
  ) : pathname === "/" || pathname === "/dashboard/favorite-diary" ? (
    <form
      action={diaryAction.favorite.bind(
        null,
        diary_id,
        pathname,
        userDetail?.includes(diary_id) ? "unlike" : "like"
      )}
    >
      <button type="submit" className="mt-2 flex items-center gap-2">
        <i
          className={`bx ${
            userDetail?.includes(diary_id) ? "bxs-heart" : "bx-heart"
          } text-2xl`}
        />
        {likes ? likes : 0}
      </button>
    </form>
  ) : null;
};

export default UserAction;
