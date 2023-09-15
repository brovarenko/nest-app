"use client";
import Link from "next/link";
import Button from "./common/Button";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import UserMenu from "./UserMenu";
import Modal from "./common/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import SignIn from "./SignIn";
import AuthForm from "./AuthForm";

const NavBar = () => {
  //const session = await getAuthSession();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className='bg-gray-900 p-5'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <p className='text-white text-2xl font-semibold'>Blog</p>
          </Link>
          {session ? (
            <UserMenu user={session.user} />
          ) : (
            // <Link href='/sign-in'>
            <Button onClick={openModal}>Sign In</Button>
            // </Link>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Log In'>
        <AuthForm />
      </Modal>
    </nav>
  );
};

export default NavBar;
