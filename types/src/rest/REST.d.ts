import EventEmmiter from "node:events";
import { GuildsManager } from "../managers/GuildsManager";

export declare class REST extends EventEmmiter {
    request(method: string, path: string, body?: any): Promise<body>;
    init(): Promise<void>;
    guilds: GuildsManager;
}