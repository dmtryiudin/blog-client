import React, {useEffect} from 'react';
import H from "@here/maps-api-for-javascript";
import {getIP, getLocation} from "../utils/getLocation";

export const LocationComponent:React.FC = () => {
    let newRef:any = React.createRef();
    let map:any = null;

    useEffect(()=>{
        getCurrentLocation().then(e=>map.setCenter({lat:e.lat, lng:e.lon}))
    }, [])

    useEffect(()=>{
        if (!map) {
            const platform = new H.service.Platform({
                apikey: process.env.REACT_APP_MAP_KEY!
            });
            const layers = platform.createDefaultLayers();
            const newMap = new H.Map(
                newRef.current,
                layers.vector.normal.map,
                {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 0, lng: 0},
                    zoom: 10,
                },
            );
            map = newMap;
        }
    }, [])

    async function getCurrentLocation(){
        return await getLocation(await getIP())
    }

    return (
        <div
            style={{ width: '300px', height:'300px' }}
            ref={newRef}
        />
    )
}

export default LocationComponent
