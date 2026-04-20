import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        {...props}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-300 focus:ring-slate-200"
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;