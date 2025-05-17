import { REST } from "../rest/REST";
import { MatchPlayer } from "./Match";

type BetData = {
    players: MatchPlayer[];
    price: string;
    payedBy: string;
    createdAt: string;
    type: string;
    status: string;
    winners: string;
    maximumSize: string;
    creatorId: string;
    adminId: string;

    confirmed: {
        type: string;
        id: string;
    };

    textChannel: {
        id: string;
    };
    waintingChannel: {
        id: string;
    };

    channels: {
        id: string;
        type: string;
    }
}

export declare class Bet {
    constructor(data: BetData, rest: REST);

    confirmed: [{
        ids: string[];
        typeConfirm: string;
        confirmedCount: number;
    }];

    players: MatchPlayer[];
    price: string;
    payedBy: string;
    createdAt: string;
    textChannel: string;
    waintingChannel: string;
    type: string;
    status: string;
    winners: string;
    maximumSize: string;
    teamA: string;
    teamB: string;
    creatorId: string;
    adminId: string;
    _id: string;

    get data(): BetData;

    delete(): Promise<void>;

    add<F extends keyof BetData, V = BetData[F]>(field: F, value: V): Promise<V>;

    remove<F extends keyof BetData, V = BetData[F]>(field: F, value: V): Promise<V>;

    set<F extends keyof BetData, V = BetData[F]>(key: F, value: V): Promise<V>;

    addPlayer(player: MatchPlayer): Promise<MatchPlayer[]>;
    removePlayer(player: MatchPlayer): Promise<MatchPlayer[]>;
}

