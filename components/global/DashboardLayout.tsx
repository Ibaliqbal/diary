import React from "react";
import Wrapper from "./Wrapper";
import Sidebar from "./(diarys)/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Wrapper title="Dashboard">
      <section className="md:grid md:grid-cols-4 gap-4 w-full">
        <Sidebar />
        {children}
      </section>
    </Wrapper>
  );
};

export default DashboardLayout;
