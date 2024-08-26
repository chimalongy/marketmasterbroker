import React, { useState } from 'react';



const AdminCollapsible = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-container">
      <button
        className="collapsible-header"
        onClick={toggleCollapsible}
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${title}`}
      >
        <span>{title}</span>
        {isOpen ? <i class="fa-solid fa-caret-up"></i> :<i class="fa-solid fa-caret-down"></i>}
      </button>
      {isOpen && (
        <div
          id={`collapsible-content-${title}`}
          className="collapsible-content"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AdminCollapsible;
