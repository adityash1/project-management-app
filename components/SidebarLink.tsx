"use client";

import Link from "next/link";
import clsx from "clsx";
import { logout } from "@/lib/api";

import { Settings, User, Grid, LogOut, Edit2 } from "react-feather";
import { usePathname, useRouter } from "next/navigation";

const icons = { Settings, User, Grid, LogOut, Edit2 };
const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  const router = useRouter();

  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const handleLogout = () => {
    if (link.icon === "LogOut") {
      logout();
      router.push("/signin");
    }
  };

  const Icon = icons[link.icon];
  return (
    <Link href={link.link}>
      <Icon
        size={30}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
        onClick={handleLogout}
      />
    </Link>
  );
};

export default SidebarLink;
