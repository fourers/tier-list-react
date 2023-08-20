import data from "../default_data.json";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Image from "./Image";
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";

export default function Item(props) {
    const isActive = props.activeId === props.id;
    const isOver = props.overId === props.id;
    return (
        <>
            {props.activeId && isOver && !isActive && (
                <Droppable
                    id={`prev-${props.id}`}
                    style={{
                        alignContent: "flex-start",
                        display: "flex",
                        flexWrap: "wrap",
                        minHeight: IMG_BLOCK_WITH_MARGIN_HEIGHT,
                    }}
                >
                    <Image id={props.activeId} opaque />
                </Droppable>
            )}
            {(!isActive || (isActive && (isOver || !props.overId))) && (
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
                        <Image
                            id={props.id}
                            opaque={isActive}
                            title={data.items[props.id].name}
                        />
                    </Droppable>
                </Draggable>
            )}
        </>
    );
}
