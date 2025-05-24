declare module "REST";

export * from "./types/src/managers/UserManager";
export * from "./types/src/managers/MatchesManager";
export * from "./types/src/managers/BetsManager";
export * from "./types/src/managers/BetUsersManager";

export { User } from "./types/src/structures/User";
export { BetUser } from "./types/src/structures/BetUser";
export { Guild } from "./types/src/structures/Guild";
export { Match } from "./types/src/structures/Match";
export { Bet } from "./types/src/structures/Bet";
export * from "./types/src/rest/REST";

export * from "./types/src/payloads/BetCreatePayload";
export * from "./types/src/payloads/CreateGuildPayload";
export * from "./types/src/payloads/MatchCreatePayload";
export * from "./types/src/payloads/UserCreatePayload";


