"use client";
import { useState, useEffect } from "react";
import InputNumber from "./lib/inputNumber";

type User = {
  UserCode: string;
  Name: string;
};

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
  // Khai báo state 
  const [users, setUsers] = useState<User[]>([]); 

  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  const [times, setTimes] = useState<Time[]>([]);

  const [reports, setReports] = useState<Report[]>([]);

  const [selectWorkForWorkdID, setSelectWorkForWorkdID] = useState<Work[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  // const [selectedUserCode, setSelectedUserCode] = useState<string>(
  //   "SC460-DINH TRỌNG THÀNH"
  // );
  const [selectedTimeId, setSelectedTimeId] = useState<string>("");

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [inputHour, setInputHour] = useState<number>(0);
  const [inputMinute, setInputMinute] = useState<number>(0);

  const [inputQuantity, setInputQuantity] = useState<number>(0);
  
  const [inputNote, setInputNote] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/mockData");
      const data = await response.json();
      setUsers(data.users);
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
        user: selectedUserCode,
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
    setSelectedUserCode("");
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

    const time = times.find((time) => time.Id === parseInt(timeId));
    if (time) {
      setInputHour(time.hour);
      setInputMinute(time.minute);
    }
    console.log("handleTimeChange" + time);
  };
  return (
    <div className="flex justify-center align-center bg-[url('./bg.png')] h-dvh ">
      <div className="max-w-7xl ">
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full bg-white mb-4 h-1/5 ">
          <div className="flex justify-between mt-4 ml-4 mr-4">
            <h1 className="text-xl font-semibold text-[#212529]">
              BÁO CÁO HẰNG NGÀY [rel 1.2]
            </h1>
            <div className="flex justify-center items-center ">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
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
              <label className="text font-semibold text-[#212529]">
                {selectedUserCode}
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
                } text-white p-1 rounded-lg w-32 float-right mb-1 mt-10`}
              >
                {isConfirmed ? "Chọn lại" : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 h-3/5 ">
          <div
            className={`rounded-lg border border-gray-400 border-solid border-1 w-full  bg-white ${
              !isConfirmed ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="col-span-1">
              <div className="pl-6 pr-6 pt-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Danh sách công việc đã chọn
                </h2>
                <div className="srcoll">
                  <table className="min-w-full text-sm text-left text-gray-500">
                    <thead>
                      <tr>
                        <th className="px-6 py-3">Nhân viên</th>
                        <th className="px-6 py-3">Thời gian</th>
                        <th className="px-6 py-3">Số lượng</th>
                        <th className="px-6 py-3">Bộ phận</th>
                        <th className="px-6 py-3">Công việc</th>
                        <th className="px-6 py-3">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3">{report.user}</td>
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
            </div>
          </div>
          <div
            className={`col-span-1 rounded-lg border border-gray-400 border-solid border-1 w-full bg-white pb-5 ${
              !isConfirmed ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className = " flex justify-end mr-4  mt-2">
              <svg className="w-[25px] h-[25px] fill-[#050505]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
              </svg>
              <label className="ml-1 text-xl leading-7 font-semibold text-[#3cbbc2]">
                10 Tiếng
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
            <div className="pl-6 pr-6 pt-4">
              <div className="grid">
                <div className="grid gap-6 mb-4 md:grid-cols-3 w-full">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      Số giờ
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      // value={inputHour}
                      onChange={(e) => setInputHour(parseInt(e.target.value))}
                      className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 "
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      Số phút
                    </span>
                    <InputNumber />
                  </div>
                    <div className=" flex items-center border-gray-300 rounded-md">
                      <label className = "text-sm leading-5 font-semibold"> Số lượng:</label>
                      <input
                        type="text"
                        className="ml-2 flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 "
                        min={0.1}
                        step={0.1}
                        required
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
          className={` mt-2 p-2 rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white  ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
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
