import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Mask
          id="c"
          width={28}
          height={28}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <Path fill="#fff" d="M28 0H0v28h28V0Z" />
        </Mask>
        <G mask="url(#c)">
          <Path
            fill={props.color}
            fillRule="evenodd"
            d="M5 14a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-11C7.925 3 3 7.925 3 14s4.925 11 11 11c6.076 0 11-4.925 11-11S20.076 3 14 3Zm3.639 16a1 1 0 0 0 1.36-1.36l-2.947-5.304a.995.995 0 0 0-.414-.402L10.36 9A1 1 0 0 0 9 10.361l2.947 5.304c.099.178.245.315.414.402l5.278 2.932ZM15.55 15.55l-1.108-1.993-.886.885 1.993 1.108Z"
            clipRule="evenodd"
          />
        </G>
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
