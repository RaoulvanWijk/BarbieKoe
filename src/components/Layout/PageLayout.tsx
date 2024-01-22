import React, { useEffect, useState} from "react";
import Sidenav from "@components/Layout/Sidenav";
import TopNav from "@components/Layout/TopNav";
import PageContainer from "@components/Layout/PageContainer";

import "/resources/styles/components/layout/page-layout.scss";
type PageLayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
};
export default function PageLayout(
  props: PageLayoutProps
) {
  let time =  new Date().toLocaleTimeString(
    "nl-NL", {hour: '2-digit', minute:'2-digit'}
  )
  let date = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const [ctime,setTime] = useState(time)
  const [cdate,setDate] = useState(date)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString(
      "nl-NL", {hour: '2-digit', minute:'2-digit'}
    )
    date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    setTime(time)
    setDate(date)
  }

  useEffect(()=>{
    setInterval(UpdateTime,1000)
  },[])
  
  return (
    <div className="page-container">
      <Sidenav />
      <TopNav />
      <PageContainer>
        <header className="page-header">
          <h1 className="page-title">{props.pageTitle}</h1>
          <p>
            {cdate}
          </p>
          <p>
            {/* Current time */}
            {ctime + " uur"}
          </p>
        </header>
        {props.children}
      </PageContainer>
    </div>
  );
}
