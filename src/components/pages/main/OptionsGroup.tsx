import OptionsButton from "@/components/elements/OptionsButton";
interface OptionsGroupProps {
  className?: string;
}

const OptionsGroup = ({ className }: OptionsGroupProps) => {
  return (
    <div className={className}>
      <OptionsButton label="hihi"></OptionsButton>
    </div>
  );
};
export default OptionsGroup;
