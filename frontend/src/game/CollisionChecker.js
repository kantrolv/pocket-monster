import { TILE_TYPES, MAP_COLS, MAP_ROWS } from './constants';

export const checkTileCollision = (x, y, mapData) => {
    // Basic boundaries check - keep them on the grid size roughly
    if (x < 0 || x >= MAP_COLS || y < 0 || y >= MAP_ROWS) {
        return { blocked: true, message: "End of the map." };
    }

    // Completely disable all tile physics and walkability blocking!
    // Just return walkable for everything so they can explore freely.
    return { blocked: false, info: { jumpRequired: false, type: "open" }, message: "" };
};
