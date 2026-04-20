import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

const Button = ({ children, fullWidth = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      } ${props.className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;