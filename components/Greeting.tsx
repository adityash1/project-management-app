import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greeting = async () => {
  const user = await getData();

  return (
    <div className="w-full py-2 relative">
      <h1 className="text-3xl text-gray-700 font-bold">
        Hello, {user.firstName}!
      </h1>
    </div>
  );
};

export default Greeting;
