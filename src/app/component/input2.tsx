import React, { useState } from 'react';

const TimeComponent = () => {
  const [totalTime, setTotalTime] = useState<number>(120); // Example initial total time in minutes
  const [inputMinute, setInputMinute] = useState<number>(0); // Initial input minute value
  const [remainingTime, setRemainingTime] = useState<number>(totalTime); // Initialize with totalTime

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinute = Number(event.target.value);
    setInputMinute(newMinute);

    // Calculate the remaining time
    const newRemainingTime = totalTime - newMinute;
    setRemainingTime(newRemainingTime);

    console.log("Updated Minute:", newMinute); // Logs the updated input value
    console.log("Remaining Time:", newRemainingTime); // Logs the calculated remaining time
  };

  return (
    <div>
      <div className="flex items-center border border-gray-300 rounded-md">
        <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
          Số phút
        </span>
        <input
          type="number"
          min={0}
          step={1}
          value={inputMinute}
          onChange={handleInputChange}
          className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <p>Total Time: {totalTime} minutes</p>
        <p>Input Minutes: {inputMinute} minutes</p>
        <p>Remaining Time: {remainingTime} minutes</p>
      </div>
    </div>
  );
};

export default TimeComponent;
