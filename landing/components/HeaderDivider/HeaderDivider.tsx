const HeaderDivider = ({ color }: { color?: string }) => {
  return (
    <svg
      width="100%"
      height="80px"
      viewBox="0 0 1280 140"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full absolute bottom-0 h-15 sm:h-30"
    >
      <g fill={color || "white"}>
        <path d="M320 28c320 0 320 84 640 84 160 0 240-21 320-42v70H0V70c80-21 160-42 320-42z" />
      </g>
    </svg>
  );
};

export default HeaderDivider;
