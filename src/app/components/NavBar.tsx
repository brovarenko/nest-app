"use client";
import Link from "next/link";
import Button from "./common/Button";
import UserMenu from "./UserMenu";
import Modal from "./common/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthForm from "./AuthForm";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className='bg-gray-100 p-3'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between content-center'>
          <Link className='flex' href='/'>
            <Image
              src='/icons/reddit-logo.png'
              alt='google'
              width={40}
              height={40}
            />
            <div className='text-black text-2xl font-semibold ml-1 self-center'>
              Reddit
            </div>
          </Link>
          {session ? (
            <UserMenu user={session.user} />
          ) : (
            <Button onClick={openModal}>Sign In</Button>
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
