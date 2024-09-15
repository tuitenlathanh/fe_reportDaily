"use client";
import { group } from "console";
import InputFloat from "./lib/inputFloat";
import InputNumber from "./lib/inputNumber";
import { useState, useEffect } from "react";

type User = {
  UserCode: string;
  Name: string;
};
export default function Home() {
  const [users, setUsers] = useState([]);
  const [workGroups, setWorkGroups] = useState([]);
  const [works, setWorks] = useState([]);
  const [times, setTimes] = useState([]);
  const [reports, setReports] = useState([]);

  const [selectWorkForWorkdID, setSelectWorkForWorkdID] = useState ([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/mockData");
      const data = await response.json();
      setUsers(data.users);
      setWorkGroups(data.workGroups);
      setWorks(data.works);
      setTimes(data.workTime);
    }

    fetchData();
  }, []);
  const hanlderCheck = () => {
    console.log("ssss");
    const a = document.getElementById("hanlder");
    console.log(a);
  };
 const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroupId(groupId);
    filterWorkByID(groupId);
  };

  const filterWorkByID = (GroupID) => {
    console.log("Selected Group ID: " + GroupID);
    const filtered = works.filter(item => item.WorkGroup === parseInt(GroupID));
    setSelectWorkForWorkdID(filtered);
    console.log(filtered);
  };



  return (
    <div className=" items-center justify-items-center min-h-screen gap-16 sm:p-10 font-[family-name:var(--font-get-roboto)] bg-[url('./bg.png')] p-6">
      {/* layou cha*/}
      <div className="pb-4">
        {/* header  */}
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-8">
          <div className="p-2 mt-6">
            <h1 className="text-4xl text-center font-semibold text-[#212529]">
              BÁO CÁO HẰNG NGÀY [rel 1.1]
            </h1>
          </div>
          <div className="p-6">
            <div id="hanlder" className="grid gap-6 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-xl leading-5 font-semibold ">
                  Chọn nhân viên:
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                  required
                >
                  <option value=""></option>
                  {users.map((users) => (
                    <option key={users.UserCode} value={users.UserCode}>
                      {users.UserCode} - {users.Name}
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
                >
                  <option value=""></option>
                  {times.map((times) => (
                    <option key={times.Id} value={times.Id}>
                      {times.hour} tiếng ({times.minute}) phút
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full">
              <button
                onClick={hanlderCheck}
                className="bg-blue-700 text-white p-1 hover:bg-blue-600 rounded-lg w-32 float-right mb-1"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* body 1 */}
      <div className="pb-4">
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5">
          <div className="pl-6 pr-6 pt-4">
            <div className="grid gap-6">
              <div>
                <label className="block mb-2 text-xl leading-5 font-semibold text-[#212529]">
                  Chọn bộ phận
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                  required
                  onChange={ handleGroupChange}
                  // onChange={e => setCategoria(e.target.value)}
                >
                 <option value= ""></option>
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
      {/* body 2 */}
      <div className="pb-4">
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-fit bg-white pb-5">
          <div className="pl-6 pr-6 pt-4">
            <div className="grid">
              <div>
                <label className="block mb-2 text-xl leading-5 font-semibold text-[#212529]">
                  Chọn công việc
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border focus:ring focus:border-blue-300 focus:outline-none"
                  required
                >
                  <ul>
                     
                  </ul>
                  </select>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body detail công việc */}
      <div>
        <div className="pb-4">
          {/* header  */}
          <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-max bg-white">
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="grid gap-6 mb-4 md:grid-cols-2 w-full">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    Số giờ
                  </span>
                  <InputNumber />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="inline-flex items-center p-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    Số phút
                  </span>
                  <InputNumber />
                </div>
              </div>
              <div className="w-full">
                <label className="inline-flex items-center p-2">
                  Số lượng:
                </label>
                <InputFloat />
              </div>
              <div className="w-full">
                <label className="inline-flex items-center p-2   ">
                  Ghi chú:
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                  required
                />
              </div>
              <div className="w-full mt-4">
                <button className="bg-blue-700 text-white hover:bg-blue-600 rounded-lg w-32 float-right p-1 h-10">
                  Gửi công việc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        {/* header  */}
        <div className="rounded-lg border border-gray-400 border-solid border-1 w-full min-h-max bg-white">
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="grid gap-6 mb-4 md:grid-cols-2 w-full">
              <label className="block mb-2 text-xl leading-5 font-semibold ">
                Danh sách công việc
              </label>
              {/* Render submitted reports */}
              <div className="mt-8 bg-slate-400">
                <ul>
                  {reports.map((report, index) => (
                    <li key={index}>
                      Công việc: {report.task} - Thời gian: {report.duration}{" "}
                      phút - Số lượng: {report.number} - Ghi chú: {report.note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full mt-4">
              <button className="bg-red-700 text-white hover:bg-red-600 rounded-lg w-32 float-right p-1 h-10">
                Xóa công việc
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4 rounded-lg border border-gray-400 border-solid border-1 w-full min-h-max bg-white">
        <div className="w-full mt-4">
          <button className="bg-green-800 text-white hover:bg-green-600 rounded-lg p-1 h-10 w-full ">
            Gửi công việc
          </button>
        </div>
      </div>
    </div>
  );
}
