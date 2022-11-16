import React, { useEffect, useState, createContext } from "react";

import { getCurrentUser } from "lib/api/auth";

import { ScrapingData, User } from "types/index";
import { pythonTest } from "lib/api/pythonTest";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
    pythonData: ScrapingData | undefined | any;
    setPythonData: React.Dispatch<React.SetStateAction<ScrapingData>>;
  }
);

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); //現在使ってない
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [pythonData, setPythonData] = useState<ScrapingData | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    const res = await getCurrentUser();

    if (res?.data.isLogin === true) {
      setIsSignedIn(true);
      setCurrentUser(res.data.data);
    } else {
      console.log("No current user");
    }
    setIsLoading(false);
  };

  const handleGetPythonData = async () => {
    const res = await pythonTest();
    const scrapingData = res.data.data;

    if (res) {
      setPythonData(scrapingData);
    } else {
      console.log("No Scraping Data");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
    handleGetPythonData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        pythonData,
        setPythonData,
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
