import { Card, H3 } from '@blueprintjs/core';
import { Blätterkatalog } from './types';
import './Entry.scss';

interface Props {
    entry?: Blätterkatalog.Entry;
    skeleton?: boolean;
}

export default function Entry({ entry, skeleton }: Props) {
    return !skeleton && entry ? (
        <a target="_blank" href={entry.link[0]['@_href']} className="entry">
            <Card style={{ padding: 0 }}>
                <img src={entry.link[1]['@_href']} alt="Featured image" />
                <H3 className="truncate" style={{ margin: 0 }}>
                    {entry.title}
                </H3>
            </Card>
        </a>
    ) : (
        <a className="entry">
            <Card style={{ padding: 0 }}>
                <div className="image bp3-skeleton" />
                <div className="heading">
                    <div className="h3 bp3-skeleton">&#8203;</div>
                </div>
            </Card>
        </a>
    );
}
