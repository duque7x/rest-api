import { BaseClass } from "./BaseClass";

/**
 * Represents a protection type with additional details.
 */
interface Protection {
  type: "point_protect" | "immunity" | "double_points"; // Type of protection
  longevity: number; // Duration for which the protection lasts
  addedBy: string; // User who added the protection
  when: Date; // When the protection was added
}

/**
 * Represents a channel associated with a player's original channels.
 */
interface OriginalChannel {
  channelId: string; // The ID of the channel
  matchId: string; // The ID of the match associated with the channel
}

/**
 * Interface representing a Player's stats and other information in the database.
 */
export class User extends BaseClass {
  /**
   * Player's information.
   */
  player: {
    name: string; // The player's name
    id: string; // The player's ID
  };

  /**
   * The number of points the player has.
   * Default: 0
   */
  points: number;

  /**
   * The number of wins the player has.
   * Default: 0
   */
  wins: number;

  /**
   * The number of MVPs the player has achieved.
   * Default: 0
   */
  mvps: number;

  /**
   * The number of losses the player has suffered.
   * Default: 0
   */
  losses: number;

  /**
   * Array of games played by the player.
   * Default: []
   */
  gamesPlayed: string[];

  /**
   * Indicates whether the player is blacklisted.
   * Default: false
   */
  blacklisted: boolean;

  /**
   * List of protections the player has.
   * Default: Contains a "point_protect" protection added by the specified user.
   */
  protections: Protection[];

  /**
   * List of channels that were originally associated with the player.
   * Default: Contains a channel and match ID pair.
   */
  originalChannels: OriginalChannel[];

  /**
   * Resets the given key on the database
   * @param key the user properties like: wins, losses, mvps
   */
  reset(key: string): Promise<this>;

  /**
   * Deletes the user's data, cannot be undone
   */
  delete(): Promise<void>;

  /**
   * Will increment given field
   * @param {UserNumericOrCarFields} field
   * @param amount
   */
  increment<F extends keyof UserNumericOrCarFields>(
    field: F,
    amount?: number
  ): Promise<this>;

  /**
   * Will decrement given field
   * @param {UserNumericOrCarFields} field
   * @param amount
   */
  decrement<F extends keyof UserNumericOrCarFields>(
    field: F,
    amount?: number
  ): Promise<this>;
}

type UserNumericOrCarFields = {
  wins: number;
  points: number;
  mvps: number;
  losses: number;
  gamesPlayed: string;
};
