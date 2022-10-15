import { useRouter } from "next/router";

const Test2 = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <>
      <h1>test1</h1>
      <button onClick={goToHome}>goToHome</button>
      {currentUser && <p onClick={goToHome}>{currentUser.email}</p>}
    </>
  );
};

export default Test2;
