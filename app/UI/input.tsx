import { InputContainer } from "./input.styled";

interface Inputprops {
  type: string;
  label?: string;
  value: string;
  propertyKey?: string;
  placeholder?: string;
  onChange: (value: string, fieldName: string) => void;
  disabled?: boolean;
}

export const Input = ({
  type,
  label,
  value,
  propertyKey,
  placeholder,
  onChange,
  disabled,
}: Inputprops) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, propertyKey ?? "")}
        disabled={disabled}
      />
    </InputContainer>
  );
};
