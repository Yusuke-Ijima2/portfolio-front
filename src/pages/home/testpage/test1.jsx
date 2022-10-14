import { useRouter } from "next/router";
import { AuthContext } from "pages/_app";
import { useContext } from "react";

const Test1 = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <>
      <h1>test1</h1>
      <button onClick={goToHome}>goToHome</button>
      <p onClick={goToHome}>{currentUser.email}</p>
    </>
  );
};

export default Test1;
