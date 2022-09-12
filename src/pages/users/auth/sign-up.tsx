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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("submit");

    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    console.log(params);

    try {
      const res = await signUp(params);
      console.log(res.status);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
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
      console.log(err);
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
        {/* <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            /> */}
        <label>email</label>
        <input
          id="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />

        {/* <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            /> */}
        <label>password</label>
        <input
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        {/* <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            /> */}
        <label>password Confirmation</label>
        <input
          id="passwordConfirmation"
          type="password"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        {/* <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            /> */}
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
        {/* <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button> */}
        {alertMessageOpen && <p>エラー</p>}
      </form>
    </>
  );
};

export default SignUp;
