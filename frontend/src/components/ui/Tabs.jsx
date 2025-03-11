export const Tabs = ({ value, onValueChange, children }) => {
    return (
      <div>
        {children.map((child) =>
          React.cloneElement(child, {
            isActive: child.props.value === value,
            onClick: () => onValueChange(child.props.value),
          })
        )}
      </div>
    );
  };
  
  export const TabsList = ({ children }) => (
    <div className="flex space-x-2">{children}</div>
  );
  
  export const TabsTrigger = ({ value, isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {children}
    </button>
  );
  