"use client"; // Add this line at the top to make it a Client Component
import { useState } from "react";

export interface HeaderProps {
  initialDarkMode: boolean;
}
const commonClass = "h-12";
const headerClass = {
  dark: "bg-black text-white",
  light: "bg-zinc-200 text-[#222]",
  // light : 'bg-white text-[#222]'
};

export const Header = ({ initialDarkMode }: HeaderProps) => {
  const [isDark, setIsDark] = useState(initialDarkMode);
  const handleUiMode = () => {
    console.log("click");
    setIsDark(!isDark);
  };

  return (
    <header>
      <div
        className={`${commonClass} ${isDark ? headerClass["dark"] : headerClass["light"]}`}
      >
        <div className="flex max-w-5xl justify-between items-center mx-auto h-full  text-sm">
          <dl>hi</dl>
          <dl className="flex space-x-5">
            <dt>
              <button>home</button>
            </dt>
            <dt>
              <button>cocktail</button>
            </dt>
            <dt>
              <button onClick={handleUiMode}>isDark {String(isDark)} </button>
            </dt>
          </dl>
        </div>
      </div>
    </header>
  );
};

export default Header;
// import React from 'react';

// type User = {
//   name: string;
// };

// export interface HeaderProps {
//   user?: User;
//   onLogin?: () => void;
//   onLogout?: () => void;
//   onCreateAccount?: () => void;
// }

// export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
//   <header>
//     <div className="storybook-header">
//       <div>
//         <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//           <g fill="none" fillRule="evenodd">
//             <path
//               d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
//               fill="#FFF"
//             />
//             <path
//               d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
//               fill="#555AB9"
//             />
//             <path
//               d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
//               fill="#91BAF8"
//             />
//           </g>
//         </svg>
//         <h1>Acme</h1>
//       </div>
//       <div>
//         {user ? (
//           <>
//             <span className="welcome">
//               Welcome, <b>{user.name}</b>!
//             </span>
//           </>
//         ) : (
//           <>
//           </>
//         )}
//       </div>
//     </div>
//   </header>
// );
