"use client";
import { useState, useEffect } from "react";
import MyComponent from "./component/intput3";

type WorkGroup = {
  Id: number;
  GroupFullname: string;
};

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
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  const [times, setTimes] = useState<Time[]>([]);

  const [reports, setReports] = useState<Report[]>([]);

  const [selectWorkForWorkdID, setSelectWorkForWorkdID] = useState<Work[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const [selectedTimeId, setSelectedTimeId] = useState<string>("");

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [inputHour, setInputHour] = useState<number>(0);
  const [inputMinute, setInputMinute] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>();
  // const [totalMinute, setTotalMunute] = useState <number>();
  const [remainingTime, setRemainingTime] = useState<number>(totalTime);

  const [inputQuantity, setInputQuantity] = useState<number>(0);

  const [inputNote, setInputNote] = useState<string>("");
  const UserName = "SC460 - ĐINH TRỌNG THÀNH";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/mockData");
      const data = await response.json();
      // setUsers(data.users);
      setWorkGroups(data.workGroups);
      setWorks(data.works);
      setTimes(data.workTime);
    }

    console.log("Render");
    fetchData();
  }, []);

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
      alert("Vui lòng chọn thời gian trước khi xác nhận!");
    }
  };

  const handleAddWork = () => {
    // const selectedUser = users.find(
    //   (user) => user.UserCode === selectedUserCode
    // );
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

      setReports((prevReports) => [...prevReports, newReport]);
      resetForm();
    } else {
      alert("Vui lòng chọn đầy đủ thông tin trước khi thêm công việc!");
    }
  };

  const resetForm = () => {
    // setSelectedUserCode("");
    setSelectedGroupId("");
    setSelectedTimeId("");
    setInputHour(0);
    setInputMinute(0);
    setInputQuantity(0);
    setInputNote("");
  };
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const timeId = event.target.value;
    setSelectedTimeId(timeId);

    const selectTime = times.find((time) => time.Id === parseInt(timeId));
    if (selectTime) {
      setInputHour(selectTime.hour);
      setInputMinute(selectTime.minute);
    }
    console.log("handleTimeChange" + selectTime);
    if (selectTime) {
      setTotalTime(selectTime.hour * 60);
    } else {
      setTotalTime(0);
    }
  };
  const mockReports = [
    {
      user: "Thành",
      time: "2 giờ (30 phút)",
      quantity: 10,
      hours: 2,
      minutes: 30,
      group: "Group A",
      work: "Work X",
      note: "Tâm phải vững",
    },
    {
      user: "Thành",
      time: "2 giờ (30 phút)",
      quantity: 10,
      hours: 2,
      minutes: 30,
      group: "Group A",
      work: "Work X",
      note: "Tâm phải vững",
    },
    {
      user: "Thành",
      time: "2 giờ (30 phút)",
      quantity: 10,
      hours: 2,
      minutes: 30,
      group: "Group A",
      work: "Work X",
      note: "Tâm phải vững",
    },
    {
      user: "Thành",
      time: "2 giờ (30 phút)",
      quantity: 10,
      hours: 2,
      minutes: 30,
      group: "Group A",
      work: "Work X",
      note: "Tâm phải vững",
    },
    {
      user: "Thành",
      time: "2 giờ (30 phút)",
      quantity: 10,
      hours: 2,
      minutes: 30,
      group: "Group A",
      work: "Work X",
      note: "Tâm phải vững",
    },
 
  ];

  // const handleInputMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newMinute = Number(event.target.value);
  //   setInputMinute(newMinute);
  //   console.log("số phút input nhập vào: " + setInputMinute(newMinute)) ;
  //   console.log(inputHour);

  //   // console.log("Số phút input: "+ a);
  //   const newRemainingTime = (totalTime ?? 0) - newMinute;

  //   console.log("Time Total:", totalTime);
  //   setRemainingTime(newRemainingTime);

  //   // console.log("Updated Minute:", newMinute);
  //   // console.log("Remaining Time:", newRemainingTime);
  // };
  // const handleInputHour = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newHour = Number(event.target.value);
  //   console.log("input hours: " + newHour);

  // }
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  // }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputNumber: number
  ) => {
    const newMinute = Number(event.target.value);
    if (inputNumber === 1) {
      setInputHour(newMinute);
    } else {
      setInputMinute(newMinute);
    }
    const HourTB = inputHour * 60 + inputMinute;
    console.log(HourTB);
  };

  return (
    <div className="flex justify-center align-center bg-[url('./bg.png')] h-dvh ">
      <div className="max-w-7xl mt-2 w-full">
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full bg-white mb-4 h-max ">
          <div className="flex justify-between mt-4 ml-4 mr-4">
            <h1 className="text-xl font-semibold text-[#212529]">
              BÁO CÁO HẰNG NGÀY [rel 1.2]
            </h1>
            <div className="flex justify-center items-center ">
              <div className="relative w-8 h-8 = overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
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
              <label className="ml-2 text font-semibold text-[#212529]">
                {UserName}
              </label>
            </div>
          </div>
          <div className="p-4">
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
                <option value=""></option>
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
        <div className="h-4/6">
          <div
            className={`rounded-lg border border-gray-400 border-solid border-1 w-full  bg-white col-span-1 pl-6 pr-6 pt-4 pb-4 ${
              !isConfirmed
                ? " bg-gray-300 cursor-not-allowed"
                : ""
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Danh sách công việc đã chọn
            </h2>
            <div className ="flex justify-end">
            {/* bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-lg w-32 float-right mb-1 */}
              {/* <button type="button" className ="hover:bg-blue-600 rounded-lg cursor-pointer ">
               <label className=" text-4xl font-semibold text-white bg-blue-500 px-2  ">
                  +
                </label>
              </button>   */}
              {/* <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button> */}
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <label className=" text-2xl font-semibold text-white cursor-pointer">
                  +
                </label>
              </button>
            </div>
            <div className="scroll h-96 overflow-y-auto">
              <table className=" scroll h-96 text-sm text-left">
                <thead className="sticky top-0 ">
                  <tr>
                    <th className="px-6 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className="px-6 py-3">Thời gian</th>
                    <th className="px-6 py-3">Số lượng</th>
                    <th className="px-6 py-3">Bộ phận</th>
                    <th className="px-6 py-3">Công việc</th>
                    <th className="px-6 py-3">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className=" text-gray-500">
                  {mockReports.map((report, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-6 py-3">{report.time}</td>
                      <td className="px-6 py-3">{report.quantity}</td>
                      <td className="px-6 py-3">{report.group}</td>
                      <td className="px-6 py-3">{report.work}</td>
                      <td className="px-6 py-3">{report.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
          
          <div
            className={`col-span-1 rounded-lg border border-gray-700 border-solid border-1 w-full bg-white pb-5 ${
              !isConfirmed ? "cursor-not-allowed  bg-gray-300" : ""
            }`}
          >
            <div className=" flex justify-end mr-4  mt-2">
              <svg
                className="w-[25px] h-[25px] fill-[#050505]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
              </svg>
              <label className="ml-1 text-xl leading-7 font-semibold text-[#3cbbc2]">
                {totalTime} Phút
              </label>
            </div>
            <div className="pl-6 pr-6 pt-4 col-span-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-xl leading-5 font-semibold text-[#212529]">
                    Chọn bộ phận
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                    required
                    onChange={handleGroupChange}
                    value={selectedGroupId}
                    disabled={!isConfirmed}
                  >
                    <option value=""></option>
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
                    disabled={!isConfirmed}
                  >
                    <option value=""></option>
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
                <div className="grid gap-6 mb-4 md:grid-cols-4  w-full">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <span className="inline-flex items-center p-2 px-4 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      Giờ
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      max={12}
                      value={inputHour}
                      disabled={!isConfirmed}
                      onChange={(event) => handleInputChange(event, 1)}
                      className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 "
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <span className=" inline-flex items-center p-2 px-4 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      Phút
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      max={60}
                      value={inputMinute}
                      disabled={!isConfirmed}
                      onChange={(event) => handleInputChange(event, 2)}
                      // onChange={(e) => {
                      //   const newMinute = Number(e.target.value);
                      //   setInputMinute(newMinute);
                      //   console.log(newMinute)
                      // }}

                      className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 "
                    />
                  </div>
                 
                  <div className="flex items-center border border-gray-300 rounded-md col-span-2">
                    <span className=" items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      Số lượng
                    </span>
                    <input
                      type="number"
                      disabled={!isConfirmed}
                      min={0}
                      step={1}
                      value={100000}
                      className="flex-1 block w-full px-3 py-2 border pr-8 border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 "
                    />
                    
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm leading-5 font-semibold">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:border-blue-300 focus:outline-none"
                    rows={2}
                    placeholder="Nhập ghi chú"
                    value={inputNote}
                    disabled={!isConfirmed}
                    onChange={(e) => setInputNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="w-full flex justify-end align-end ">
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg p-1 pr-4 pl-4 mt-3"
                    onClick={handleAddWork}
                    disabled={!isConfirmed}
                  >
                    Gửi công việc
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div
          className={` mt-4 p-2 rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white  ${
            !isConfirmed ? " bg-gray-300" : ""
          }`}
        >
          <button
            className="bg-green-800 text-white hover:bg-green-600 rounded-lg p-1 h-10 w-full"
            disabled={!isConfirmed}
          >
            Gửi báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}
