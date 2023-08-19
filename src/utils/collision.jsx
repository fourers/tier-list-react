import { closestCorners, rectIntersection } from "@dnd-kit/core";

export function customCollisionDetectionAlgorithm(props) {
    const rectIntersectionCollisions = rectIntersection(props);

    // Collision detection algorithms return an array of collisions
    let collisions =
        rectIntersectionCollisions.length > 0
            ? rectIntersectionCollisions
            : closestCorners(props);

    const filteredCollisions = collisions.filter(
        (collision) => !collision.id.startsWith("row-"),
    );
    if (filteredCollisions.length >= 2) {
        collisions = filteredCollisions.sort((a, b) => {
            const aRect = a.data.droppableContainer.rect.current;
            const bRect = b.data.droppableContainer.rect.current;
            const aMax = Math.max(aRect.left, aRect.top);
            const bMax = Math.max(bRect.left, bRect.top);
            return aMax < bMax ? -1 : bMax < aMax ? 1 : 0;
        });
    }
    return collisions;
}
