export namespace Blätterkatalog {
    export type Maybe<T> = T | null;
    export type PromiseResult<T> = [Maybe<T>, Maybe<unknown>];
    export interface Issue {
        id: string;
    }

    export interface Link {
        '@_href': string;
        '@_rel': string;
        '@_type': string;
    }

    export interface Entry {
        Issues: {
            '@_xmlns': string;
            Issue: Array<Issue> | Issue;
        };
        author: {
            name: string;
        };
        link: [Omit<Link, '@_type'>, Link];
        published: string;
        summary: string;
        title: string;
        updated: string;
    }

    export interface XMLBody {
        '?xml': string;
        feed: {
            entry: Array<Entry>;
        };
    }
}
