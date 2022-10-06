import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { AuthContext } from "pages/_app";
import { signIn } from "lib/api/auth";
import { SignInParams } from "types/index";

// サインイン用ページ
const SignIn: React.FC = () => {
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);

      console.log(res);
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/home");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      const errorMessages = err.response.data.errors;
      console.log(errorMessages);
      setErrorMessages(errorMessages);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <label>email</label>
        <input
          id="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />

        <label>password</label>
        <input
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <button
          type="submit"
          disabled={!email || !password ? true : false}
          onClick={handleSubmit}
        >
          ログイン
        </button>
        {alertMessageOpen &&
          errorMessages.map((errorMessage) => <li>{errorMessage}</li>)}
      </form>
    </>
  );
};

export default SignIn;
