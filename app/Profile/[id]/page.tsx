"use client";
import React, { useState, useEffect } from 'react';
import ImageUploader from '@/app/components/ImageUploader/ImageUploader';
import { getSingleData } from '@/app/configs/firebase/firebaseMethods';
import UserGallery from '@/app/components/UserGallery/UserGallery';
import "./Profile.css";

function page(props: {
  params: {
    id: string,
  }
}) {
  const [userData, setUserData] = useState(null);
  const { id } = props.params;
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getSingleData("users", id);
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [])
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <article className='w-[100%] min-h-[35vh] max-h-[fit-content] flex flex-col items-center px-3 py-3 pb-5  mt-1 bg-[#fbfbfb]'>
      <div className="lg:w-[90%] sm:w-[100%] flex flex-col items-center justify-center gap-1 bg-[#fff] rounded-md py-8 px-3" style={{
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}>
        <div className='user-info-cont w-[100%] flex items-center gap-3 border-b-[1px] border-[#e2e2e2] px-8 pb-3'>
          <ImageUploader id={id} />
          <div className='flex flex-col gap-[2px]'>
            <h3 className='name-txt text-2xl font-bold'>{userData?.name}</h3>
            <p className='text-[14px] font-semibold text-[#9a9a9a]'>Joined on : {userData?.joinDate}</p>
          </div>
        </div>
        <div className='w-[100%]'>
          <UserGallery id={id} />
        </div>
      </div>
    </article>
  )
}

export default page