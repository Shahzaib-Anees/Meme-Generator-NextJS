"use client";
import React, { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { auth } from "../../configs/firebase/firebaseConfig";
import {
  getSingleData,
  signOutUser,
} from "../../configs/firebase/firebaseMethods";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import "./ProfileNav.css";

function ProfileNav() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      try {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User Found");
            console.log(user?.uid);
            setCurrentUserId(user?.uid);
          } else {
            setCurrentUserId(null);
            console.log("No User Found");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const reponse = await getSingleData("users", currentUserId);
        setUserData(reponse);
        console.log(reponse);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [currentUserId]);
  const logOutUser = async () => {
    try {
      const response = await signOutUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex-none gap-2">
        {currentUserId ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.profileImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={`/Profile/${currentUserId}`}>
                  <div className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </div>
                </Link>
              </li>
              <li>
                <div>Settings</div>
              </li>
              <li>
                <div>
                  <button
                    className="w-[fit-content] flex items-center gap-[5px] py-1 px-3 text-[#404040] font-semibold "
                    onClick={logOutUser}
                  >
                    <span>
                      <FaPowerOff />
                    </span>
                    <span>Logout</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login">
            <button className="login-btn lg:py-2 lg:px-5 rounded font-sans text-[#fff] font-semibold bg-[#4B4B4B] hover:transition-all hover:bg-[rgba(0,0,0,0)] hover:border-2 hover:text-[#4b4b4b] hover:border-[#4b4b4b]">
              Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default ProfileNav;
