import React from "react";
import { useForm } from "react-hook-form";
import { SignUpParams } from "types/index";
import { signUp } from "lib/api/user/auth";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = handleSubmit(async (data: SignUpParams) => {
    const res = await signUp(data);
    // 200 が返ってきたら登録成功
    if (res?.status === 200) {
      alert("ユーザー登録完了");
      router.push({
        pathname: "/",
      });
    }
  });

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>name</label>
            <input
              className="border-2 border-black"
              id="name"
              type="text"
              {...register("name", {
                required: "※必須項目です",
                maxLength: {
                  value: 20,
                  message: "※20文字以内で入力してください",
                },
              })}
            />
            <span>{errors.name?.message}</span>
            <br></br>

            <label>email</label>
            <input
              className="border-2 border-black"
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
            <span>{errors.email?.message}</span>

            <br></br>
            <label>password</label>
            <input
              className="border-2 border-black"
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
            <span>{errors.password?.message}</span>
            <br></br>

            <label>password(Confirm)</label>
            <input
              className="border-2 border-black"
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation", {
                required: "※必須項目です",
                minLength: {
                  value: 6,
                  message: "※6文字以上で入力してください",
                },
              })}
            />
            <span>{errors.passwordConfirmation?.message}</span>

            <br></br>
            <button className="border-2 border-black" type="submit">
              新規登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
