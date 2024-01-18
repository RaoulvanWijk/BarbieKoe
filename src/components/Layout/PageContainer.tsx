import React from "react";

export default function PageContainer(props: React.PropsWithChildren<{}>) {
  return <div className="main-content">{props.children}</div>;
}
