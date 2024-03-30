import HeaderHost from "@/components/Header-host";
import MaxWidthContainer from "@/components/maxWidthContainer";
import React from "react";

function MyListingsPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderHost />
      <MaxWidthContainer classes="py-32">{children}</MaxWidthContainer>
    </>
  );
}

export default MyListingsPage;
