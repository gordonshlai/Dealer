import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 *
 * @param {string} color - the color of the icon
 * @param {number} size - the size of the icon
 */
function CarIcon({ color, size }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? (size * 23.988) / 19.19 : "23.988"}
      height={size ? size : "19.19"}
      viewBox="0 0 23.988 19.19"
    >
      <Path
        id="Icon_awesome-car-alt"
        data-name="Icon awesome-car-alt"
        d="M21.922,11.913l-.562-1.4-1-2.49a5.57,5.57,0,0,0-5.2-3.518H8.82a5.57,5.57,0,0,0-5.2,3.518l-1,2.49-.562,1.4A3.191,3.191,0,0,0,0,14.895v2.4a3.172,3.172,0,0,0,.8,2.1v2.7a1.6,1.6,0,0,0,1.6,1.6H4a1.6,1.6,0,0,0,1.6-1.6v-1.6H18.39v1.6a1.6,1.6,0,0,0,1.6,1.6h1.6a1.6,1.6,0,0,0,1.6-1.6v-2.7a3.17,3.17,0,0,0,.8-2.1v-2.4A3.191,3.191,0,0,0,21.922,11.913ZM6.593,9.206A2.4,2.4,0,0,1,8.82,7.7h6.347a2.4,2.4,0,0,1,2.227,1.508l1,2.49H5.6l1-2.49ZM4,17.283a1.508,1.508,0,0,1-1.6-1.594A1.508,1.508,0,0,1,4,14.1a3.077,3.077,0,0,1,2.4,2.391C6.4,17.443,4.957,17.283,4,17.283Zm15.992,0c-.96,0-2.4.159-2.4-.8a3.077,3.077,0,0,1,2.4-2.391,1.508,1.508,0,0,1,1.6,1.594,1.508,1.508,0,0,1-1.6,1.594Z"
        transform="translate(0 -4.5)"
        fill={color}
      />
    </Svg>
  );
}

export default CarIcon;
