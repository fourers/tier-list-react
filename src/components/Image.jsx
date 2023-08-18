import data from "../default_data.json";
import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN } from "./constants";

const getImgStyle = (isSolid) => {
    const defaultStyle = {
        display: "block",
        height: IMG_BLOCK_HEIGHT,
        marginBottom: IMG_BLOCK_MARGIN,
        marginLeft: IMG_BLOCK_MARGIN,
        marginRight: IMG_BLOCK_MARGIN,
        marginTop: IMG_BLOCK_MARGIN,
        userSelect: "none",
    };
    return isSolid ? defaultStyle : { ...defaultStyle, opacity: 0.5 };
};

export default function Image(props) {
    const style = props.style ? props.style : {};
    return (
        <img
            src={data.items[props.id].src}
            style={{
                ...getImgStyle(!!props.solid),
                ...style,
            }}
            title={props.title}
        />
    );
}
