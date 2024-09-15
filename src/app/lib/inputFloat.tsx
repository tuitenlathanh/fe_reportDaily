import { useRef } from 'react';

const InputFloat= () => {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === 'E' || event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  };

  return (
    <input
    type="number" min={0.1}  
    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 " onKeyDown={handleKeyDown} ref= {inputRef}
  />
  );
};

export default InputFloat;
