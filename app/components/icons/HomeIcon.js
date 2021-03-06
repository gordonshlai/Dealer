import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 *
 * @param {string} color - the color of the icon
 * @param {number} size - the size of the icon
 */
function HomeIcon({ color, size }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.841"
      height="19.317"
      viewBox="0 0 24.841 19.317"
    >
      <Path
        id="Icon_awesome-home"
        data-name="Icon awesome-home"
        d="M12.09,7.265,4.139,13.813v7.068a.69.69,0,0,0,.69.69l4.832-.013a.69.69,0,0,0,.687-.69V16.741a.69.69,0,0,1,.69-.69H13.8a.69.69,0,0,1,.69.69v4.124a.69.69,0,0,0,.69.692l4.831.013a.69.69,0,0,0,.69-.69V13.808L12.75,7.265A.526.526,0,0,0,12.09,7.265Zm12.559,4.451L21.044,8.744V2.771a.517.517,0,0,0-.517-.517H18.111a.517.517,0,0,0-.517.517V5.9L13.733,2.726a2.07,2.07,0,0,0-2.631,0L.187,11.716a.517.517,0,0,0-.069.729l1.1,1.337a.517.517,0,0,0,.729.07L12.09,5.5a.526.526,0,0,1,.66,0l10.144,8.355a.517.517,0,0,0,.729-.069l1.1-1.337a.517.517,0,0,0-.073-.73Z"
        transform="translate(0.001 -2.254)"
        fill={color}
      />
    </Svg>
  );
}

export default HomeIcon;
