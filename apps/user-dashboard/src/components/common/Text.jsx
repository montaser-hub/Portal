export default function Text({ as: Tag = "h2", content, MyClass }) {
  return <Tag className={MyClass}>{content}</Tag>;
}
