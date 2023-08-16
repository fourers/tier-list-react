import { useDroppable } from "@dnd-kit/core";
import data from "../default_data.json";
import { Draggable } from "./Draggable";
import { getImgStyle } from "./style";

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
                    />
                )}
                {(!isActive || isOver || !props.overId) && (
                    <img
                        src={data.items[props.id].src}
                        style={getImgStyle(isActive)}
                        title={!isActive ? data.items[props.id].name : null}
                    />
                )}
            </div>
        </Draggable>
    );
}
