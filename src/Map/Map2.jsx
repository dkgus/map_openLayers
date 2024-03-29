import React, { useState, useEffect } from "react";
import MapContext from "./MapContext";
import "ol/ol.css";
import { Map as OlMap, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Tile as TileLayer } from "ol/layer";
import { OSM, XYZ } from "ol/source";

const Map2 = ({ children }) => {
  const [mapObj, setMapObj] = useState({});
  const appKey = "E8667FA3-5192-3EB9-83B2-3C110D3BC70D";
  useEffect(() => {
    // Map 객체 생성 및 OSM 배경지도 추가
    const map = new OlMap({
      controls: defaultControls({ zoom: false, rotate: false }).extend([]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          name: "Base",
          visible: true,
          source: new XYZ({
            url: `http://api.vworld.kr/req/wmts/1.0.0/${appKey}/Base/{z}/{y}/{x}.png`,
            //url: `http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${appKey}&domain=http://localhost:3001/`,
          }),
        }),
      ],
      target: "map", // 하위 요소 중 id 가 map 인 element가 있어야함.
      view: new View({
        projection: getProjection("EPSG:3857"),
        center: fromLonLat(
          [127.9745613, 37.3236563],
          getProjection("EPSG:3857")
        ),
        zoom: 15,
      }),
    });

    setMapObj({ map });
    return () => map.setTarget(undefined);
  }, []);

  // MapContext.Provider 에 객체 저장
  return (
    <MapContext.Provider value={{ mapObj }}>{children}</MapContext.Provider>
  );
};

export default Map2;
