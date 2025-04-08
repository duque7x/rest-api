/**
 * Enum representing the possible types of matches based on team sizes.
 */
declare enum MatchTypesEnum {
    "1x1" = "1x1",
    "2x2" = "2x2",
    "3x3" = "3x3",
    "4x4" = "4x4",
    "5x5" = "5x5",
    "6x6" = "6x6"
}

/**
 * Enum representing the different status values a match can have.
 */
declare enum MatchStatusTypesEnum {
    ON = "ON",           // Match is active
    OFF = "OFF",         // Match is inactive
    CREATED = "CREATED", // Match was created but not started
    SHUTTED = "SHUTTED"  // Match was forcefully closed
}

/**
 * Interface representing a single player.
 */
declare interface MatchPlayer {
    /** The unique Discord user ID of the player */
    id: string;

    /** The display name of the player */
    name: string;
}

/**
 * Type alias for an array of match players.
 */
declare type MatchPlayers = MatchPlayer[];

/**
 * Interface for confirmed players including the type of confirmation.
 */
declare interface ConfirmedPlayer {
    /** The unique Discord user ID of the player */
    id: string;

    /** The name of the player */
    name: string;

    /** Type of confirmation, e.g., "manual", "auto", etc. */
    typeConfirm: string;
}

/**
 * Interface representing a channel (text or voice).
 */
declare interface ChannelInfo {
    /** The channel ID */
    id: string;

    /** The name of the channel */
    name: string;
}

/**
 * Interface representing a full match object.
 */
export declare interface Match {
    /** Unique ID for the match (MongoDB ObjectId as string) */
    _id: string;

    /** All players involved in the match */
    players: MatchPlayers;

    /** Timestamp of when the match was created */
    createdAt: Date;

    /** The main text channel associated with this match */
    matchChannel: ChannelInfo;

    /** Array of associated voice channels */
    voiceChannels: ChannelInfo[];

    /** Type of the match (e.g., 1x1, 2x2...) */
    matchType: MatchTypesEnum;

    /** Current status of the match */
    status: MatchStatusTypesEnum;

    /** Players who won the match */
    winnerTeam: MatchPlayers;

    /** Maximum number of players allowed in the match */
    maximumSize: number;

    /** Discord ID of the match creator */
    creatorId: string;

    /** Team A players */
    teamA: MatchPlayers;

    /** Team B players */
    teamB: MatchPlayers;

    /** Players who lost the match */
    losers: MatchPlayers;

    /** Team leaders or captains */
    leaders: MatchPlayers;

    /** The player who created the match room */
    roomCreator: MatchPlayer;

    /** List of players who confirmed participation, with confirmation type */
    confirmed: ConfirmedPlayer[];

    /** Players marked as MVP (Most Valuable Player) */
    mvp: MatchPlayer;
}
