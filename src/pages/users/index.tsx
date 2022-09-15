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
      <h1>テスト用:ユーザー一覧表示</h1>
      <div className="text-sm text-gray-500">
        {users !== undefined &&
          users.map((user: User) => (
            <div key={user.id}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <br />
            </div>
          ))}
      </div>
    </>
  );
};

export default UserIndex;
