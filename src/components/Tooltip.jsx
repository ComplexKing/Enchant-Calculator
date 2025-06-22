// src/components/Tooltip.jsx
import React, { useState } from "react";

export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute z-10 bottom-full mb-2 w-max max-w-xs rounded bg-gray-900 px-3 py-1 text-xs text-gray-100 shadow-lg dark:bg-gray-700 dark:text-gray-200 whitespace-normal"
        >
          {content}
        </div>
      )}
    </div>
  );
}
