"use server";

import { getUserData } from "@/utils/clerk";
import { getUser, ICooments, supabase } from "@/utils/supabase";
import { randomUUID, UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCommentsAction = async (formData: FormData) => {
  const comment = formData.get("content") as string;
  if (!comment || comment.trim() === "") return;
  const id = formData.get("diary_id");
  const comment_id = randomUUID();

  const { avatar, email, username } = await getUserData();
  if (!username && !email) redirect("/sign-in");

  const data: ICooments = {
    avatar,
    username,
    email,
    content: comment,
    id: comment_id,
    created_at: new Date(),
    likes: 0,
  };

  const { data: getComments } = await supabase
    .from("dairy")
    .select("comments")
    .eq("id", id)
    .single();
  const { data: myComments } = await supabase
    .from("dairy")
    .select("my_comments")
    .eq("email", email);

  const existingComments = getComments?.comments || [];
  const newComment = [...existingComments, data];

  const existingMyComments = myComments![0].my_comments || [];
  const newMyComment = [...existingMyComments, data];

  await supabase.from("dairy").update({ comments: newComment }).eq("id", id);
  await supabase
    .from("dairy")
    .update({ my_comments: newMyComment })
    .eq("email", email);

  revalidatePath(`/diary/${id}`);
};

export const deleteCommentAction = async (formData: FormData) => {
  const diary_id = formData.get("diary_id");
  const id = formData.get("comment_id");
  const { email } = await getUserData();
  const user = await getUser();
  const myComments = user?.filter((u) => u.my_comments !== null)[0]
    ?.my_comments;
  if (!id) return;
  const { data } = await supabase
    .from("dairy")
    .select("comments")
    .eq("id", diary_id)
    .single();
  const filtered = data?.comments.filter(
    (comment: ICooments) => comment.id !== id
  );
  const filteredMyComments = myComments?.filter(
    (comment: ICooments) => comment.id !== id
  );
  await supabase
    .from("dairy")
    .update({ my_comments: filteredMyComments })
    .eq("email", email);
  await supabase
    .from("dairy")
    .update({ comments: filtered })
    .eq("id", diary_id);

  redirect(`/diary/${diary_id}`);
};
