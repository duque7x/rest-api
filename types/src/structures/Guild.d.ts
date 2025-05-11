import { REST } from "../rest/REST";

interface GuildData {
    prefix: string;
    id: string;
    name: string;
    #data: string;
    _id: string;
}

export class Guild {
    prefix: string;
    id: string;
    name: string;
    prices: number[];
    _id: string;
    constructor(data: GuildData, rest: REST): void;

    get data(): GuildData;

    async set<F extends keyof KeysAvailable, A = KeysAvailable[F]>(
        key: F,
        value: A
    ): Promise<A>;
}

type KeysAvailable = {
    blacklist: string[];
    prefix: string;
    prices: number[];
    state: {
        matcheStatus: string,
        rankStatus: string
    };
};
