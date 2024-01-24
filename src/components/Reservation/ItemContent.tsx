import React from "react";

type ItemContentProps = {
  title: string;
  content: string|number;
};

export default function ItemContent(props: ItemContentProps) {
  return (
    <div>
      <dt>{props.title}</dt>
      <dd>{props.content}</dd>
    </div>
  );
}
