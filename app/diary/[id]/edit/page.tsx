import CreateDiaryForm from "@/components/auth/CreateDiaryForm";

import Wrapper from "@/components/global/Wrapper";
import { supabase } from "@/utils/supabase";
import React from "react";

type DetailProps = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

const Detail = async ({ params }: DetailProps) => {
  const { data, error } = await supabase
    .from("dairy")
    .select()
    .eq("id", params.id)
    .single();

  if (error) return <p>Reload page...</p>;

  return (
    <Wrapper title={`Edit diary ${data.id}`}>
      <CreateDiaryForm edit={true} content={data.content} diary_id={data.id} />
    </Wrapper>
  );
};

export default Detail;
