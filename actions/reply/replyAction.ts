"use server";

import { getUserData } from "@/utils/clerk";
import { getUser, ICooments, supabase } from "@/utils/supabase";
import { randomUUID, UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

export async function createReplyAction(
  formData: {
    content: string;
    comment_id: UUID | undefined;
    diary_id: number;
  },
  reply_to_replys: boolean
) {
  const comment = formData.content;
  if (!comment || comment.trim() === "") return;
  const comment_id = randomUUID();
  const { avatar, email, username } = await getUserData();
  const user = await getUser();
  const myComments = user?.filter((u) => u.my_comments !== null)[0]
    ?.my_comments;

  if (!email && !username) return redirect("/sign-in");
  if (!comment || comment.trim() == "") return;
  const { data: getComments } = await supabase
    .from("dairy")
    .select("comments")
    .eq("id", formData.diary_id)
    .single();

  const data: ICooments = {
    avatar,
    username,
    email,
    content: comment,
    created_at: new Date(),
    likes: 0,
    id: comment_id,
  };
  const existingMyComments = myComments || [];

  if (!reply_to_replys) {
    const reply_to_who = getComments?.comments.find(
      (comment: ICooments) => comment.id === formData.comment_id
    );
    const getIndex: number = getComments?.comments.findIndex(
      (comment: ICooments) => comment.id === formData.comment_id
    );

    data.reply_to = reply_to_who?.username || reply_to_who?.email;

    const existingReplys = reply_to_who?.comments || [];
    const newReplys = [...existingReplys, data];
    const commentsUpdate = getComments?.comments.with(getIndex, {
      ...reply_to_who,
      comments: newReplys,
    });
    const newMyComments = [...existingMyComments, data];

    await supabase
      .from("dairy")
      .update({ my_comments: newMyComments })
      .eq("email", email);

    await supabase
      .from("dairy")
      .update({ comments: commentsUpdate })
      .eq("id", formData.diary_id);

    revalidatePath(`/diary/${formData.diary_id}`);
  } else {
    const getIndex = getComments?.comments.findIndex((comment: ICooments) =>
      comment.comments?.find((reply) => reply.id === formData.comment_id)
    );
    const findReplyParent = getComments?.comments.find((comment: ICooments) =>
      comment.comments?.find((reply) => reply.id === formData.comment_id)
    );
    const reply_to_who = findReplyParent.comments?.find(
      (reply: ICooments) => reply.id === formData.comment_id
    );
    data.reply_to = reply_to_who?.username || reply_to_who?.email;
    const existingReplys = findReplyParent.comments || [];
    const newReplys = [...existingReplys, data];
    const commentsUpdate = getComments?.comments.with(getIndex, {
      ...findReplyParent,
      comments: newReplys,
    });
    const newMyComments = [...existingMyComments, data];

    await supabase
      .from("dairy")
      .update({ my_comments: newMyComments })
      .eq("email", email);

    await supabase
      .from("dairy")
      .update({ comments: commentsUpdate })
      .eq("id", formData.diary_id);

    revalidatePath(`/diary/${formData.diary_id}`);
  }
}

export async function deleteReplyAction(formData: FormData) {
  const diary_id = formData.get("diary_id");
  const comment_id = formData.get("comment_id");
  const id = formData.get("reply_id");
  const { email } = await getUserData();
  const user = await getUser();
  const myComments = user?.filter((u) => u.my_comments !== null)[0]
    ?.my_comments;
  const { data: getComment } = await supabase
    .from("dairy")
    .select("comments")
    .eq("id", diary_id)
    .single();
  const getIndex = getComment?.comments.findIndex(
    (comment: ICooments) => comment.id === comment_id
  );
  const filtered = getComment?.comments[getIndex].comments.filter(
    (reply: ICooments) => reply.id !== id
  );
  const updateReplys = getComment?.comments.with(getIndex, {
    ...getComment.comments[getIndex],
    comments: filtered,
  });
  const updatedMyComments = myComments.filter(
    (comment: ICooments) => comment.id !== id
  );
  await supabase
    .from("dairy")
    .update({ my_comments: updatedMyComments })
    .eq("email", email);
  await supabase
    .from("dairy")
    .update({ comments: updateReplys })
    .eq("id", diary_id);
  return redirect(`/dashboard/my-comments`, RedirectType.replace);
}
