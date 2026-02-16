interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> { }

const Select = (props: Props) => <select {...props} />;

export default Select;
