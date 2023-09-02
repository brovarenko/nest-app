import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className='bg-gray-900 p-5'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <p className='text-white text-2xl font-semibold'>Blog</p>
          </Link>
          <Link href='/signin'>
            <div className='text-white hover:bg-orange-600 bg-orange-500 rounded-md px-4 py-2'>
              Sign In
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
