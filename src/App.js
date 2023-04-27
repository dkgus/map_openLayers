import { useContext } from "react";
import MapContext from "./Map/MapContext";
import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";

function App() {
  const { map } = useContext(MapContext);
  const satelliteMap = new TileLayer({
    name: "Satellite",
    visible: true,
    source: new XYZ({
      url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.VWORLD_API_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
    }),
  });

  // const handleZoomInClick = () => {
  //   map.getView().setZoom(map.getView().getZoom() + 1);
  // };

  const handleZoomInClick = () => {
    const zoom = map.getView().getZoom() + 1;
    map.getView().animate({
      zoom,
      duration: 500,
    });
  };

  const handleZoomOutClick = () => {
    map.getView().setZoom(map.getView().getZoom() - 1);
  };

  const handleSatelliteMapButton = () => {
    map.addLayer(satelliteMap);
    // or
    map.removeLayer(satelliteMap);
  };

  const center = fromLonLat([126.30574134206182, 33.35570244202401]);

  const handleHomeClick = () => {
    map.getView().setCenter(center);
  };
  return (
    <>
      <button onClick={handleZoomInClick}>zoomIn</button>
      <button onClick={handleZoomOutClick}>zoomOut</button>
      <button onClick={handleSatelliteMapButton}>위성</button>
      <button onClick={handleHomeClick}>홈</button>

      <div id="map" style={{ width: "100%", height: 400 }}></div>
      <div id="mouse-position"></div>
    </>
  );
}

export default App;
