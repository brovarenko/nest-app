import Link from "next/link";
import Button from "./Button";

const NavBar = async () => {
  return (
    <nav className='bg-gray-900 p-5'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <p className='text-white text-2xl font-semibold'>Blog</p>
          </Link>
          <Link href='/sign-in'>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
