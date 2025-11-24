export default function Text({ as: Tag = "h2", content, MyClass, ...probs }) {
  return <Tag className={MyClass} {...probs}>{content}</Tag>;
}
