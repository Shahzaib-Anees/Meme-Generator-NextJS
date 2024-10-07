"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import MemeCreatorForm from "../components/MemeCreatorForm/MemeCreatorForm";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase/firebaseConfig";
interface MemeGeneratorProps {
  templateId: string;
  templateUrl: string;
  templateInputBox: number;
}
function MemeGenerator(props: { searchParams: MemeGeneratorProps }) {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
        } else {
          router.push("/login");
        }
      });
    };
    checkUser();
  } , []);
  return (
    <>
      <article>
        <div className="w-[100%] flex flex-col items-center justify-center gap-1 py-4 px-3 mt-2 bg-[#f3f3f3]">
          <h1 className="text-center text-4xl font-extrabold">
            <span className="text-[#C73939] underline">Generate</span>
            <span className="text-[#4B4B4B] ml-2 underline">Memes</span>
          </h1>
          <p className="text-center text-[14px] w-[70%] text-[#777777] font-semibold">
            Unleash your creativity with our Meme Generator! Create hilarious,
            relatable, and trending memes in seconds. With an intuitive
            interface, you can easily upload images, add witty captions,
            customize fonts, and adjust text placement for that perfect comedic
            timing. Share your creations instantly on social media or download
            them for later. Whether you're a meme enthusiast or a casual
            creator, our app offers all the tools you need to go viral!
          </p>
        </div>
        <div className="w-[100%] flex flex-col items-center justify-center gap-1 py-4 px-3 mt-2">
          <Image
            src={props.searchParams.templateUrl}
            width={300}
            height={300}
            className="w-[500px] h-[fit-content]"
            alt="image"
          />
          <MemeCreatorForm
            templateId={props.searchParams.templateId}
            templateUrl={props.searchParams.templateUrl}
            templateInputBox={props.searchParams.templateInputBox}
          />
        </div>
      </article>
    </>
  );
}

export default MemeGenerator;
