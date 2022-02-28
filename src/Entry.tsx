import { Card, H3 } from '@blueprintjs/core';
import './App.css';
import { Blätterkatalog } from './types';

interface Props {
    entry?: Blätterkatalog.Entry;
    skeleton?: boolean;
    cardWidth: Blätterkatalog.Maybe<string>;
    cardHeight: string;
}

export default function Entry({ entry, skeleton, cardWidth, cardHeight }: Props) {
    return !skeleton && entry ? (
        <a
            style={{ width: cardWidth != null ? cardWidth : 'calc(25% - .5rem)' }}
            target="_blank"
            href={entry.link[0]['@_href']}
            className="card"
        >
            <Card style={{ padding: 0 }}>
                <img
                    style={{
                        height: cardHeight,
                    }}
                    src={entry.link[1]['@_href']}
                    alt="Featured image"
                />
                <H3>{entry.title}</H3>
            </Card>
        </a>
    ) : (
        <a
            style={{
                width: cardWidth != null ? cardWidth : 'calc(25% - .5rem)',
            }}
            className="card"
        >
            <Card style={{ padding: 0 }}>
                <div className="bp3-skeleton" style={{ height: cardHeight }} />
                <div className="heading">
                    <div className="h3 bp3-skeleton">123</div>
                </div>
            </Card>
        </a>
    );
}
