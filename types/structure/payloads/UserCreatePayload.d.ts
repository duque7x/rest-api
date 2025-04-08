// Interface of Player
declare interface Player {
    // User's name
    name?: string,
    // User's id
    id: string
}
/**
 * UserCreatePayload
 */
export interface UserCreatePayload {
    player: Player,
}
