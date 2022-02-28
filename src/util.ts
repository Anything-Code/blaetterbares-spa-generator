import { Blätterkatalog } from './types';

export function randomInt(max: number, min: number = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s));

export async function usePromise<T>(promise: Promise<T>): Promise<Blätterkatalog.PromiseResult<T>> {
    try {
        const res = await promise;
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}
