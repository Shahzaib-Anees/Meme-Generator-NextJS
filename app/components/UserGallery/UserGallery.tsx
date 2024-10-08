"use client";
import React, { useEffect, useState } from 'react';
import "./UserGallery.css";
import { getSingleData } from '@/app/configs/firebase/firebaseMethods';
import Image from 'next/image';

function UserGallery({ id }) {
    const [userMemeGallery, setUserMemeGallery] = useState([]);
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data: any = await getSingleData("users", id);
                setUserMemeGallery(data?.memesGallery);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    }, [])

    return (
        <>
            <article className='w-[100%] flex flex-col gap-3'>
                <h3 className='text-2xl font-bold mt-2 text-[#a4a4a4] indent-8 bg-[#fbfbfb] py-2 px-4'>
                    Your Gallery
                </h3>
                <div className='flex flex-wrap items-center justify-center gap-[70px] border-t-[1px] border-b-[1px] border-[#f7f7f7] py-2 px-4'>
                    {userMemeGallery?.length > 0 ? userMemeGallery?.map((item, index) => {
                        return (
                            <div key={index} className='w-[fit-content] h-[fit-content] p-2 flex items-center justify-center flex-col gap-2 border-[1px] border-[#f7f7f7] rounded overflow-hidden'
                                style={{
                                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                }}>
                                <img src={item} alt="meme" className='w-[370px] h-[370px] object-cover pb-3 border-b-[1px] border-[#f7f7f7]' />
                                <button className='bg-[#4B4B4B] px-7 py-2 text-[#fff] rounded font-semibold self-end mt-1 mr-3 hover:transition-all hover:bg-[rgba(0,0,0,0)] hover:border-2 hover:text-[#4b4b4b] hover:border-[#4b4b4b]'>
                                    <a href={item} target='_blank'>
                                        Check
                                    </a>
                                </button>
                            </div>
                        )
                    }) :
                        (<div className='w-[100%] h-[40vh] flex items-center justify-center'>
                            <h3 className='text-2xl font-bold'>
                                No Meme Found
                            </h3>
                        </div>)
                    }
                </div>
            </article>
        </>
    )
}

export default UserGallery