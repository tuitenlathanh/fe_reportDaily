import React, { useState,useEffect } from 'react';

const MyComponent = () => {
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0); 
  const [totalTime, setTotalTime] = useState(120);
  const [remainingTime, setRemainingTime] = useState(totalTime);


  useEffect(() => {
    const totalInputInMinutes = (input1 * 60) + input2;  
    const newRemainingTime = totalTime - totalInputInMinutes;  
    setRemainingTime(newRemainingTime ); 
    if(totalInputInMinutes > totalTime) {
      alert("ccc")
    }
  }, [input1, input2]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputNumber: number) => {
    const newValue = Number(event.target.value);

    if (inputNumber === 1) {
      setInput1(newValue);
    } else if (inputNumber === 2) {
      setInput2(newValue);
    }
    if (inputNumber === 1) {
      setInput1(newValue > 12 ? 12 : newValue); 
    } else if (inputNumber === 2) {
      setInput2(newValue > 59 ? 59 : newValue);
    }
  };

  return (
    <div>
      <div className="flex items-center border border-gray-300 rounded-md">
        <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
          Input giờ
        </span>
        <input
          type="number"
          min={0}
          step={1}
          max={12}
          value={input1}
          onChange={(e) => handleInputChange(e, 1)}
          className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-md mt-2">
        <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
          Input phút 
        </span>
        <input
          type="number"
          min={0}
          step={1}
          max={59} 
          value={input2}
          onChange={(e) => handleInputChange(e, 2)}
          className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mt-4 bg-red-950 text-white">
        <p>Total Time: {totalTime} phút</p>
        <p>Remaining Time: {remainingTime} phút</p>
      </div>
    </div>
  );
};

export default MyComponent;
