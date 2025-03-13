type IconProps = {
  color?: string;
};

export function ArrowUpIcon({ color }: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 7.5L9 2.25M9 2.25L14.25 7.5M9 2.25L9 15.75"
        stroke={color || "white"}
      />
    </svg>
  );
}
