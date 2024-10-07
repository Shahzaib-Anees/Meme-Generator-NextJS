"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MemeCreatorFormProps {
  templateId: string;
  templateUrl: string;
  templateInputBox: number;
}
function MemeCreatorForm(props: MemeCreatorFormProps) {
  const router = useRouter();
  const [inputBoxArray, setInputBoxArray] = useState([]);
  const [apiCallText, setApiCallText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    for (let i = 1; i <= props.templateInputBox; i++) {
      inputBoxArray.push(i);
    }
    setInputBoxArray([...inputBoxArray]);
    console.log(inputBoxArray);
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
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
      const response = await apiResponse.json();
      setApiResponse(response.data?.url);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      // router.push(`${apiResponse}`);
      console.log(apiResponse);
    }
  };
  return (
    <>
      <article className="lg:w-[fit-content] h-[fit-content]">
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
                <div className="w-[500px] flex flex-col gap-[2px] mt-1">
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
            className="w-[100%] bg-[#c73939] text-[#fff] py-2 font-bold rounded"
          >
            Create Meme
          </button>
        </form>
      </article>
    </>
  );
}

export default MemeCreatorForm;
