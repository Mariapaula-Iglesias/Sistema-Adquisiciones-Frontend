interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea = (props: Props) => <textarea {...props} />;

export default TextArea;
