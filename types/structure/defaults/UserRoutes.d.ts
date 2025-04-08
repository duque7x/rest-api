import { REST } from "../../..";
import { User } from "./User";
import { UserCreatePayload } from "../payloads/UserCreatePayload";

/**
 * Routes handler for user-related API operations.
 */
export declare class UsersRoutes {
  /**
   * REST client used to make HTTP requests.
   */
  rest: REST;

  /**
   * Creates a new UsersRoutes instance.
   * @param rest - An instance of the REST client.
   */
  constructor(rest: REST);

  /**
   * Fetches a user by its ID.
   * @param id - The unique ID of the user.
   * @returns A promise resolving to the user data.
   */
  get(id: string): Promise<User>;

  /**
   * Creates a new user.
   * @param payload - The payload to create the user with.
   * @returns A promise resolving to the created user data.
   */
  create(payload: UserCreatePayload): Promise<User>;

  /**
   * 
   * @param id The unique ID of the user.
   */
  deleteUser(id: string): Promise<void>
}
