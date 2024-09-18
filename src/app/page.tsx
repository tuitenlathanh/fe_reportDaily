"use client";
import { useState, useEffect } from "react";
import InputNumber from "./lib/inputNumber";
import InputFloat from "./lib/inputFloat";

// Định nghĩa các kiểu dữ liệu
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
  // Khai báo state với kiểu dữ liệu rõ ràng
  const [users, setUsers] = useState<User[]>([]);
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const [selectWorkForWorkdID, setSelectWorkForWorkdID] = useState<Work[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [selectedUserCode, setSelectedUserCode] = useState<string>("");
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
    if (selectedUserCode && selectedTimeId) {
      setIsConfirmed(!isConfirmed);
      if (isConfirmed) {
        setSelectedGroupId("");
        setSelectWorkForWorkdID([]);
      }
    } else {
      alert("Vui lòng chọn đủ nhân viên và thời gian trước khi xác nhận!");
    }
  };

  // const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const timeId = event.target.value;
  //   setSelectedTimeId(timeId);

  //   const selectedTime = times.find((time) => time.Id === parseInt(timeId));
  //   if (selectedTime) {
  //     setInputHour(selectedTime.hour);
  //     setInputMinute(selectedTime.minute);
  //   }
  //   console.log(selectedTime);
  // };
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const timeId = event.target.value;
    setSelectedTimeId(timeId);

    const time = times.find((time) => time.Id === parseInt(timeId));
    if (time) {
      setInputHour(time.hour);
      setInputMinute(time.minute);
      setSelectedTime(time);
    }
    console.log("handleTimeChange" + time);
  
  };
  const calculateTotalMinutes = () => {
    if (selectedTime) {
      const totalMinutes = selectedTime.minute;
      console.log("tổng phút đã chọn: " + selectedTime.minute)
      return totalMinutes;
    }
    // const a = selectedTime;
    // console.log(a);
 
    console.log("Giá trị số giờ:", inputHour);
    return 0;
  };

  const handleChangeInoput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.replace(/\+|-/gi, "");
    useState({ financualGoal: value });
  };

  const handleAddWork = () => {
    const selectedUser = users.find(
      (user) => user.UserCode === selectedUserCode
    );
    const selectedWorkGroup = workGroups.find(
      (group) => group.Id === parseInt(selectedGroupId)
    );
    const selectedWork = selectWorkForWorkdID.find(
      (work) => work.Id === parseInt(selectedGroupId)
    );

    if (selectedUser && selectedWorkGroup && selectedWork) {
      const newReport: Report = {
        user: selectedUser.Name,
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

  return (
    <div className="items-center justify-items-center min-h-screen gap-16 sm:p-10 font-[family-name:var(--font-get-roboto)] bg-[url('./bg.png')] p-6">
      {/* Layout cha */}
      <div className="pb-4">
        {/* Header */}
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-8">
          <div className="p-2 mt-6">
            <h1 className="text-4xl text-center font-semibold text-[#212529]">
              BÁO CÁO HẰNG NGÀY [rel 1.2]
            </h1>
          </div>
          <div className="p-6">
            <div id="hanlder" className="grid gap-6 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-xl leading-5 font-semibold">
                  Chọn nhân viên:
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                  required
                  disabled={isConfirmed}
                  value={selectedUserCode}
                  onChange={(e) => setSelectedUserCode(e.target.value)}
                >
                  <option value=""></option>
                  {users.map((user) => (
                    <option key={user.UserCode} value={user.UserCode}>
                      {user.UserCode} - {user.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-xl leading-5 font-semibold">
                  Chọn thời gian
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
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
              </div>
            </div>
            <div className="w-full">
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
      </div>

      {/* Chọn bộ phận */}
      <div className="pb-4">
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5 ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="pl-6 pr-6 pt-4">
            <div className="grid gap-6">
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
            </div>
          </div>
        </div>
      </div>
      {/* chọn công việc */}
      <div className="pb-4">
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5 ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="pl-6 pr-6 pt-4">
            <div className="grid gap-6">
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
        </div>
      </div>

      {/* chi tiết công việc */}
      <div className="pb-4">
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5 ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="pl-6 pr-6 pt-4">
            <div className="mb-2">
              <label className = "text-green-600 ">[Tổng số phút còn lại: {calculateTotalMinutes()}]</label>
            </div>
            <div className="grid">
              <div className="grid gap-6 mb-4 md:grid-cols-2 w-full">
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
              </div>

              <div>
                <label className="block mb-2 text-sm leading-5 font-semibold">
                  Số lượng
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    type="text"
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 "
                    min={0.1}
                    step={0.1}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
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
              {/* Button Thêm công việc */}
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

      {/* Bảng hiển thị các công việc đã thêm  */}
      <div className="pb-4">
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5 ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="pl-6 pr-6 pt-4">
            <h2 className="text-2xl font-semibold mb-4">
              Danh sách công việc đã chọn
            </h2>
            <div className="srcoll">
              {reports.length === 0 ? (
                <p>Chưa có công việc nào được thêm.</p>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* gửi công việc */}
      <div className="pb-4">
        <div
          className={`rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5 ${
            !isConfirmed ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="pl-6 pr-6 pt-4">
            <div className="grid">
              <div className="w-full mt-4">
                <button
                  className="bg-green-800 text-white hover:bg-green-600 rounded-lg p-1 h-10 w-full"
                  disabled={!isConfirmed}
                >
                  Gửi báo cáo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
