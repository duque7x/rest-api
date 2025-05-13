import { REST } from "./REST";
import { Bet } from "../structures/Bet";
import { Collection } from "../structures/Collection";
import { BetCreatePayload } from "../payloads/BetCreatePayload";

/**
 * Routes handler for bet-related API operations.
 */
export class BetsManager {
  /**
   * REST client used to make HTTP requests.
   */
  rest: REST;

  /**
   * Creates a new BetsManager instance.
   * @param rest - An instance of the REST client.
   */
  constructor(rest: REST);

  /**
   * @returns Collection of bets
   */
  get cache(): Collection<string, Bet>;

  /**
   * Fetches a bet by its ID.
   * @param id - The unique ID of the bet.
   * @returns A promise resolving to the bet data.
   */
  fetch(id: string): Promise<Bet>;

  /**
   * Creates a new bet.
   * @param payload - The payload to create the bet with.
   * @returns A promise resolving to the created bet data.
   */
  create(payload: BetCreatePayload): Promise<Bet>;

  delete(id: string): Promise<void>;
  
  deleteAll(): Promise<void>;
}
