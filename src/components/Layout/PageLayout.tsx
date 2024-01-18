import React from "react";
import Sidenav from "@components/Layout/Sidenav";
import TopNav from "@components/Layout/TopNav";
import PageContainer from "@components/Layout/PageContainer";

import "/resources/styles/components/layout/page-layout.scss";

export default function PageLayout(
  props: React.PropsWithChildren<{}>
) {
  return (
    <div className="page-container">
      <Sidenav />
      <TopNav />
      <PageContainer>
        {props.children}
      </PageContainer>
    </div>
  );
}
