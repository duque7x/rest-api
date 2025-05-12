import { REST } from "../rest/REST";

interface GuildData {
    prefix: string;
    id: string;
    name: string;

    _id: string;
    pricesOn: number[];
    pricesAvailable: number[];
    state: {
        matcheStatus: string,
        rankStatus: string
    };
    seasonId: string;
    betsChannelId: string;
}

export class Guild {
    prefix: string;
    id: string;
    seasonId: string;
    betsChannelId: string;
    name: string;
    _id: string;
    pricesOn: number[];
    pricesAvailable: number[];
    state: {
        matcheStatus: string,
        rankStatus: string
    };
    #data: string;
    constructor(data: GuildData, rest: REST);

    get data(): GuildData;

     add<F extends keyof KeysAvailable, A = KeysAvailable[F]>(
        key: F,
        value: A
    ): Promise<A>;

     remove<F extends keyof KeysAvailable, A = KeysAvailable[F]>(
        key: F,
        value: A
    ): Promise<A>;

     set<F extends keyof KeysAvailable, A = KeysAvailable[F]>(
        key: F,
        value: A
    ): Promise<A>;
}
declare enum States {
    "ON" = "on",
    "OFF" = "on",
    "CREATED" = "created",
    "SHUTTED" = "shutted",
    "WAITING" = "waiting",
}
type KeysAvailable = {
    blacklist: string[];
    prefix: string;
    pricesOn: number;
    pricesAvailable: number;
    state: {
        state: {
            matchesStatus: States,
            rankStatus: States
        }
    };
    seasonId: string;
    betsChannelId: string;
};
