import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M18.414 6H24a3 3 0 0 1 3 3v5.586c0 2.673-3.231 4.011-5.121 2.121l-.318-.318-3.379 3.379a4.5 4.5 0 0 1-6.364 0L10.5 18.45l-3.525 3.525L5.56 20.56l4.939-4.94 2.732 2.733a2.5 2.5 0 0 0 3.536 0l4.793-4.793 1.732 1.732c.63.63 1.707.184 1.707-.707V9a1 1 0 0 0-1-1h-5.586c-.89 0-1.337 1.077-.707 1.707l1.732 1.732L15 15.88l-2.732-2.733a2.5 2.5 0 0 0-3.536 0L3.44 18.44a1.5 1.5 0 0 0 2.122 2.122l1.414 1.414a3.5 3.5 0 0 1-4.95-4.95l5.293-5.293a4.5 4.5 0 0 1 6.364 0L15 13.05l1.61-1.61-.317-.319C14.403 9.231 15.742 6 18.414 6Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;