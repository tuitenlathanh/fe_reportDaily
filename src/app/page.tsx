"use client";
import { useState, useEffect, } from "react";
import ShowToast from "./component/toastComponent";
import UserComponent from "./component/userComponent";
import ModalWarning from "./component/modalWarningComponent"

type WorkGroup = {
  Id: number;
  GroupFullname: string;
};
type User = {
  Id: number;
  UserCode: string;
  UserName: string;

}

type Work = {
  WorkGroup: number;
  Id: number;
  WorkName: string;
};

type Time = {
  Id: number;
  hour: number;
  minute: number;
};

type Report = {
  user: string;
  time: string;
  quantity: number;
  hours: number;
  minutes: number;  
  group: string;
  work: string;
  note: string;
};

export default function Home() {
  const [toasts, setToasts] = useState({ message: "", type: "", show: false });

  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [inputHour, setInputHour] = useState<number>(0);
  const [inputMinute, setInputMinute] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>();
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [remainingTotalTime, setRemainingTotalTime] = useState(0);
  const [times, setTimes] = useState<Time[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectWorkForWorkdID, setSelectWorkForWorkdID] = useState<Work[]>(works);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [selectedTimeId, setSelectedTimeId] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const [inputNote, setInputNote] = useState<string>("");
  const UserName = "SC460 - ĐINH TRỌNG THÀNH";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showModal, setShowModal] =useState(true);
  const [showMessage, setShowMessage] = useState("");
  const code = "SC4601";

  const maxLenght = 256;
  const warningText = 10;
  const remainingText = maxLenght -  inputNote.length;
  const remainingBar= (inputNote.length / maxLenght) * 100;
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/mockData");
      const data = await response.json();
      setWorkGroups(data.workGroups);
      setWorks(data.works);
      setTimes(data.workTime);
      console.log(data);
    }
    fetchData();
  }, []);

  const handleIsUser = (isFound: boolean) => {
    if(isFound) {
      console.log("ĐÚng");
    } else {
      setShowModal(true);
      setShowMessage('Vui lòng gửi báo cáo tại công ty.')
      console.log("Sai");
    }

  }
  const handlerClose = () =>{
    setShowModal(false);
  }
 

 

  useEffect(() => {
    calculatorRemainingTime();
  }, [totalTime, inputHour, inputMinute]);
  
  const calculatorRemainingTime = () => {
    const totalInputInMinutes = (inputHour * 60) + inputMinute;
    if (totalTime && totalInputInMinutes <= totalTime) {
      const newRemainingTime = totalTime - totalInputInMinutes;
      setRemainingTime(newRemainingTime);
      setRemainingTotalTime(newRemainingTime);
    } else if (Number(totalTime) < totalInputInMinutes) {
      setInputHour(0);
      setInputMinute(0);
    }
    console.log("tính toán toán" + totalTime)
  };
 


  const handleShowToast = (
    message: string,
    types: String, show: boolean
  ) => {
    setToasts({ show: true, message, types });
    setTimeout(() => {
      setToasts({ ...toasts, show: false });
    }, 2500);
  };
  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = event.target.value;
    setSelectedGroupId(groupId);
    filterWorkByID(groupId);
  };

  const filterWorkByID = (GroupID: string) => {
    const filtered = works.filter(
      (item) => item.WorkGroup === parseInt(GroupID)
    );
    setSelectWorkForWorkdID(filtered);
  };

  const handleConfirm = () => {
    if (selectedTimeId) {
      setIsConfirmed(!isConfirmed);
      if (isConfirmed) {
        setSelectedGroupId("");
        setSelectWorkForWorkdID([]);
      }
    } else {
      handleShowToast("Vui lòng chọn thời gian trước khi xác nhận!", "warning");
    }
  };

  const handleAddWork = () => {
    const selectedWorkGroup = workGroups.find(
      (group) => group.Id === parseInt(selectedGroupId)
    );
    const selectedWork = selectWorkForWorkdID.find(
      (work) => work.Id === parseInt(selectedGroupId) 
    );
  
    if (selectedWorkGroup && selectedWork) {
      const newReport: Report = {
        user: UserName,
        time: `${inputHour} giờ (${inputMinute} phút)`,
        quantity: inputQuantity,
        hours: inputHour,
        minutes: inputMinute,
        group: selectedWorkGroup.GroupFullname,
        work: selectedWork.WorkName,
        note: inputNote,
      };
  
      setReports((prevReports) => {
        const updatedReports = [...prevReports, newReport];
        console.log('Báo cáo mới đã thêm:', newReport); 
        console.log('Danh sách báo cáo:'); 

        console.log(reports.map((report) => ({
          user: UserName,
          time: `${inputHour} giờ (${inputMinute} phút)`,
          quantity: inputQuantity,
          hours: inputHour,
          minutes: inputMinute,
          group: selectedWorkGroup.GroupFullname,
          work: selectedWork.WorkName,
          note: inputNote,
        })));
        resetForm();
        return updatedReports;
      });
      
    } else {
      handleShowToast("Vui lòng chọn đầy đủ thông tin trước khi thêm công việc!", "warning");
    }
  };
  

  const resetForm = () => {
    setSelectedGroupId("");
    setInputQuantity(0);
    setInputNote("");
    setIsModalOpen(false);  
    calculatorRemainingTime();
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const timeId = event.target.value;
    setSelectedTimeId(timeId);
    const selectTime = times.find((time) => time.Id === parseInt(timeId));
    if (selectTime) {
      setTotalTime(selectTime.hour * 60);
     console.log(remainingTime);
    } else {
      setTotalTime(0);
    }
    
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>,inputNumber: number ) => {
    const newInput = Number(event.target.value);
    if (inputNumber === 1) {
      setInputHour(newInput);
    } else if(inputNumber === 2 ) {
      setInputMinute(newInput);
    }

  };
  const handleInputQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    console.log("input số lượng: "+ newValue);
    if (newValue >= 0) {
      setInputQuantity(newValue);
    } 

  };
 
   const handleInputNote = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const inputValue = event.target.value;
    if(inputValue.length <= maxLenght) {
      setInputNote(inputValue);
    }
   }


  return (
    <div className="flex justify-center align-center bg-[url('./bg.png')] h-screen">
      <div className="max-w-7xl mt-2 w-full h-screen">
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full bg-white mb-4">
          <div className="flex justify-between mt-4 ml-4 mr-4 h-1/6">
            <div>
              <h1 className="text-xl font-semibold text-[#212529]">
                BÁO CÁO HẰNG NGÀY [rel 1.2]
              </h1>
            </div>
            <div className="flex justify-center items-center ">
              <div className="relative w-9 h-8 = overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-10 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <label className="ml-2 w-full text font-semibold text-[#212529]">
                <UserComponent code={code} isUser = {handleIsUser}/>
              </label>
            </div>
          </div>

          <div className="p-4 ">
            <div id="hanlder" className="gap-6">
              <div>
                <label className="block mb-2 text-sl leading-5 font-semibold">
                  Chọn thời gian
                </label>
              </div>
              <select
                className="w-1/2 px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                required
                disabled={isConfirmed}
                value={selectedTimeId}
                onChange={handleTimeChange}
              >
                <option value="">Vui lòng chọn thời gian</option>
                {times.map((time) => (
                  <option key={time.Id} value={time.Id}>
                    {time.hour} tiếng ({time.minute}) phút
                  </option>
                ))}
              </select>

              <button
                onClick={handleConfirm}
                className={`${
                  isConfirmed
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white p-1 rounded-lg w-32 float-right mb-1`}
              >
                {isConfirmed ? "Chọn lại" : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full  bg-white col-span-1 pl-6 pr-6 pt-4 h-3/4${
            !isConfirmed ? " bg-gray-700 text-black " : ""
          }`}
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">
              Danh sách công việc đã báo cáo
            </h2>
            <div className="flex">
              <svg
                className="w-[25px] h-[25px] fill-[#050505]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
              </svg>
              <label className="ml-1 text-xl leading-7 font-semibold text-[#3cbbc2]">
                {Number.isNaN(remainingTime) ? totalTime : remainingTime} Phút
              </label>
            </div>
          </div>
          <div
            className={`${
              !isConfirmed || remainingTime === 0? " text-black cursor-not-allowed" : ""
            }`}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 
                  ${
                  !isConfirmed || remainingTime === 0  ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={remainingTime == 0}
              >
                <label className="text-2xl font-semibold text-white cursor-pointer">
                  +
                </label>
              </button>
            </div>
          </div>

          <div className="scroll h-80 overflow-y-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              {reports.length === 0 ? (
                <p>Chưa có công việc nào được thêm.</p>
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className=" text-center">
                      <th className="px-6 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="w-28">Thời gian</th>
                      <th scope="col" className="w-28">
                        Số lượng
                      </th>
                      <th scope="col" className="">
                        Bộ phận
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Công việc
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Ghi chú
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center"
                        key={index}
                      >
                        <td className="px-6 py-3">
                          <input type="checkbox" />
                        </td>
                        <td className="w-24">{report.time}</td>
                        <td className="px-6 py-4">{report.quantity}</td>
                        <td className="px-6 py-4">{report.group}</td>
                        <td className="px-6 py-4">{report.work}</td>
                        <td className="px-6 py-3">{report.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white rounded-lg w-[90%] max-w-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`col-span-1 rounded-lg border-solid border-1 w-full bg-white pb-5 ${
                    !isConfirmed ? " bg-gray-300" : ""
                  }`}
                >
                  <div className="flex justify-end items-center">
                    <div className="flex items-center">
                      <svg
                        className="w-[25px] h-[25px] fill-[#050505]"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                      </svg>
                      <label className="ml-1 text-xl leading-7 font-semibold text-[#3cbbc2]">
                        {Number.isNaN(remainingTime)
                          ? totalTime
                          : remainingTime}{" "}
                        Phút
                      </label>
                    </div>
                  </div>

                  <div className="pl-6 pr-6 pt-4 col-span-2">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-xl leading-5 font-semibold text-[#212529]">
                          Chọn bộ phận
                        </label>
                        <select
                          className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                          tabIndex={0}
                          autoFocus
                          onChange={handleGroupChange}
                          value={selectedGroupId}
                        >
                          <option value="">Vui lòng chọn bộ phận</option>
                          {workGroups.map((group) => (
                            <option key={group.Id} value={group.Id}>
                              {group.GroupFullname}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block mb-2 text-xl leading-5 font-semibold text-[#212529]">
                          Chọn công việc
                        </label>
                        <select
                          className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                          required
                        >
                          <option value="">Vui lòng chọn công việc</option>
                          {selectWorkForWorkdID.map((work) => (
                            <option key={work.Id} value={work.Id}>
                              {work.WorkName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pl-6 pr-6 pt-4 mb-4">
                    <div className="grid">
                      <div className="grid gap-6 mb-4 md:grid-cols-4 w-full">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <span className="inline-flex items-center p-2 px-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                            Giờ
                          </span>
                          <input
                            type="number"
                            min={0}
                            step={1}
                            value={inputHour}
                            onChange={(event) => handleInputChange(event, 1)}
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-md">
                          <span className="inline-flex items-center p-2  text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                            Phút
                          </span>
                          <input
                            type="number"
                            min={0}
                            step={1}
                            max={59}
                            value={inputMinute}
                            onChange={(event) => handleInputChange(event, 2)}
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md col-span-2">
                          <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                            Số lượng
                          </span>
                          <input
                            type="number"
                            min={0}
                            step={1}
                            value={inputQuantity}
                            onChange={(event) => handleInputQuantity(event)}
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm leading-5 font-semibold">
                          Ghi chú
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border rounded-lg focus:ring focus:border-blue-300 focus:outline-none"
                          rows={4}
                          value={inputNote}
                          onChange={handleInputNote}
                          placeholder="Nhập ghi chú"
                        ></textarea>
                        <div className="w-full h-2 shadow-inherit border border-lg rounded-lg bg-slate-300">
                          <div
                            className="h-full bg-green-800 rounded-lg"
                            style={{ width: `${remainingBar}%` }}
                          ></div>
                          <p
                            className={`text-sm mt-2 font-semibold ${
                              remainingText <= warningText ? "text-red-800" : ""
                            }`}
                          >
                            Còn {remainingText} ký tự
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-full flex justify-end align-end mb-4${
                          !isConfirmed ? " bg-gray-300" : ""
                        }`}
                      >
                        {Number(remainingTime) >= 0 && (
                          <button
                            onClick={handleAddWork}
                            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg p-1 pr-4 pl-4 mt-6 "
                          >
                            Thêm công việc
                          </button>
                        )}
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
        className={`mt-4 p-2 rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white ${
          totalTime === 0 ? "" : "bg-gray-300"
        }`}
      >
        <button
          className={`${
            remainingTime === 0 ? "bg-green-500 hover:bg-green-600 cursor-pointer" : "bg-gray-200"
          } text-white rounded-lg p-1 h-10 w-full`}
          disabled={totalTime !== 0}
        >
          Gửi báo cáo
        </button>
      </div>
        <div>
          <div>
            {toasts.show && (
              <ShowToast
                message={toasts.message}
                types={toasts.types}
                onClose={() => setToasts({ ...toasts, show: false })}
              />
            )}
          </div>
        </div>
        <div>
        {/* < {showModal && (
        <ModalWarning
          messages="User không tồn tại. Vui lòng kiểm tra mã nhân viên."
          onClose={closeModal}
        />
      )} */}
       
          </div>
          <div>
        {showModal && (
            <ModalWarning messages={showMessage} onClose={handlerClose}/>
          )}
        </div>
      </div>
    </div>
  );
}
