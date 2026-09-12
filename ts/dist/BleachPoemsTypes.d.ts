export interface Poem {
    id?: string;
    lines: any[];
    title: string;
    volume: number;
}
export interface PoemLoadMatch {
    id: number;
}
export interface PoemListMatch {
    id?: string;
    lines?: any[];
    title?: string;
    volume?: number;
}
