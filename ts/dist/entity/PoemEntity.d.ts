import { BleachPoemsEntityBase } from '../BleachPoemsEntityBase';
import type { BleachPoemsSDK } from '../BleachPoemsSDK';
import type { Control } from '../types';
import type { Poem, PoemLoadMatch, PoemListMatch } from '../BleachPoemsTypes';
declare class PoemEntity extends BleachPoemsEntityBase<Poem> {
    constructor(client: BleachPoemsSDK, entopts: any);
    make(this: PoemEntity): PoemEntity;
    load(this: any, reqmatch?: PoemLoadMatch, ctrl?: Control): Promise<PoemEntity>;
    list(this: any, reqmatch?: PoemListMatch, ctrl?: Control): Promise<PoemEntity[]>;
}
export { PoemEntity };
