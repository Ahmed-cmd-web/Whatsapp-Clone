import React from 'react'
import MapView, { Marker } from 'react-native-maps';

const Messagemap = ({message}) => {
    return (
      <MapView
        region={{
          latitude: message.latitude,
          longitude: message.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: 300, width: 250 }}
        loadingEnabled={true}
        showsTraffic={true}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: message.latitude,
            longitude: message.longitude,
          }}
        />
      </MapView>
    );
}

export default Messagemap

