import axios from 'axios';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { Blätterkatalog } from './types';
import { sleep, usePromise } from './util';
import { useWindowSize } from './hooks/useWindowSize';
import { Range } from 'immutable';
import Entry from './Entry';
import './App.scss';

const apiUrl =
    process.env.REACT_APP_BLAETTERBARES_API_URL ||
    'https://rnz-publish.blaetterkatalog.de/frontend/supplementcatalogfeed.do?grp=1536&imgType=normal';

export default function App() {
    const windowSize = useWindowSize();
    const container = useRef(null);
    const containerWidth = useMemo(() => {
        if (container.current != null) {
            // @ts-ignore
            return container.current.getBoundingClientRect().width;
        }
    }, [windowSize]);
    const containerClass = useMemo(() => {
        if (containerWidth == null) {
            return 'container';
        }
        if (containerWidth < 1200) {
            if (containerWidth < 920) {
                if (containerWidth < 640) {
                    if (containerWidth < 480) {
                        return 'container xs';
                    }
                    return 'container s';
                }
                return 'container m';
            }
            return 'container l';
        }
        return 'container xl';
    }, [containerWidth]);
    const [data, setData] = useState<Blätterkatalog.Maybe<Array<Blätterkatalog.Entry>>>(null);
    const fetchXmlData = useCallback(async (url: string) => {
        const [res, fetchErr] = await usePromise(
            axios.get(url, {
                withCredentials: false,
            })
        );
        if (res == null) {
            return null;
        }

        const xmlValid = XMLValidator.validate(res.data);
        if (xmlValid !== true) {
            throw xmlValid.err;
        }
        const data: Blätterkatalog.XMLBody = new XMLParser({ ignoreAttributes: false }).parse(res.data);
        return data.feed.entry;
    }, []);
    useEffect(() => {
        (async () => {
            await sleep(1);
            window.dispatchEvent(new Event('resize'));
            const data = await fetchXmlData(apiUrl);
            setData(data);
        })();
    }, []);

    return (
        <Fragment>
            <div ref={container} className={containerClass}>
                {data != null
                    ? data.map((item: Blätterkatalog.Entry, key: number) => <Entry key={key} entry={item} />)
                    : Range(0, 16).map((item: number, key: number) => <Entry key={key} skeleton />)}
            </div>
        </Fragment>
    );
}
