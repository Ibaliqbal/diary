import Wrapper from "@/components/global/Wrapper";
import React from "react";

const loading = () => {
  return (
    <Wrapper title="Please wait....">
      <div className="w-full items-center justify-center flex">
        <span className="loading loading-bars loading-md"></span>
      </div>
    </Wrapper>
  );
};

export default loading;
