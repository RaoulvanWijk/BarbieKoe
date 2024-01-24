// import Sidenav from "@components/Layout/Sidenav";
import TopNav from "@components/Layout/TopNav";
import PageContainer from "@components/Layout/PageContainer";
import PageHeader from "./PageHeader";
import Sidenav from "@components/Layout/SideNav.tsx";
import React from "react";
import "/resources/styles/components/layout/page-layout.scss";

type PageLayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
};
export default function PageLayout(props: PageLayoutProps) {
  return (
    <div className="page-container">
      <Sidenav />
      <TopNav />
      <PageContainer>
        <PageHeader pageTitle={props.pageTitle} />
        <div>{props.children}</div>
      </PageContainer>
    </div>
  );
}
