import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import body from "./body.png";
import "./styles.css";
import RichTooltip from "./RichTooltip";
import ColoredCircle from "./ColoredCircle";
import HealthDetail from "./HealthDetail";
import brain from "./brain.png";
import heart from "./heart.png";
import liver from "./liver.png";
import throat from "./throat.png";
import Data from "./data.json";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// BodyImage component
export default function BodyImage() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [showTooltip, setTooltipFlag] = useState(true);
  const [color, setColor] = useState("#d15555");
  const handleButtonClick = (e) => {
    setActiveButton(e.target);
  };

  // when the component renders
  return (
    <div>
      <img alt="Human Body" src={body} />
      {Data.map((element, index) => {
        return (
          <ColoredCircle
            top={element.button.top}
            left={element.button.left}
            onClick={(button) => {
              setSelectedElement(element);
              handleButtonClick(button);
            }}
            radius="50%"
            width="15px"
            height="15px"
            color={color}
          />
        );
      })}
      {selectedElement ? (
        <RichTooltip
          anchorEl={activeButton}
          open={showTooltip}
          onClose={() => {
            setSelectedElement(null);
          }}
          content={
            <HealthDetail
              onClick={() => setSelectedElement(null)}
              icon={require(selectedElement.icon)}
              title={selectedElement.title}
              content={
                <p>
                  Even brief exposure to air pollution can impair brain
                  function, and cause anxiety, depression, and impulsiveness
                  <br />
                  <br />
                  Higher pollution levels are linked to a 5% decrease on tests
                  of working memory in children
                  <br />
                  <br />
                  Risk of dementia increases the closer people live to major
                  roadways
                </p>
              }
            />
          }
          placement="right"
          bottom={selectedElement.bottom}
          right={selectedElement.right}
        ></RichTooltip>
      ) : null}
    </div>
  );
}

root.render(
  <StrictMode>
    <BodyImage />
  </StrictMode>
);
