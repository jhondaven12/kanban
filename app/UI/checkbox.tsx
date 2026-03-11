interface CheckboxProps {
  value: number;
  checked: boolean;
  onClick: (value: string) => void;
}
export const Checkbox = ({ value, checked, onClick }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      onChange={(e) => onClick(e.target.value)}
      value={value}
      checked={checked}
    />
  );
};
