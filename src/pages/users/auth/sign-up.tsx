import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { AuthContext } from "pages/_app";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "types/index";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("submit");

    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    // console.log(params);

    try {
      const res = await signUp(params);
      // console.log(res.status);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/home");

        // console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      // console.log(err);
      const errorMessages = err.response.data.errors.fullMessages;
      // console.log(errorMessages);
      setErrorMessages(errorMessages);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <label>name</label>
        <input
          id="name"
          type="name"
          onChange={(event) => setName(event.target.value)}
        />
        <br />

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

        <label>password Confirmation</label>
        <input
          id="passwordConfirmation"
          type="password"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        <br />

        <button
          type="submit"
          disabled={
            !name || !email || !password || !passwordConfirmation ? true : false
          }
          onClick={handleSubmit}
        >
          新規作成
        </button>
        {alertMessageOpen &&
          errorMessages.map((errorMessage) => <li>{errorMessage}</li>)}
      </form>
    </>
  );
};

export default SignUp;
