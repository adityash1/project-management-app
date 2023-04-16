import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Editor",
    icon: "Edit2",
    link: "/editor",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
  {
    label: "Logout",
    icon: "LogOut",
    link: "/signin",
  }
];

const Sidebar = () => {
  return (
    <Card className="h-full w-20 flex items-center justify-around flex-col mr-4 rounded-xl">
      {links.map((link) => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
