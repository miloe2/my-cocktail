export interface TextProps {
  size?: 24 | 16 | 14;
  text: string;
  type: 'default' | 'secondary' | 'accent' | 'white';
  weight?: 'regular' | 'medium' | 'bold';
  lineHeight?: number;
  letterSpacing?: number;
  className? : string;
  onClick?: () => void;
}

export const Text = ({
  size = 24,
  text = '텍스트를 입력해주세요.',
  type = 'default',
  weight = 'regular',
  className,
  lineHeight = 1.5,
  letterSpacing = 0.5,
  onClick,
  ...props
}: TextProps) => {
  const textColor = {
    default: '#222',
    secondary: '#888', 
    accent: '#007BFF', 
    white : '#fff'
  };

  // Define font weight mapping
  const fontWeight = {
    regular: 400,
    medium : 500,
    bold: 700,
  };

  // Compose inline styles
  const textStyle = {
    color: textColor[type],
    fontSize: `${size}px`, // Ensure size is in pixels
    fontWeight: fontWeight[weight],
    lineHeight: `${lineHeight}`, // Set line height to enhance readability
    letterSpacing: `${letterSpacing}px`, // Slight spacing for better legibility
  };

  return (
    <p
      onClick={onClick}
      className={className}
      style={textStyle} // Apply styles inline
      {...props} // Pass additional props
    >
      {text}
    </p>
  );
};

export default Text;
