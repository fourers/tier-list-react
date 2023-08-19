import { rectIntersection } from "@dnd-kit/core";

export function customCollisionDetectionAlgorithm(props) {
    const rectIntersectionCollisions = rectIntersection(props);

    const filteredCollisions = rectIntersectionCollisions.filter(
        (collision) => !collision.id.startsWith("row-"),
    );
    const sortedCollisions = filteredCollisions.length >= 2 ? filteredCollisions.sort((a, b) => {
        const aRect = a.data.droppableContainer.rect.current;
        const bRect = b.data.droppableContainer.rect.current;
        const aMax = Math.max(aRect.left, aRect.top);
        const bMax = Math.max(bRect.left, bRect.top);
        return aMax < bMax ? -1 : bMax < aMax ? 1 : 0;
    }) : rectIntersectionCollisions;
    return sortedCollisions;
}
