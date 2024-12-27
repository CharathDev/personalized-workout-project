"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  function getMenuClasses() {
    let menuClasses = [];
    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "top-[60px]",
        "bg-neutral-950",
        "w-full",
        "p-10",
        "gap-10",
        "flex-col",
        "left-0",
        "z-50",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }
    return menuClasses.join(" ");
  }

  return (
    <>
      <nav className=" bg-neutral-950 text-white p-4 sm:p-4 md:flex md:justify-between md:items-center">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            Grindset AI
          </a>
          <div className="flex">
            <div className={getMenuClasses()}>
              <Link
                href={"/"}
                className="mx-2 hover:text-gray-300 text-center py-2"
              >
                Dashboard
              </Link>
              <Link
                href={"/generate_workout"}
                className="mx-2 hover:text-gray-300 text-center py-2"
              >
                Generate Workout
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? (
                  <IoCloseOutline size={24} />
                ) : (
                  <IoIosMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
