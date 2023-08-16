import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN } from "./constants";

export const getImgStyle = (isActive) => {
    const defaultStyle = {
        display: "block",
        height: IMG_BLOCK_HEIGHT,
        marginBottom: IMG_BLOCK_MARGIN,
        marginLeft: IMG_BLOCK_MARGIN,
        marginRight: IMG_BLOCK_MARGIN,
        marginTop: IMG_BLOCK_MARGIN,
        userSelect: "none",
    };
    if (isActive) {
        return {
            ...defaultStyle,
            opacity: 0.5,
        };
    }
    return defaultStyle;
};
