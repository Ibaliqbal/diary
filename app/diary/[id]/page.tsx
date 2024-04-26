import CommentsForm from "@/components/auth/CommentsForm";
import CommentList from "@/components/global/(diarys)/CommentList";
import Wrapper from "@/components/global/Wrapper";
import { getUserData } from "@/utils/clerk";
import { supabase } from "@/utils/supabase";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type DetailProps = {
  params: {
    id: string;
  };
};

const Detail = async ({ params }: DetailProps) => {
  const { email } = await getUserData();
  const { data, error } = await supabase
    .from("dairy")
    .select()
    .eq("id", params.id)
    .single();
  const { data: comments } = await supabase
    .from("dairy")
    .select("comments")
    .eq("id", params.id)
    .single();

  if (error) return <p>Reload page...</p>;

  return (
    <Wrapper>
      <div className="flex flex-col gap-4 pb-24">
        <div className="flex flex-col mx-auto justify-center">
          <Image src={data.avatar} alt={data.avatar} width={250} height={250} />
          <i className="text-center mt-3">
            posted at {format(new Date(data.created_at), "MMMM d, yyyy")}
          </i>
        </div>
        <h3 className="italic text-lg font-bold">
          ~ {data.username || data.email}
        </h3>
        <p className="text-xl">{data.content}</p>
        <CommentList
          diary_id={data.id}
          data={data?.comments}
          email_user={email}
        />
        <CommentsForm diary_id={data.id} />
      </div>
    </Wrapper>
  );
};

export default Detail;
