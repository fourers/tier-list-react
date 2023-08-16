import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN } from "./constants";
import data from "./default_data.json";

const getImgStyle = (isActive) => {
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

export default function Item(props) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    const isActive = props.activeId === props.id;
    const isOver = props.overId === props.id;
    return (
        <Draggable id={props.id}>
            <div
                ref={setNodeRef}
                style={{
                    alignContent: "flex-start",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {props.activeId && isOver && !isActive && (
                    <img
                        src={data.items[props.activeId].src}
                        style={getImgStyle(true)}
                        title={data.items[props.activeId].name}
                    />
                )}
                {(!isActive || isOver || !props.overId) && (
                    <img
                        src={data.items[props.id].src}
                        style={getImgStyle(isActive)}
                        title={data.items[props.id].name}
                    />
                )}
            </div>
        </Draggable>
    );
}
