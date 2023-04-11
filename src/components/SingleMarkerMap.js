import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41], 
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function SingleMarkerMap(props) {
    console.log(props.selectedItem)
    const selected = props.selectedItem;
    return (
        <div id="singlemarkermapid" style={{ height: '300px', width: '300px'}}>
            <MapContainer center={[selected.Latitude, selected.Longitude]} zoom={13} style={{ height: '100%', width: '100%'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />               
                    <Marker
                        id={selected.ID}
                        key={selected.ID}
                        position={[selected.Latitude, selected.Longitude]}
                        icon={
                        L.icon({
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
                        })}
                        >
                        <Popup>
                            {props.text}
                        </Popup>
                    </Marker>
            </MapContainer>
        </div>
    );
}

export default SingleMarkerMap;
