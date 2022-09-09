import React from "react";
import { useState, useEffect } from "react";
import { userList } from "lib/api//user/crud";
import { User } from "types/index";

const UserIndex: React.VFC = () => {
  const [users, setAllUsers] = useState<User[] | undefined>([]);

  useEffect(() => {
    const getUserAll = async () => {
      const UserData: User[] | undefined = await userList();
      setAllUsers(UserData);
    };
    getUserAll();
  }, []);

  return (
    <>
      <div>テスト用ユーザー一覧表示</div>
      <div className="text-sm text-gray-500">
        {users !== undefined &&
          users.map((userList: User) => (
            <div key={userList.id}>
              <div>
                <div>{userList.name}</div>
              </div>
              <div>
                <div>{userList.email}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserIndex;
