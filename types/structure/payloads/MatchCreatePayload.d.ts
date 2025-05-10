export enum MatchTypes {
    1 = "1v1",
    2 = "2v2",
    3 = "3v3",
    4 = "4v4",
    5 = "5v5",
    6 = "6v6",
}

export interface MatchCreatePayload {
    type: MatchTypes;
    creatorId: string;
    maximumSize: number;
}
