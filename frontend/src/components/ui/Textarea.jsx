const Textarea = ({ value, onChange, placeholder, ...props }) => {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    );
  };
  
  export default Textarea;
  