"use client";
import { FC, useState } from "react";
import type { Session, User } from "next-auth";
import Link from "next/dist/client/link";
import { Avatar } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={toggleMenu}
          type='button'
          className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <Avatar size='sm' src={user.image ? user?.image : ""} />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 ml-2 -mr-1 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg whitespace-nowrap'>
          <div className='py-1'>
            <Link
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
            >
              Create group
            </Link>
            <Link
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Settings
            </Link>
            <Link
              href='#'
              className='flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={(event) => {
                event.preventDefault();
                signOut();
              }}
            >
              <LogOut size={20} />
              <div className='mx-2'>Sign Out</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
