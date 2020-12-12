import React from "react";

interface shotProps {
  className: string;
}

export const Shot: React.FC<shotProps> = ({ className }) => {
  return (
    <svg
      className={className}
      id="Layer_1"
      height="512"
      viewBox="0 0 512.021 512.021"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m463.609 19.56c2.289-10.08-5.38-19.539-15.582-19.539-412.514 0-384.33-.121-386.48.217-9.427 1.482-15.43 10.803-13.002 19.821 0 .1 1.936 7.423 5.59 21.441 46.513 178.254 41.892 303.043 41.892 422.521 0 26.467 21.533 48 48 48h224c26.467 0 48-21.533 48-48 0-152.993-3.721-247.838 47.482-443.961 0-.101.078-.4.1-.5zm-36.291 12.461c-27.147 104.059-30.595 159.426-48.739 278.677-9.272 61.028-60.813 105.323-122.552 105.323s-113.28-44.295-122.552-105.327c-18.433-121.152-21.853-175.654-48.738-278.673zm-59.291 448h-224c-8.822 0-16-7.178-16-16v-82.873c62.053 89.177 194.118 88.931 256 0v82.873c0 8.822-7.177 16-16 16z" />
    </svg>
  );
};
