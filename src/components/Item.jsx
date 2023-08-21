import { useSelector } from "react-redux";
import data from "../default_data.json";
import { getNextId } from "../utils/tierState";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Image from "./Image";
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";

export default function Item(props) {
    const tierState = useSelector((state) => state.tiers.value);

    const isActive = props.activeId === props.id;
    const isOver = props.overId === props.id;

    const showPreview = props.activeId && isOver && !isActive;
    const showOriginal = !isActive || (isActive && (isOver || !props.overId));
    return (
        <>
            {showPreview && (
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
            {showOriginal && (
                <Draggable id={props.id}>
                    <Droppable
                        id={
                            showPreview
                                ? getNextId(props.id, tierState)
                                : props.id
                        }
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
