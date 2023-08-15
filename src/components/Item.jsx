import { Draggable } from "./Draggable";
import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN } from "./constants";
import data from "./default_data.json";

export default function Item(props) {
    const itemSrc = data.items[props.id].src;
    const tooltip = data.items[props.id].name;
    return (
        <Draggable id={props.id}>
            <img
                src={itemSrc}
                style={{
                    display: "block",
                    height: IMG_BLOCK_HEIGHT,
                    margin: IMG_BLOCK_MARGIN,
                    userSelect: "none",
                }}
                title={tooltip}
            />
        </Draggable>
    );
}
