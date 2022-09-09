import { SignUpParams, SignInParams } from "types/index";
import client from "lib/api/client";

export const signUp = (params: SignUpParams) => {
  try {
    return client.post("auth", params);
  } catch (err) {
    alert(err);
  }
};

export const signIn = (params: SignInParams) => {
  try {
    return client.post("auth/sign_in", params);
  } catch (err) {
    alert(err);
  }
};
