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
      <i
        className="bx bxs-trash-alt"
        onClick={() =>
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              diaryAction.delete(diary_id);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
        }
      />
      <p className="flex items-center gap-2 justify-start">
        <i
          className={`bx ${
            userDetail?.includes(diary_id) ? "bxs-heart" : "bx-heart"
          } text-2xl`}
          onClick={() => {
            diaryAction.favorite(
              diary_id,
              "/dashboard/my-diary",
              userDetail?.includes(diary_id) ? "unlike" : "like"
            );
          }}
        />
        {likes ? likes : 0}
      </p>
    </div>
  ) : pathname === "/" || pathname === "/dashboard/favorite-diary" ? (
    <p className="mt-2 flex items-center gap-2">
      <i
        className={`bx ${
          userDetail?.includes(diary_id) ? "bxs-heart" : "bx-heart"
        } text-2xl`}
        onClick={() =>
          diaryAction.favorite(
            diary_id,
            pathname,
            userDetail?.includes(diary_id) ? "unlike" : "like"
          )
        }
      />
      {likes ? likes : 0}
    </p>
  ) : null;
};

export default UserAction;
