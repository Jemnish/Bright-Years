import React, { FC, useState } from 'react';
import avatarDefault from "../../../public/assets/avatar.jpg";
import Image from 'next/image';
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        logoutHandler();
        setShowModal(false);
    };

    const handleCancelLogout = () => {
        setShowModal(false);
    };

    return (
        <div className='w-full'>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                    alt=''
                    className='w-[20px] h-[20px] object-cover 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
                    width={20}
                    height={20}
                />
                <h5
                    className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                >
                    My Account
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className='dark:text-white text-black' />
                <h5
                    className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                >Change Password</h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className='dark:text-white text-black' />
                <h5
                    className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                >Enrolled Courses</h5>
            </div>
            {
                user.role === "admin" &&
                (
                    <Link
                        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                            }`}
                        href={"/admin"}
                    >
                        <MdOutlineAdminPanelSettings size={20} className='dark:text-white text-black' />
                        <h5
                            className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                        >Admin Dashboard</h5>
                    </Link>
                )
            }
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={handleLogoutClick}
            >
                <AiOutlineLogout size={20} className='dark:text-white text-black' />
                <h5
                    className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                >Logout</h5>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] sm:w-[400px] text-center">
                        <h3 className="text-xl font-semibold text-black">Are you sure you want to log out?</h3>
                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={handleConfirmLogout}
                            >
                                Yes, Logout
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideBarProfile;
