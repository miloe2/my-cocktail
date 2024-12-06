import React, { useState, useRef, useEffect } from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = "",
  ...props
}) => {
  const [rippleArray, setRippleArray] = useState<Ripple[]>([]);
  const timers = useRef<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = { x, y, size, id: Date.now() };

    setRippleArray((prev) => [...prev, newRipple]);

    const timer = window.setTimeout(() => {
      setRippleArray((prev) =>
        prev.filter((ripple) => ripple.id !== newRipple.id),
      );
    }, 1600);
    timers.current.push(timer);

    if (onClick) onClick(event);
  };

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none">
        {rippleArray.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              opacity: 0.0,
            }}
          ></span>
        ))}
      </div>
    </button>
  );
};

export default RippleButton;
