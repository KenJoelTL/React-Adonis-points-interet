import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import BoundMap from './BoundMap';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41], 
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props) {
    const compteurList = props.compteurList;
    console.log(props.selectedCompteur)
    return (
        <div id="mapid" style={{ height: '100%', width: '100%'}}>
            <MapContainer style={{ height: '100%', width: '100%'}}>
                <BoundMap compteurList={props.compteurList} selectedCompteur={props.selectedCompteur}></BoundMap>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />               
                {compteurList.map(compteur => (
                    <Marker
                        id={compteur.ID}
                        key={compteur.ID}
                        position={[compteur.Latitude, compteur.Longitude]}
                        icon={props.selectedCompteur.ID === compteur.ID ? 
                        L.icon({
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
                        }) : DefaultIcon}
                        >
                        <Popup>
                            {compteur.Nom}
                        </Popup>
                    </Marker>
                ))}
                <Popup position={{lat:props.selectedCompteur.Latitude, lng: props.selectedCompteur.Longitude}}>{props.selectedCompteur.Nom}</Popup>
            </MapContainer>
        </div>
    );
}

export default Map;
