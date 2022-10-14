import { useRouter } from "next/router";

const Test1 = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <>
      <h1>test1</h1>
      <button onClick={goToHome}>goToHome</button>
    </>
  );
};

export default Test1;
