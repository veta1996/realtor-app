import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

const MapSection = ({listing}) => {
  return (
    <>
     <MapContainer center={[listing.geolocationMap.lat, listing.geolocationMap.lng]} zoom={13} scrollWheelZoom={false}
     style={{height: '100%', width: '100%'}}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[listing.geolocationMap.lat, listing.geolocationMap.lng]}>
        <Popup>
            {listing.address}
        </Popup>
        </Marker>
    </MapContainer>
    </>
  )
}

export default MapSection