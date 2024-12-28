import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

const MessageModal = ({
  text,
  subText,
  state,
}: {
  text: string;
  subText?: string;
  state: string;
}) => {
  const refreshPage = () => {
    window.location.reload();
    return;
  };
  return (
    <>
      <div className="w-screen h-screen bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center">
        <div
          className="bg-[#FFF] w-[330px] h-[fit-content] py-4 px-2 rounded-md flex flex-col gap-4 items-center justify-center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <FaRegCircleXmark size={50} color="red" />
          <div className="flex flex-col gap-[2px] items-center justify-center">
            <p className="text-[24px] text-[#1d1d1d] font-bold ">{text}</p>
            {subText && (
              <p className="text-[16px] text-[#757575] font-semibold text-center">
                {subText}
              </p>
            )}
          </div>
          <button
            className="text-[#fff] text-[18px] font-bold w-[fit-content] bg-[red] px-6 py-1 tracking-wider rounded-sm"
            onClick={refreshPage}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageModal;
