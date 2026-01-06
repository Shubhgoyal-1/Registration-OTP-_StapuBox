import Svg, { Path } from "react-native-svg";

export default function TriangleIcon({
    color = "#FFFFFF",
}: {
    color?: string;
}) {
    return (
        <Svg
            width={18}
            height={8}
            viewBox="0 0 18 8"
            fill="none"
        >
            <Path
                d="M0 0 H18 L9 8 Z"
                fill={color}
            />
        </Svg>
    );
}
