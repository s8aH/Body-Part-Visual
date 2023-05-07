import React, { Fragment, useState } from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
  top: number;
  left: number;
}

const ColoredCircle: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  top,
  left
}: Props) => {
  const [active, setActive] = useState(false);

  const changeColor = () => {
    setActive(!active);
  };
  //let btn_class = this.state.active ? "blackButton" : "whiteButton";
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
        position: "absolute",
        top: top + "px",
        left: left + "px"
        //backgroundColor: `${active ? "white" : "#d15555"}`
      }}
    >
      {children}
    </button>
  );
};

export default ColoredCircle;
