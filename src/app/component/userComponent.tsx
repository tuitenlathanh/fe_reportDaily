import React, { useEffect, useState } from 'react';

type User = {
  UserCode: string;
  Name: string;
};

interface UserProps {
  code: string;
  isUser: (IsFound: boolean) => void;
}

const UserComponent: React.FC<UserProps> = ({code, isUser}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userFound, setUserFound] = useState<User | null | undefined>(null);


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
      const userFound = users.find(user => user.UserCode === code)
      console.log(typeof(userFound)); 
      if(userFound){
        console.log("Đung");
      }else {
        isUser(false);
        console.log("sai");
      }
      
      setUserFound(userFound);
    }
  },[users, code, isUser])


  return (
    <div>
      <div>
        {userFound ? (
          <div>
            <p className='ml-2 w-full text font-semibold text-[#212529]'>{userFound.UserCode} - {userFound.Name}</p>
          </div>
        ) : (
            <p>Không tìm thấy người dùng với mã nhân viên: {code}</p>
        )}
      </div>
    </div>
  );
};


export default UserComponent;

