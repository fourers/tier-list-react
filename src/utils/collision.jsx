import { closestCorners, rectIntersection } from "@dnd-kit/core";

export function customCollisionDetectionAlgorithm(props) {
    const rectIntersectionCollisions = rectIntersection(props);

    // Collision detection algorithms return an array of collisions
    const collisions =
        rectIntersectionCollisions.length > 0
            ? rectIntersectionCollisions
            : closestCorners(props);
    return collisions;
}
