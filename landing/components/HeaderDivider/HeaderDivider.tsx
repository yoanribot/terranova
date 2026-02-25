const HeaderDivider = ({
  colorStart,
  colorEnd,
}: {
  colorStart?: string;
  colorEnd?: string;
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1280 140"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full absolute bottom-0 h-15 sm:h-30"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
      </defs>

      <g fill="url(#waveGradient)" transform="scale(-1,1) translate(-1280,0)">
        <path d="M320 28c320 0 320 84 640 84 160 0 240-21 320-42v70H0V70c80-21 160-42 320-42z" />
      </g>
    </svg>
  );
};

export default HeaderDivider;
