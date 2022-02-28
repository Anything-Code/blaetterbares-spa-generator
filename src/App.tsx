import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, H3 } from '@blueprintjs/core';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { Blätterkatalog } from './types';
import { sleep, usePromise } from './util';
import { useWindowSize } from './hooks/useWindowSize';
import { Range } from 'immutable';
import './App.css';

export default function App() {
    const windowSize = useWindowSize();
    const container = useRef(null);
    const containerWidth = useMemo(() => {
        if (container.current != null) {
            // @ts-ignore
            return container.current.getBoundingClientRect().width;
        }
    }, [windowSize]);
    const firstEntryWidth = useMemo(() => {
        const firstCard = document.querySelector('.card');
        if (firstCard != null) {
            const width = firstCard.getBoundingClientRect().width;
            return `calc(${width}px * 1.3)`;
        }
        return 'calc(300px * 1.3)';
    }, [windowSize]);
    const cardWidth = useMemo(() => {
        if (containerWidth == null) {
            return null;
        }
        if (containerWidth < 1200) {
            if (containerWidth < 920) {
                if (containerWidth < 640) {
                    if (containerWidth < 480) {
                        return 'calc(100% - 1rem)';
                    }
                    return 'calc(50% - 1rem)';
                }
                return 'calc(33.3% - 1rem)';
            }
            return 'calc(25% - 1rem)';
        }
        return 'calc(20% - 1rem)';
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

        const data: Blätterkatalog.XMLBody = new XMLParser({ ignoreAttributes: false }).parse(res.data);

        return data.feed.entry;
    }, []);
    useEffect(() => {
        (async () => {
            await sleep(1);
            window.dispatchEvent(new Event('resize'));
            const data = await fetchXmlData(
                'https://rnz-publish.blaetterkatalog.de/frontend/supplementcatalogfeed.do?grp=1536&imgType=normal'
            );
            setData(data);
        })();
    }, []);

    return (
        <Fragment>
            <div ref={container} className="container">
                {data != null
                    ? data.map((item: Blätterkatalog.Entry, key: number) => (
                          <a
                              style={{ width: cardWidth != null ? cardWidth : 'calc(25% - .5rem)' }}
                              target="_blank"
                              href={item.link[0]['@_href']}
                              key={key}
                              className="card"
                          >
                              <Card style={{ padding: 0 }}>
                                  <img
                                      style={{
                                          height: firstEntryWidth,
                                      }}
                                      src={item.link[1]['@_href']}
                                      alt="Featured image"
                                  />
                                  <H3>{item.title}</H3>
                              </Card>
                          </a>
                      ))
                    : Range(0, 16).map((item: number, key: number) => (
                          <a
                              style={{
                                  width: cardWidth != null ? cardWidth : 'calc(25% - .5rem)',
                              }}
                              target="_blank"
                              key={key}
                              className="card"
                          >
                              <Card style={{ padding: 0 }}>
                                  <div className="bp3-skeleton" style={{ height: firstEntryWidth }} />
                                  <div className="heading">
                                      <div className="h3 bp3-skeleton">123</div>
                                  </div>
                              </Card>
                          </a>
                      ))}
            </div>
        </Fragment>
    );
}
