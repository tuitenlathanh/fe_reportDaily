// import React, { useState } from 'react';

// const TimeCalculator = () => {
//   const [totalTime, setTotalTime] = useState(120); // Total time in minutes
//   const [inputHour, setInputHour] = useState(0);
//   const [inputMinute, setInputMinute] = useState(0);
//   const [remainingTime, setRemainingTime] = useState(totalTime);

//   const handleCalculate = () => {
//     // Convert input hours and minutes to total minutes
//     const inputTotalMinutes = inputHour * 60 + inputMinute;

//     // Calculate the remaining time
//     const newRemainingTime = totalTime - inputTotalMinutes;

//     // Update the remaining time
//     if (newRemainingTime >= 0) {
//       setRemainingTime(newRemainingTime);
//     } else {
//       alert('Thời gian nhập vào vượt quá tổng thời gian!');
//       setRemainingTime(totalTime); // Reset to total time if invalid
//     }

//     // Reset input fields
//     setInputHour(0);
//     setInputMinute(0);
//   };

//   return (
//     <div>
//       <h2>Tính Toán Thời Gian</h2>
//       <div>
//         <label>
//           Giờ:
//           <input
//             type="number"
//             value={inputHour}
//             onChange={(e) => setInputHour(Number(e.target.value))}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Phút:
//           <input
//             type="number"
//             value={inputMinute}
//             onChange={(e) => setInputMinute(Number(e.target.value))}
//           />
//         </label>
//       </div>
//       <button onClick={handleCalculate}>Tính Toán</button>
//       <h3>Thời Gian Còn Lại: {Math.floor(remainingTime / 60)} giờ {remainingTime % 60} phút</h3>
//     </div>
//   );
// };

// export default TimeCalculator;


import React, { useEffect, useState } from 'react';
import ModalWarning from './modalWarningComponent';

type User = {
  UserCode: string;
  Name: string;
};

const UserComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userFound, setUserFound] = useState<User | null | undefined>(null);
  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState('');
  const userCode = "SC460"
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/mockData");
      const data = await response.json();
      setUsers(data.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(users.length > 0)
    {
      const userFound = users.find(user => user.UserCode === userCode)
      console.log(typeof(userFound)); 
      if(userFound){
        console.log("Đung");
      }else {
        setShowMessage("Vui lòng gửi báo cáo trong công ty.")
        setShowModal(true);
        console.log("sai");
      }
      
      setUserFound(userFound);
    }
  },[users])
 const handleClose = () => {
  setShowModal(false);
 }
  // const findUserByCode = (userCode: string) => {
  //   return users.find(user => user.UserCode === userCode);
  // };
  
  // const userCodeToFind = "SC460";
  // const userFound = findUserByCode( userCodeToFind);
  
  // if (userFound) {
  //   console.log("Người dùng tìm thấy:", userFound);
  // } else {
  //   console.log("Không tìm thấy người dùng với mã nhân viên:", userCodeToFind);
  // }
  return (
    <div>
      <div>
        {userFound ? (
          <div>
            <p className='ml-2 w-full text font-semibold text-[#212529]'>{userFound.UserCode} - {userFound.Name}</p>
            {showModal && (
              <ModalWarning messages={showMessage} onClose={handleClose} />
            )}
          </div>
        ) : (
          <>
           
            <p>Không tìm thấy người dùng với mã nhân viên: {userCode}</p>
          </>
        )}
      </div>
      {showModal && (
              <ModalWarning messages={showMessage} onClose={handleClose} />
            )}
    </div>
  );
};


export default UserComponent;

