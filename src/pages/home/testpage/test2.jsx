import { useRouter } from "next/router";

const Test2 = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <>
      <h1>test2</h1>
      <button onClick={goToHome}>goToHome</button>
    </>
  );
};

export default Test2;
