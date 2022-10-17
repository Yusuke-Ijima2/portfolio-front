import React, { useContext } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "pages/_app";

// 認証済みユーザーの名前やメールアドレスを表示
const Index: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const router = useRouter();

  const goToSignInPage = () => {
    router.push("/users/auth/sign-in");
  };

  const goToSignUpPage = () => {
    router.push("/users/auth/sign-up");
  };

  const goToHome = () => {
    router.push("/home");
  };

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
