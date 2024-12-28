import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

const MessageModal = ({ text, state }: { text: string; state: string }) => {
  return (
    <>
      <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 flex justify-center items-center">
        <div
          className="bg-[#FFF] w-[320px] h-[150px] rounded-md flex flex-col gap-4 items-center justify-center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <FaRegCircleXmark size={40} color="red" />
          <p className="text-[24px] text-[#1d1d1d] font-bold ">{text}</p>
        </div>
      </div>
    </>
  );
};

export default MessageModal;
