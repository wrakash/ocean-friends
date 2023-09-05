import React from "react";

export const SimpleCard = ({ header, content, ...rest}: any) => {
  return (
    <div className="w-full h-full">
      <div className="rounded-lg">
        {header}
        {content}
      </div>
    </div>
  );
};
