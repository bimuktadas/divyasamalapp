export function Card({ children, className = '' }) {
  return (
    <div className={`shadow-md rounded-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
