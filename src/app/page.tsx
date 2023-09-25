import Button from "./components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href='/group/create'>
        <Button>Create Group</Button>
      </Link>
    </main>
  );
}
