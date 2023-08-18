import data from "../default_data.json";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";
import { getImgStyle } from "./style";

export default function Item(props) {
    const isActive = props.activeId === props.id;
    const isOver = props.overId === props.id;
    return (
        <Draggable id={props.id}>
            <Droppable
                id={props.id}
                style={{
                    alignContent: "flex-start",
                    display: "flex",
                    flexWrap: "wrap",
                    height: IMG_BLOCK_WITH_MARGIN_HEIGHT,
                }}
            >
                {props.activeId && isOver && !isActive && (
                    <img
                        src={data.items[props.activeId].src}
                        style={getImgStyle(true)}
                    />
                )}
                {(!isActive || isOver || !props.overId) && (
                    <img
                        src={data.items[props.id].src}
                        style={getImgStyle(isActive)}
                        title={!isActive ? data.items[props.id].name : null}
                    />
                )}
            </Droppable>
        </Draggable>
    );
}
