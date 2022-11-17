import React, {useEffect} from 'react';
import H from "@here/maps-api-for-javascript";
import {location} from "../utils/location";

export const LocationComponent:React.FC = () => {
    let newRef:any = React.createRef();
    let map:any = null;

    useEffect(()=>{
        if(process.env.NODE_ENV !== 'test'){
            getCurrentLocation().then(e=>map.setCenter({lat:e.lat, lng:e.lon}))
        }
    }, [])

    useEffect(()=>{
        if (!map && process.env.NODE_ENV !== 'test') {
            const platform = new H.service.Platform({
                apikey: process.env.REACT_APP_MAP_KEY!
            });

            const layers = platform.createDefaultLayers();
            map = new H.Map(
                newRef.current,
                layers.vector.normal.map,
                {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 0, lng: 0},
                    zoom: 10
                },
            );
        }
    }, [])

    async function getCurrentLocation(){
        return await location.getLocation(await location.getIP())
    }

    return (
        <div
            data-testid="location"
            style={{ width: '300px', height:'300px' }}
            ref={newRef}
        />
    )
}

export default LocationComponent
