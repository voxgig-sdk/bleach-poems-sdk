import { PoemEntity } from './entity/PoemEntity';
export type * from './BleachPoemsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BleachPoemsEntityBase } from './BleachPoemsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class BleachPoemsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Poem(entopts?: Record<string, any>): PoemEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BleachPoemsSDK;
    tester(testopts?: any, sdkopts?: any): BleachPoemsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BleachPoemsSDK;
export { stdutil, config, BaseFeature, BleachPoemsEntityBase, BleachPoemsSDK, SDK, };
export type { DirectResult };
