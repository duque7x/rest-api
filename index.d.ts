import { UsersRoutes } from "./types/src/managers/UserRoutes";
import { MatchesRoutes } from "./types/src/managers/MatchesRoutes";
import { GuildsRoutes } from "./types/src/managers/GuildRoutes";

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

declare module "RestAPI";

export * from "./types/src/managers/UserRoutes";
export * from "./types/src/managers/MatchesRoutes";
export * from "./types/src/structures/BaseClass";
export { User } from "./types/src/structures/User";
export { Guild } from "./types/src/structures/Guild";
export * from "./types/src/rest/REST";
export * from "./src/rest/Request";
