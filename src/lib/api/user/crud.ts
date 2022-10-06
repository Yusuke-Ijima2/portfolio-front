import { User } from "types/index";
import client from "lib/api/client";

export const userList = async () => {
  try {
    console.log(31);
    const json = await client.get("users");

    const UserAll: User[] = await json.data;
    return UserAll;
  } catch (err) {
    console.log(err);
  }
};
