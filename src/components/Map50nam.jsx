import React, {
  useState,
  useRef,
  useCallback,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import { ImageOverlay, useMapEvent } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  LayerGroup,
  Tooltip,
  LayersControl,
  useMapEvents,
  TileLayer,
  Rectangle,
  ZoomControl,
  ScaleControl,
  SVGOverlay,
} from "react-leaflet";

import L from "leaflet";
// import './leaflet.css';
import "leaflet/dist/leaflet.css";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import "./style.css";
import ussh from "./asset/Picture2.svg";
import doan from "./asset/DTN.svg";
import location from "./asset/fire-flame.gif";
import flag from "./asset/flag.gif";
import ddl1 from "./asset/ddl1.png";
import ddl2 from "./asset/ddl2.png";
import arrow from "./asset/red-arrow.gif";
import video1 from "./asset/video/video1.mp4";
import video2 from "./asset/video/video2.mp4";
import video3 from "./asset/video/video3.mp4";
import video4 from "./asset/video/video4.mp4";
import { BasemapLayer } from "react-esri-leaflet";
import {
  data1,
  data2,
  dinh1,
  dinh2,
  dinh3,
  arrow1,
  arrow2,
  data3,
  islands,
} from "./data/data";

export const Map50nam = () => {
  const [zoom, setZoom] = useState(calculateZoom());
  const [map, setMap] = useState(null);
  function calculateZoom() {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
      return 10;
    } else if (screenWidth < 1537) {
      return 10;
    } else {
      return 11;
    }
  }

  const center = [10.777278, 106.695389];

  const [zoomLevel, setZoomLevel] = useState(calculateZoom()); // initial zoom level provided for MapContainer

  function Legend({ map, pos, text }) {
    useEffect(() => {
      if (map) {
        const legend = L.control({ position: pos });

        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info2 legend2");
          div.innerHTML = text;
          return div;
        };

        legend.addTo(map);

        // Cleanup function to remove the control when component unmounts
        return () => {
          legend.remove();
        };
      }
    }, [map, pos, text]); // Only run the effect when the relevant props change
  }

  const checkAllRef = useRef(null);
  function Legend({ map, pos, text }) {
    useEffect(() => {
      if (map) {
        const legend = L.control({ position: pos });

        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info2 legend2");
          div.innerHTML = text;
          return div;
        };

        legend.addTo(map);

        // Cleanup function to remove the control when component unmounts
        return () => {
          legend.remove();
        };
      }
    }, [map, pos, text]); // Only run the effect when the relevant props change
  }

  function add_data_point(data) {
    return (
      <Fragment>
        {data?.map((item, index) => {
          return (
            <Marker
              key={item.id}
              position={[item.lat, item.long]}
              eventHandlers={{
                click: () => {
                  map.flyTo(
                    [item.lat, item.long],
                    item.icon === "dinh"
                      ? map.getZoom() === calculateZoom()
                        ? map.getZoom() + 2
                        : map.getZoom() + 2
                      : map.getZoom() === calculateZoom()
                      ? map.getZoom()
                      : map.getZoom(),
                    {
                      duration: 0.9,
                    }
                  );
                },
                zoomlevelschange: () => {
                  console.log("Zoom level changed");
                },
              }}
              icon={L.divIcon({
                className: "my-div-icon",
                html:
                  item.icon === "dinh"
                    ? `
                    <img src='${
                      item.dot === 1 ? ddl1 : ddl2
                    }' className="icon-image" style="height: ${
                        item.dot < 3
                          ? window.innerWidth < 1000
                            ? 230
                            : 240
                          : window.innerWidth < 1000
                          ? 140
                          : 150
                      }%"/>`
                    : item.icon === "flag"
                    ? `
                    <img src='${flag}' className="icon-image" style="height: ${
                        item.dot === 3
                          ? window.innerWidth < 1000
                            ? 55
                            : 85
                          : window.innerWidth < 1000
                          ? 45
                          : 55
                      }%"/>`
                    : `
                    
                    <img src='${location}' className="icon-image" style="height: ${
                        window.innerWidth < 1000 ? 80 : 90
                      }%"/>`,
                iconSize: [20, 21],
              })}
            >
              <Popup closeButton={true} autoPan={false}>
                <div className="img_text">
                  <p id="text_nam">
                    <strong>{item.arrow}</strong>
                    <strong style={{ textTransform: "uppercase" }}>
                      {item.icon === "dinh" ? null : <br />} {item.place}
                    </strong>
                  </p>
                  {item.video === "" ? (
                    <p id="text_p"> {item.content}</p>
                  ) : (
                    <video
                      width="100%"
                      height="70%"
                      controls={true}
                      autoPlay
                      loop
                    >
                      <source
                        src={
                          item.video === "video1"
                            ? video1
                            : item.video === "video2"
                            ? video2
                            : item.video === "video3"
                            ? video3
                            : null
                        }
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              </Popup>
              {window.innerWidth < 1000 ? null : (
                <Tooltip direction="top" opacity={1}>
                  {item.place}
                </Tooltip>
              )}
            </Marker>
          );
        })}
      </Fragment>
    );
  }

  const add_arrow = (data) => {
    return (
      <Fragment>
        {data?.map((item, index) => {
          return (
            <Marker
              key={index}
              position={[item.lat, item.long]}
              icon={L.divIcon({
                className: "my-div-icon",
                html: `
                    <img src='${arrow}' className="icon-image-arrow1" style="height: 250%; rotate: ${item.agle}deg;"/>`,
                iconSize: [50, 50],
              })}
            >
              <Popup closeButton={true} autoPan={false}>
                <div className="img_text">
                  <p id="text_nam">
                    <strong>{item.title}</strong>
                  </p>
                  <p id="text_p"> {item.content}</p>
                </div>
              </Popup>
              {window.innerWidth < 1000 ? null : (
                <Tooltip direction="top" opacity={1}>
                  {item.title}
                </Tooltip>
              )}
            </Marker>
          );
        })}
      </Fragment>
    );
  };

  const list_layer = [
    ["Đợt 1", data1, dinh1, 1, arrow1],
    ["Đợt 2", data2, dinh2, 2, arrow2],
    ["Chiến dịch lan rộng cả nước", data3, dinh3, 3, null],
  ];

  const [indexCheck, setIndexCheck] = useState(0);

  function DisplayPosition1() {
    const onClick = useCallback(
      (param1, param2) => {
        map.flyTo(param1, param2, { duration: 0.8 });
      },
      [map]
    );

    const handleClicked = () => {
      onClick(center, calculateZoom());
      setIndexCheck(0);
    };
    return (
      <label className="c_1" onClick={handleClicked}>
        <input
          type="radio"
          name="c"
          checked={indexCheck === 0 ? true : false}
        />
        <p className="">Đợt 1</p>
      </label>
    );
  }

  function DisplayPosition2() {
    const onClick = useCallback(
      (param1, param2) => {
        map.flyTo(param1, param2, { duration: 0.8 });
      },
      [map]
    );

    const handleClicked = () => {
      onClick(
        center,
        window.innerWidth < 1000 ? calculateZoom() : calculateZoom() - 1
      );
      setIndexCheck(1);
    };
    return (
      <label className="c_1" onClick={handleClicked}>
        <input
          type="radio"
          name="c"
          checked={indexCheck === 1 ? true : false}
        />
        <p className="">Đợt 2</p>
      </label>
    );
  }

  function DisplayPosition3() {
    const onClick = useCallback(
      (param1, param2) => {
        map.flyTo(param1, param2, { duration: 0.8 });
      },
      [map]
    );

    const handleClicked = () => {
      onClick([10.077278, 106.695389], calculateZoom() - 3);
      setIndexCheck(2);
    };
    return (
      <label className="c_1" onClick={handleClicked}>
        <input
          type="radio"
          name="c"
          checked={indexCheck === 2 ? true : false}
        />
        <p className="">Chiến dịch lan rộng trên cả nước</p>
      </label>
    );
  }

  function layerControlData() {
    return (
      <Fragment>
        {list_layer.map((item, index) => {
          return (
            <LayersControl.BaseLayer
              key={index}
              name={`
                <div>${item[0]}</div>
              `}
              checked={indexCheck === index ? true : false}
            >
              <LayerGroup>
                {add_data_point(item[1])}
                {add_data_point(item[2])}
                {add_arrow(item[4])}
              </LayerGroup>
            </LayersControl.BaseLayer>
          );
        })}
      </Fragment>
    );
  }

  // Classes used by Leaflet to position controls
  const POSITION_CLASSES = {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right",
  };

  const BOUNDS_STYLE = { weight: 1 };

  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap();

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom());
      },
      [parentMap]
    );
    useMapEvent("click", onClick);

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds());
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds());
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);

    // Listen to events on the parent map
    const handlers = useMemo(
      () => ({ move: onChange, zoom: onChange }),
      [onChange]
    );
    useEventHandlers({ instance: parentMap }, handlers);

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
  }

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 4;

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{
            height: window.innerWidth < 1000 ? 80 : 120,
            width: window.innerWidth < 1000 ? 80 : 120,
          }}
          center={parentMap.getCenter()}
          zoom={indexCheck === 2 ? 3 : 4}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <BasemapLayer name="Streets" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [parentMap, mapZoom]
    );

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    );
  }

  function add_text(re_zoom, { data }) {
    if (re_zoom > 4) {
      return (
        <>
          {data.map((item) => (
            <Marker
              key={item.name}
              position={item.coords}
              icon={L.divIcon({
                className: "my-div-icon",
                html: `${item.name}`,
                iconSize: [120, 40],
              })}
            />
          ))}
        </>
      );
    }
  }

  function Map() {
    return (
      <div>
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={calculateZoom() - 3}
          maxZoom={14}
          //   step={1}
          //scrollWheelZoom={true}
          maxBounds={L.latLngBounds(L.latLng(2, 95), L.latLng(15, 115))}
          ref={setMap}
          zoomControl={false}
        >
          <VectorBasemapLayer
            //url="https://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json"
            apiKey="AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn"
            name="ArcGIS:ChartedTerritory:Base"
            token=""
          />

          <Legend
            map={map}
            pos={"bottomleft"}
            text={
              window.innerWidth < 1000
                ? "<p id='p3'>  Lưu ý: Bản đồ lịch sử tái hiện các địa điểm trong chiến dịch Hồ Chí Minh năm 1975<br/>phục vụ nghiên cứu và giảng dạy, không có giá trị sử dụng khác.</p>"
                : "<p id='p3'>  Lưu ý: Bản đồ lịch sử tái hiện các địa điểm trong chiến dịch Hồ Chí Minh năm 1975 phục vụ nghiên cứu và giảng dạy, không có giá trị sử dụng khác.</p>"
            }
          />
          {/* <Legend
            map={map}
            pos={"bottomleft"}
            text={
              "<strong><a id='scr1' href='https://www.facebook.com/hcmussh.youth' target='_blank'>Sức Trẻ Nhân Văn</a></strong>"
            }
          /> */}
          {indexCheck === 2 ? (
            <Legend
              map={map}
              pos={window.innerWidth < 1000 ? "topright" : "bottomright"}
              text={
                // "<strong><a id='scr1' href='https://www.facebook.com/hcmussh.youth' target='_blank'>Sức Trẻ Nhân Văn</a></strong>"
                `
              <div id='vd3'>
                <video
                width="100%"
                height="100%"
                controls={false}
                autoPlay
              >
                <source
                  src=${video4}
                  type="video/mp4"
                />
                </video>
              </div>
              `
              }
            />
          ) : null}
          <ZoomControl position="topleft" />
          {/* {window.innerWidth < 1000 ? null : (
            <ScaleControl position="topleft" />
          )} */}

          <LayersControl
            position={window.innerWidth < 1000 ? "bottomleft" : "bottomright"}
            collapsed={false}
          >
            {layerControlData()}
          </LayersControl>

          {/* <BasemapLayer name="Topographic" /> */}
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <MinimapControl position="topright" />
          {add_text(zoomLevel, { data: islands })}
        </MapContainer>
        <div className="cc" style={{ display: "flex", position: "absolute" }}>
          <DisplayPosition1 map={map} />
          <DisplayPosition2 map={map} />
          <DisplayPosition3 map={map} />
        </div>
      </div>
    );
  }

  useEffect(() => {
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 123) {
        // 123 là mã phím của F12
        event.preventDefault();
        return false;
      }
    });
    window.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.keyCode === 85) {
        // 85 là mã phím của U
        event.preventDefault();
        return false;
      }
    });
    window.addEventListener("keydown", function (event) {
      if (
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ngăn chặn Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.keyCode === 74)
      ) {
        // Ngăn chặn Ctrl + Shift + J
        event.preventDefault();
      }
    });
  }, []);

  return (
    <div className="MAP">
      <div className="main">
        <div className="background">
          <div className="logo">
            <div className="logo">
              <img className="_img img4" src={doan} alt="Logo ĐTN" />
            </div>
            <div className="logo">
              <img className="_img img2" src={ussh} alt="Logo HCMUSSH" />
            </div>
          </div>
          <div id="title">
            <h1 className="hh1">
              Bản đồ trực tuyến tái hiện Chiến dịch Hồ Chí Minh{" "}
              {window.innerWidth < 1000 ? <br /> : null}(26/4 – 30/4/1975) -
              "Hành quân ra tuyến lửa"
            </h1>
          </div>
        </div>
        <div className="m">{Map()}</div>
        <div className="line" />
        <div className="footpage">
          <p id="ft" className="text-center">
            <strong className="ft_a">
              {" "}
              Thực hiện: Đoàn Thanh niên Khoa Lịch Sử - Trường Đại học Khoa học
              Xã hội và Nhân văn,{window.innerWidth < 1000 ? <br /> : null} Đại
              học Quốc gia Thành phố Hồ Chí Minh
            </strong>
            {/* <p href="" target="" className="ft_a">
              {" "}
              Nguồn tham khảo từ Bản đồ Hành trình 30 năm tìm đường cứu nước của
              Bác Hồ - NXB Trẻ
            </p> */}
          </p>
        </div>
      </div>
    </div>
  );
};
