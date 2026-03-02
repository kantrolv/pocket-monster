export const TILE_SIZE = 32;

export const TILE_TYPES = {
    0: { type: "grass", walkable: true, jumpRequired: false, damage: false },
    1: { type: "wall", walkable: false, jumpRequired: false, damage: false },
    2: { type: "tree", walkable: false, jumpRequired: false, damage: false },
    3: { type: "lava", walkable: false, jumpRequired: false, damage: true },
    4: { type: "gap", walkable: true, jumpRequired: true, damage: false }, // Requires jump
    5: { type: "mountain", walkable: false, jumpRequired: false, damage: false },
};

export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};
