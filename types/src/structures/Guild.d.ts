import { MatchesManager } from "../managers/MatchesManager";
import { UserManager } from "../managers/UserManager";
import { BetsManager } from "../managers/BetsManager";
import { BetUsersManager } from "../managers/BetUsersManager";
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
    state: { matcheStatus: string, rankStatus: string };

    users: UserManager;
    betUsers: BetUsersManager;
    bets: BetsManager;
    matches: MatchesManager;

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
export declare enum STATES {
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
