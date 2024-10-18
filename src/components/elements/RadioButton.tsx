 // @ts-ignore

export interface RadioButtonProps {
  options : { label : string; value: string; }[];
  name : string;
  selectedValue: string;
  onChange: (value : string) => void;
}
// @ts-ignore
export const RadioButton = ({
  options,
  name,
  selectedValue,
  onChange,
  ...props
}: RadioButtonProps) => {

  return (
    <>
      {options.map((option) => (
          <label key={option.value}>
            <input 
              type="radio"
              name={name}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
      ))
      }
    </>
  );
};

export default RadioButton;
