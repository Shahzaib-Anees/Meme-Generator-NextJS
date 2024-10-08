"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/app/configs/firebase/firebaseConfig";
import { getSingleData, updateDocument } from "@/app/configs/firebase/firebaseMethods";
import "./MemeCreatorForm.css";

interface MemeCreatorFormProps {
  templateId: string;
  templateUrl: string;
  templateInputBox: number;
}
function MemeCreatorForm(props: MemeCreatorFormProps) {
  const router = useRouter();
  const [ifTryCreateMeme, setIfTryCreateMeme] = useState(false);
  const [inputBoxArray, setInputBoxArray] = useState([]);
  const [apiResponse, setApiResponse] = useState("");
  // Setting Default Values to prevent data crash
  useEffect(() => {
    // Configring Number of Inputs for Specific Meme 
    for (let i = 1; i <= props.templateInputBox; i++) {
      inputBoxArray.push(i);
    }
    setInputBoxArray([...inputBoxArray]);
  }, []);
  // Hook Form 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // Submit Form 
  const onSubmit = async (data) => {
    const currentUserId = auth?.currentUser?.uid;
    setIfTryCreateMeme(true);
    // Logic for making dynamic text api call
    const text = [];
    console.log(data);
    let array = [];
    let i = 0;
    for (let values in data) {
      array.push(data[values]);
      text.push(`text${i}`, "=", array[i], "&");
      i++;
    }
    console.log(array);
    text.splice(text.length - 1, 1);
    let x = text.join("");
    console.log(x);
    try {
      const apiResponse = await fetch(
        `https://api.imgflip.com/caption_image?template_id=${props.templateId}&username=MohammadShahzaib&password=shah123456789&${x}`,
        {
          method: "POST",
        }
      );
      const response: any = await apiResponse.json();
      const memeUrl = response.data.url;
      setApiResponse(memeUrl);
      const currentUserData: any = await getSingleData("users", currentUserId);
      const { memesGallery } = currentUserData;
      let array: string[] = [...memesGallery, memeUrl];
      console.log(array);
      const userDocUpdate = await updateDocument("users", currentUserId, {
        memesGallery: [...array],
      });
      console.log(userDocUpdate);
    } catch (error) {
      console.log(error);
    } finally {
      setIfTryCreateMeme(false);
      reset();
      router.push(`${apiResponse}`);
    }
  };
  return (
    <>
      <article className="form-container flex items-center justify-center sm:w-[90%] lg:w-[fit-content] h-[fit-content]">
        <form
          className="w-[fit-content] flex flex-col items-center justify-center rounded gap-4 py-7 px-6 mt-2 bg-[#fbfbfb]"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputBoxArray?.length > 0 &&
            inputBoxArray.map((boxcount) => {
              return (
                <div className="input-containers lg:w-[500px] sm:w-[470px] flex flex-col gap-[2px] mt-1">
                  <label
                    className="text-[16px] text-[#272727] font-semibold"
                    htmlFor="email"
                  >
                    Text # {boxcount}
                  </label>
                  <input
                    type="text"
                    name="text"
                    placeholder="enter text here"
                    className="py-2 px-2 outline-none focus:border-[1px] focus:border-[#c73939] hover:border-[1px] hover:border-[#c73939] rounded-md text-[15px]"
                    {...register(`text-${boxcount}`, { required: true })}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    }}
                  />
                  {errors.email && (
                    <span className="error-text">This field is required</span>
                  )}
                </div>
              );
            })}
          <button
            type="submit"
            className="w-[100%] bg-[#c73939] text-[#fff] py-2 font-bold rounded disabled:opacity-50"
            disabled={ifTryCreateMeme}
          >
            {ifTryCreateMeme ? "Creating Meme..." : "Create Meme"}
          </button>
        </form>
      </article>
    </>
  );
}

export default MemeCreatorForm;
