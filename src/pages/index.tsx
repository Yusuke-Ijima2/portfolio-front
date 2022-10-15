import React, { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { signOut } from "lib/api/auth";
import { AuthContext } from "pages/_app";

// 認証済みユーザーの名前やメールアドレスを表示
const Index: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const { setIsSignedIn } = useContext(AuthContext);
  const router = useRouter();

  const goToSignInPage = () => {
    router.push("/users/auth/sign-in");
  };

  const goToSignUpPage = () => {
    router.push("/users/auth/sign-up");
  };

  const goToTest1 = () => {
    router.push("/home/testpage/test1");
  };

  const goToTest2 = () => {
    router.push("/home/testpage/test2");
  };

  const goToHome = () => {
    router.push("/home");
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);

        router.push("/users/auth/sign-in");

        // console.log("Succeeded in sign out");
      } else {
        // console.log("Failed in sign out");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // console.log(isSignedIn);
  // console.log(currentUser);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <button onClick={goToHome}>ホームへ</button>
        </>
      ) : (
        <>
          <h1>ログインしてください</h1>
          <button onClick={goToSignInPage}>go to sign-in page</button>
          <button onClick={goToSignUpPage}>go to sign-up page</button>
        </>
      )}
    </>
  );
};

export default Index;
