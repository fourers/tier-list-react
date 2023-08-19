import { closestCorners, rectIntersection } from "@dnd-kit/core";

export function customCollisionDetectionAlgorithm({
    droppableContainers,
    ...args
}) {
    const rectIntersectionCollisions = rectIntersection({
        ...args,
        droppableContainers: droppableContainers.filter(
            ({ id }) => id === "trash",
        ),
    });

    // Collision detection algorithms return an array of collisions
    if (rectIntersectionCollisions.length > 0) {
        return rectIntersectionCollisions;
    }

    // Compute other collisions
    return closestCorners({
        ...args,
        droppableContainers: droppableContainers.filter(
            ({ id }) => id !== "trash",
        ),
    });
}
