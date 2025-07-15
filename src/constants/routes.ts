export const Routes = {
    idle: "idle",
    game: "game",
    results: "results"
} as const;

export type Route = typeof Routes[keyof typeof Routes];