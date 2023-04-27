import MapContext from "./MapContext";
import { Map as OlMap, View } from "ol";
import React, { useEffect, useState } from "react";

import { defaults, ScaleLine } from "ol/control";
import { fromLonLat, get } from "ol/proj";
import { Tile } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import { MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";

// +++
import "ol/ol.css";

const Map = ({ children }) => {
  const [mapObj, setMapObj] = useState({});

  useEffect(() => {
    let mousePositionCtrl = new MousePosition({
      coordinateFormat: createStringXY(4), // / 4: 좌표 소숫점 이하 자리수
      projection: "EPSG:4326", // 좌표계 변환
      className: "mouse-position", // style 적용할 className 설정
      target: "mouse-position", //  element id 값
      undefinedHTML: "lon, lat", // 마우스 위치 값 없을 때 초기 값
    });

    const map = new OlMap({
      controls: defaults({ zoom: false, rotate: false }).extend([
        mousePositionCtrl,
      ]),
      layers: [
        new Tile({
          source: new OSM(),
        }),
        new Tile({
          name: "Base",
          visible: true,
          source: new XYZ({
            url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`,
            //url: ` http://map.vworld.kr/js/webglMapInit.js.do?version=2.0&apiKey=[인증키]&domain=[인증받은도메인]`,
          }),
        }),
      ],
      target: "map",
      view: new View({
        // ⑧
        projection: get("EPSG:3857"), // ⑨
        center: fromLonLat(
          [126.30574134206182, 33.35570244202401],
          get("EPSG:3857")
        ), // ⑩
        zoom: 14, // ⑪
      }),
    });
    map.addControl(new ScaleLine());
    setMapObj({ map });

    return () => map.setTarget(undefined);
  }, []);

  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>;
};

export default Map;
