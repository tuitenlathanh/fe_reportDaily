import { useRef } from 'react';

const InputNumber = () => {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === 'E'|| event.key === '.' || event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
    console.log(event);
  };

  return (
    <input
    type="number" min={0}  
    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 " onKeyDown={handleKeyDown} ref= {inputRef}
  />
  );
};

export default InputNumber;
