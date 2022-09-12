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
      console.log(err);
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

        {/* <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            value={email}
            margin="dense"
            onChange={(event) => setEmail(event.target.value)}
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
            placeholder="At least 6 characters"
            value={password}
            margin="dense"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          /> */}
        <button
          type="submit"
          disabled={!email || !password ? true : false}
          onClick={handleSubmit}
        >
          ログイン
        </button>
        {/* <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
            disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
            className={classes.submitBtn}
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
        {/* <Box textAlign="center" className={classes.box}>
            <Typography variant="body2">
              Don't have an account? &nbsp;
              <Link to="/signup" className={classes.link}>
                Sign Up now!
              </Link>
            </Typography>
          </Box> */}
      </form>
      {/* <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      /> */}
      {alertMessageOpen && <p>エラー</p>}
    </>
  );
};

export default SignIn;
