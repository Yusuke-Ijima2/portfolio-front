import React from "react";
import { useForm } from "react-hook-form";
import { SignInParams } from "types/index";
import { useRouter } from "next/router";
import { signIn } from "lib/api/user/auth";

const SignIn: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data: SignInParams) => {
    try {
      const res = await signIn(data);
      // console.log(res);
      // 200 が返ってきたらログイン成功
      if (res.status === 200) {
        res?.status;
        alert("ログインしました");
        router.push({
          pathname: "/",
        });
      }
    } catch (error) {
      // console.log(error);
      alert("アカウントが見つかりませんでした");
    }
  });

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "※必須項目です",
                maxLength: {
                  value: 50,
                  message: "※50文字以内で入力してください",
                },
              })}
            />
            <br />
            <span>{errors.email?.message}</span>

            <br></br>
            <label>password</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "※必須項目です",
                minLength: {
                  value: 6,
                  message: "6文字以上で入力してください",
                },
              })}
            />
            <br />
            <span>{errors.password?.message}</span>
            <br></br>
            <button type="submit">ログイン</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
