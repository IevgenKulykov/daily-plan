import React, { useState, ReactNode } from "react";

interface DotNavigationProps {
  children: ReactNode;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ children }) => {
  const contentArray = React.Children.toArray(children);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div style={{ position: "relative", paddingTop: "5px" }}>
      <div style={{ textAlign: "center", position: "absolute", top: "10px", left: "0", right: "0" }}>
        {contentArray.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "0 5px",
              backgroundColor: activeIndex === index ? "black" : "gray",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            data-testid={`dot-${index}`}
          />
        ))}
      </div>

      <div>{contentArray[activeIndex]}</div>
    </div>
  );
};

export default DotNavigation;
