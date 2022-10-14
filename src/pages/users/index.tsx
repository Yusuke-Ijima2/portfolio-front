import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { userList } from "lib/api//user/crud";

import { User } from "types/index";
import { AuthContext } from "pages/_app";

const UserIndex: React.FC = () => {
  const [users, setAllUsers] = useState<User[] | undefined>([]);
  const { isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    const getUserAll = async () => {
      const UserData: User[] | undefined = await userList();
      setAllUsers(UserData);

      console.log(UserData);
      // if (UserData) {
      //   setAllUsers(UserData);
      // } else {
      //   router.push("/home");
      // }
      // try {
      //   console.log(2);

      //   const UserData: User[] | undefined = await userList();
      //   setAllUsers(UserData);
      // } catch (error) {
      //   console.log(error);

      //   router.push("/home");
      // }
    };
    // console.log(11);

    getUserAll();
  }, []);

  // useEffect(() => {
  //   const getUserAll = async () => {
  //     const UserData: User[] | undefined = await userList();
  //     setAllUsers(UserData);
  //   };
  //   getUserAll();
  // }, []);
  // console.log(users);

  return (
    <>
      <h1>テスト用:ユーザー一覧表示</h1>
      <div className="text-sm text-gray-500">
        {users !== undefined && isSignedIn === true ? (
          users.map((user: User) => (
            <div key={user.id}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <br />
            </div>
          ))
        ) : (
          <div>
            <p>ログインしてください</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserIndex;
