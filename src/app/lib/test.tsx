import React, { useState } from "react";

const TimeSlider = () => {
  const [selectedHour, setSelectedHour] = useState(0); // Lưu giá trị thời gian
  const [showSlider, setShowSlider] = useState(false); // Trạng thái để ẩn/hiện slider

  // Hàm xử lý thay đổi thời gian khi kéo slider
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  // Hàm xử lý tăng thời gian
  const increaseTime = () => {
    if (selectedHour < 12) {
      setSelectedHour(selectedHour + 1);
    }
  };

  // Hàm xử lý giảm thời gian
  const decreaseTime = () => {
    if (selectedHour > 0) {
      setSelectedHour(selectedHour - 1);
    }
  };

  return (
    <div>
      {/* Thanh hiển thị thời gian, khi click vào sẽ hiện slider */}
      <div
        onClick={() => setShowSlider(!showSlider)} // Toggle hiện slider
        className="w-full px-3 flex items-center justify-between rounded-lg border focus:outline-none bg-gray-400 hover:bg-gray-600 text-white cursor-pointer"
      >
        <svg
          className="w-[20px] h-[30px] fill-[#d1cece]"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
        </svg>
        <label className="leading-9 ml-2 font-medium">{selectedHour} Tiếng</label>
      </div>

      {/* Nếu showSlider là true thì slider sẽ xuất hiện */}
      {showSlider && (
        <div className="flex items-center mt-4">
          {/* Nút giảm thời gian */}
          <button
            className="bg-gray-400 text-white rounded-full p-2 mr-4"
            onClick={decreaseTime}
          >
            -
          </button>

          {/* Slider chọn thời gian */}
          <input
            type="range"
            min="0"
            max="12" // Giới hạn tối đa 12 giờ
            step="1" // Bước là 1 tiếng
            value={selectedHour}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          />

          {/* Nút tăng thời gian */}
          <button
            className="bg-gray-400 text-white rounded-full p-2 ml-4"
            onClick={increaseTime}
          >
            +
          </button>
          <div className="w-full">
              <button className ="">
                Xác nhậnsasasasqs

              </button>
                
            </div>
        </div>
      )}

    
    </div>
  );
};

export default TimeSlider;
