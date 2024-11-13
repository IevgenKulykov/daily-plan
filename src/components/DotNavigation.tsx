import React, { useState, ReactNode } from "react";
import { useSwipeable } from "react-swipeable"; // import from react-swipeable

interface DotNavigationProps {
  children: ReactNode;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ children }) => {
  const contentArray = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleSwipe = (direction: string) => {
    if (direction === "Left" && activeIndex < contentArray.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (direction === "Right" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("Left"),
    onSwipedRight: () => handleSwipe("Right"),
  });

  return (
    <div
      {...swipeHandlers}
      style={{ position: "relative", paddingTop: "5px" }}
    >
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          top: "10px",
          left: "0",
          right: "0",
        }}
      >
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
