import { Context } from './Context';
declare class BleachPoemsError extends Error {
    isBleachPoemsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BleachPoemsError };
