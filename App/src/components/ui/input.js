export function Input({ className = '', ...props }) {
  return (
    <input
      className={`border border-purple-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 ${className}`}
      {...props}
    />
  );
}
