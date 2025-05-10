import { UsersRoutes } from "./types/structure/defaults/UserRoutes";
import { MatchesRoutes } from "./types/structure/defaults/MatchesRoutes";
import { GuildsRoutes } from "./types/structure/defaults/GuildRoutes";

declare interface ApiOptions {
  // The base URL that will be used to make API requests
  baseURL?: string;

  // The authentication token to verify your user
  token: string;
}

// Exporting API and REST as named exports
export class RestAPI {
  constructor(options: ApiOptions);

  // Convenience access to routes
  get matches(): MatchesRoutes;
  get users(): UsersRoutes;
  get guilds(): GuildsRoutes;
  /**
  * Initialises the classes inner processes such as: cache and fetches
  */
  init(): Promise<RestAPI>;
}

export class REST {
  request(method: string, path: string, body?: any): Promise<any>;
}

export * from "./types/structure/defaults/UserRoutes";
export * from "./types/structure/defaults/MatchesRoutes";
export * from "./types/structure/defaults/BaseClass";
export * from "./types/structure/defaults/User";
export * from "./types/structure/defaults/REST";
export * from "./types/structure/defaults/Request";
