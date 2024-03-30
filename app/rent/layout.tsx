import Header from "@/components/header";
import MaxWidthContainer from "@/components/maxWidthContainer";
import React from "react";

function RentItemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <MaxWidthContainer classes="py-32">{children}</MaxWidthContainer>
    </div>
  );
}

export default RentItemLayout;
