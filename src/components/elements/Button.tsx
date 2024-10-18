export interface ButtonProps {
  backgroundColor?: 'primary' | 'secondary' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'round' | 'semi' | 'square';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  size = 'md',
  backgroundColor = 'primary', // 기본값 설정
  label = 'button',
  shape = 'round',
  onClick,
  ...props
}: ButtonProps) => {
  // 사이즈에 따른 클래스 정의
  const sizeClass = {
    sm: 'px-4 py-2 text-base text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-10 py-2 w-full text-base',
  };

  // 모양에 따른 클래스 정의
  const roundedClass = {
    round: 'rounded-full',
    square: '',
    semi: 'rounded-md',
  };

  // 배경색 및 글자색 정의
  const bgClass = {
    primary: '#222',
    secondary: '#fff',
    disabled: '#ddd',
  };

  const fontColor = {
    primary: '#fff',
    secondary: '#111',
    disabled: '#888',
  };


   // 테두리 스타일을 secondary 버튼일 때만 추가
   const borderStyle = backgroundColor === 'secondary' ? 'border border-gray-300' : '';


  // 클래스명과 스타일 설정
  const buttonClass = `${roundedClass[shape]} ${sizeClass[size]} ${borderStyle}`;
  const buttonStyle = {
    backgroundColor: bgClass[backgroundColor],
    color: fontColor[backgroundColor],
    boxSizing: 'border-box' as const, // Ensure border-box is applied correctly
  };

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      style={buttonStyle} // 인라인 스타일로 전달
      {...props} // 나머지 props 전달
    >
      {label} 
    </button>
  );
};

export default Button;
