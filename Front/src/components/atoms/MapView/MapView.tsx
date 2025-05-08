import { FC } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
    latitude: number;
	longitude: number;
    style: any;
}

const MapView: FC<MapViewProps> = ({
	latitude,
    longitude,
	...props
}) => {
	return (
		<MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} {...props}>
            <TileLayer attribution="Carte" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]} />
        </MapContainer>
	);
};

export default MapView;
