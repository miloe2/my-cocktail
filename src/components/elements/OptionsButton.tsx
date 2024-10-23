export interface OptionsButtonProps {

  label: string;
  onClick?: () => void;
}

export const OptionsButton = ({
  label = "button",
  onClick,
  ...props
}: OptionsButtonProps) => {
  // 사이즈에 따른 클래스 정의

  return (
    <button
      onClick={onClick}
      {...props} // 나머지 props 전달
    >
      {label}
    </button>
  );
};

export default OptionsButton;
