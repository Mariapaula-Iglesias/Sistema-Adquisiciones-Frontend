interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => <input {...props} />;

export default Input;
