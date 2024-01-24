type ItemContentProps = {
  title: string;
  content: string|number|undefined;
};

export default function ItemContent(props: ItemContentProps) {
  return (
    <div>
      <dt>{props.title}</dt>
      {
        props.content !== undefined ? <dd>{props.content}</dd> : <hr className="h-4 w-16 animate-pulse outline-none border-none bg-gray-300"  />
      }

    </div>
  );
}
