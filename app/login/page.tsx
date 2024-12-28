"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInUser } from "../configs/firebase/firebaseMethods";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import MessageModal from "../components/MessageModal/MessageModal";

function Login() {
  const router = useRouter();
  const [ifTrySignIn, setIfTrySignIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [subTextError, setSubTextError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    setIfTrySignIn(true);
    console.log(data);
    try {
      const user: any = await signInUser(data.email, data.password);
      console.log(user.uid);
      console.log("Sign In Successfully");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setAuthError("Invalid Credentials");
      setSubTextError(
        "This email is whether not registered or password is incorrect"
      );
    } finally {
      reset();
      setIfTrySignIn(false);
    }
  };
  return (
    <>
      <article className="w-[100%] h-[fit-content]">
        <article className="w-[100%] min-h-[30vh] max-h-[fit-content] flex flex-col items-center py-8 px-3 bg-[#f2f2f2] relative">
          <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-center items-center lg:w-[40%] sm:w-[100%]">
            <h1 className="main-heading text-4xl text-[#c73939] font-bold">
              Log In
            </h1>
          </div>
          <div
            className="form-container lg:w-[550px] sm:w-[90%] h-[fit-content] flex flex-col gap-2 justify-center items-center bg-[#fff] rounded-md py-8 px-8 absolute top-[46%] left-[50%] translate-x-[-50%]"
            style={{
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <form
              className="w-[100%] flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-[2px]">
                <label
                  className="text-[14px] text-[#272727] font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  className="py-2 px-2 outline-none focus:border-[1px] focus:border-[#c73939] hover:border-[1px] hover:border-[#c73939] rounded-md text-[15px]"
                  {...register("email", { required: true })}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                />
                {errors.email && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-[14px] text-[#272727] font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  className="py-2 px-2 outline-none focus:border-[1px] focus:border-[#c73939] hover:border-[1px] hover:border-[#c73939] rounded-md text-[15px]"
                  {...register("password", { required: true })}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                />
                {errors.password && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
              <div className="flex gap-1 items-center justify-between mt-1 mb-1">
                <p className="text text-[13px] text-[#272727] font-bold">
                  Don't have an account
                  <Link href="/signup" className="py-1 px-2 ml-1 bg-[#e2e2e2]">
                    Sign Up
                  </Link>
                </p>

                <p className="text text-[13px] text-[#3030b3] font-bold">
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                className="w-[100%] bg-[#c73939] text-[#fff] py-2 font-bold rounded disabled:opacity-50"
                id="submitButton"
                disabled={ifTrySignIn}
              >
                {ifTrySignIn ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </article>
      </article>
      {authError && (
        <MessageModal text={authError} subText={subTextError} state="login" />
      )}
    </>
  );
}

export default Login;
