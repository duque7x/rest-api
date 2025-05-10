import { CreateGuildPayload } from "../payloads/CreateGuildPayload";
import { REST } from "../rest/REST";
import { Collection } from "./Collection";
import { Guild } from "./Guild";

export class GuildsRoutes {
    constructor(rest: REST): void;

    async get(id: string): Promise<Guild>;

    async create(payload: CreateGuildPayload): Promise<Guild>;

    get cache(): Collection<string, Guild>;

    async cacheGuilds(): Promise<Collection<string, Guild>>;
}