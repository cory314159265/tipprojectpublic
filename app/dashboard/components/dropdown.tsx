import React, { useState } from "react";

const menuArray = ["Add Tip", "Add Job"];

export default function DropdownMenu({setSelection}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("Add Tip");

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleItemClick = (item: string) => {
    setSelection(item);
    setSelectedItem(item);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left py2">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {selectedItem}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-200 bg-white rounded-md shadow-lg z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuArray.map((item) => {
              return (
                <button
                key={item}
                  onClick={() => handleItemClick(item)}
                  className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${
                    selectedItem === item
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  {item}
                </button>
              );
            })}
            
          </div>
        </div>
      )}
    </div>
  );
}
