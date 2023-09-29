import Link from "next/link";
import Button from "./components/common/Button";

export default function Home() {
  return (
    <div className='bg-gray-300 h-screen'>
      <div className='flex flex-row justify-center'>
        <div className='basis-1/2'></div>
        <div className='bg-stone-50 basis-1/4 rounded-lg border border-gray-300 p-3 w-fit my-5'>
          <div>
            <p className='font-semibold py-3 flex items-center gap-1.5'>Home</p>
          </div>
          <div className='flex justify-between gap-x-4 py-3'>
            <p>
              Your personal Breadit frontpage. Come here to check in with your
              favorite communities.
            </p>
          </div>
          <Button>
            <Link href={`/r/create`}>Create Community</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
