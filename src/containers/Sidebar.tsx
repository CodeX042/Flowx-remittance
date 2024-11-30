import React from "react";
import {
  Home,
  Settings,
  LogOut,
  Wallet,
  BellIcon,
  NotebookText,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const navSections = [
    {
      title: "Main",
      items: [
        { icon: <Home size={24} />, href: "/", id: "home" },
        { icon: <Wallet size={24} />, href: "/wallet", id: "wallet" },
        {
          icon: <NotebookText size={24} />,
          href: "/transactions",
          id: "transactions",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          icon: <BellIcon size={24} />,
          href: "/notification",
          id: "notification",
        },
        { icon: <Settings size={24} />, href: "/settings", id: "settings" },
      ],
    },
  ];

  const currentPath = window.location.pathname;

  return (
    <aside className="h-auto w-30  flex flex-col justify-start gap-10 py-4 p-4 ml-4">
      {/* Navigation Sections */}
      <div className="space-y-6">
        {navSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="">
            <ul className="space-y-2 bg-teal-900 bg-opacity-60 backdrop-blur-sm p-2 rounded-full">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full transition-colors duration-200 ${
                      currentPath === item.href
                        ? "bg-white text-teal-500"
                        : "text-gray-400 hover:bg-gray-800 hover:text-teal-400"
                    }`}
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="">
        <p className="flex items-center justify-center w-12 h-12 mx-auto rounded-full text-white hover:bg-gray-800 transition-colors duration-200">
          <LogOut size={24} />
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
