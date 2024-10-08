import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./page.css";
async function Home() {
  const memeTemplates = await fetch("https://api.imgflip.com/get_memes");
  const response = await memeTemplates.json();
  const templates = await response.data.memes;
  return (
    <>
      <div className="txt-cont w-[100%] flex flex-col items-center justify-center gap-1 py-4 px-3 mt-2 bg-[#efefef]">
        <h1 className="head-txt text-center text-4xl font-extrabold">
          <span className="text-[#C73939] underline">Generate</span>
          <span className="text-[#4B4B4B] ml-2 underline">Memes</span>
        </h1>
        <p className="para-txt text-center text-[14px] w-[70%] text-[#777777] font-semibold">
          Unleash your creativity with our Meme Generator! Create hilarious,
          relatable, and trending memes in seconds. With an intuitive interface,
          you can easily upload images, add witty captions, customize fonts, &
          adjust text placement for that perfect comedic timing. Share your
          creations instantly on social media or download them for later.
          Whether you're a meme enthusiast or a casual creator, our app offers
          all the tools you need to go viral!
        </p>
      </div>
      <article className="flex gap-10 items-center justify-center flex-wrap py-8 px-2">
        {templates.map((template: {
          url: string,
          id: string,
          box_count : number,
        }, index: number) => {
          return (
            <div
              className="w-[350px] h-[fit-content] flex flex-col gap-6 py-4 px-3 border-[1px] rounded border-[#c7c7c7]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              key={index}
            >
              <Image
                className="w-[100%] h-[250px]"
                width={300}
                height={300}
                src={template?.url}
                alt="image"
              />
              <div className="w-[100%] flex justify-end">
                <Link
                  href={{
                    pathname: "/meme-generator",
                    query: {
                      templateId: template?.id,
                      templateUrl: template?.url,
                      templateInputBox: template?.box_count,
                    },
                  }}
                >
                  <button className="py-2 px-3 rounded bg-[#4B4B4B] text-[#fff] text-[14px] font-semibold hover:border-[1px] hover:border-[#4B4B4B] hover:text-[#4B4B4B] hover:transition-all hover:bg-[rgba(0,0,0,0)] ">
                    Generate Meme
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
}

export default Home;
