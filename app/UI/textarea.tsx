import { TextareaContainer } from "./textarea.styled";

interface Textareaprops {
  label: string;
  value: string;
  placeholder: string;
  propertyKey: string;
  onChange: (value: string, fieldName: string) => void;
  disabled?: boolean;
}

export const Textarea = ({
  label,
  value,
  placeholder,
  propertyKey,
  onChange,
  disabled,
}: Textareaprops) => {
  return (
    <TextareaContainer>
      <label>{label}</label>
      <textarea
        onChange={(e) => onChange(e.target.value, propertyKey)}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
    </TextareaContainer>
  );
};
