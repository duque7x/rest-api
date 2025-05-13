import { UsersRoutes } from "./types/src/managers/UserManager";
import { MatchesRoutes } from "./types/src/managers/MatchesManager";
import { GuildsRoutes } from "./types/src/managers/GuildManager";
import EventEmitter from "node:events";
import { BetsManager } from "./types/src/managers/BetsManager";

declare interface ApiOptions {
    // The base URL that will be used to make API requests
    baseURL?: string;

    // The authentication token to verify your user
    token: string;
}

// Exporting API and REST as named exports
export class RestAPI extends EventEmitter {
    constructor(options: ApiOptions);

    // Convenience access to routes
    get matches(): MatchesRoutes;
    get users(): UsersRoutes;
    get guilds(): GuildsRoutes;
    get bets(): BetsManager;
    /**
    * Initialises the classes inner processes such as: cache and fetches
    */
    init(): Promise<RestAPI>;
}

declare module "RestAPI";

export * from "./types/src/managers/UserManager";
export * from "./types/src/managers/MatchesManager";
export * from "./types/src/managers/BetsManager";

export { User } from "./types/src/structures/User";
export { Guild } from "./types/src/structures/Guild";
export { Match } from "./types/src/structures/Match";
export { Bet } from "./types/src/structures/Bet";
export * from "./types/src/rest/REST";
//export * from "./src/rest/Request";


export * from "./types/src/payloads/BetCreatePayload";
export * from "./types/src/payloads/CreateGuildPayload";
export * from "./types/src/payloads/MatchCreatePayload";
export * from "./types/src/payloads/UserCreatePayload";