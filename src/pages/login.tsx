import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  // isAuthenticatedでログイン状態なのかを判定
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
          <button
            className="bg-slate-400"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            ログアウト
          </button>
        </>
      ) : (
        <p>ログアウトしています</p>
      )}
    </div>
  );
};

export default LoginPage;
