import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Image from "./Image";
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";

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
                    minHeight: IMG_BLOCK_WITH_MARGIN_HEIGHT,
                }}
            >
                {props.activeId && isOver && !isActive && (
                    <Image id={props.activeId} opaque />
                )}
                {(!isActive || (isActive && (isOver || !props.overId))) && (
                    <Image id={props.id} opaque={isActive} />
                )}
            </Droppable>
        </Draggable>
    );
}
