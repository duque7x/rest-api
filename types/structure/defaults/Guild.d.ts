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
    _id: string;
    constructor(data: GuildData, rest: REST): void;

    get data(): GuildData;

    async setPrefix(prefix: string): Promise<string>;
}