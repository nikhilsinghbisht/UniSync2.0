export const Card = ({ children, ...props }) => (
    <div className="border rounded-lg shadow-md p-4" {...props}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children, ...props }) => (
    <div {...props}>
      {children}
    </div>
  );
  