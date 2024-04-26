import React from "react";

type WrapperProps = {
  children?: React.ReactElement;
  title?: string;
};

const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <section className="container mx-auto px-4 ">
      <h1 className="text-center mf:text-3xl text-xl mb-8 mt-3 font-bold">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Wrapper;
