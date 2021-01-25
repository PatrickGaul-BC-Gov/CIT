import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../Map/Map';


import { Input, Button } from 'shared-components'


export default function MapContainer() {

    const [ address, setAddress ] = useState("");
    const [ coords, setCoords ] = useState( [49.2827, -123.1207])

    const request = () => {
        axios.get(`https://geocoder.api.gov.bc.ca/addresses.json?addressString=${address}`, {
            headers: {
                'apikey': 'jPCilRkCnm1UJHL4yctAS5MkNUpeyVSj'
            }
        })
        .then(data => {
            console.log(data)
            setCoords([data.data.features[0].geometry.coordinates[1], data.data.features[0].geometry.coordinates[0]])
        
        })
        .catch(err => console.log("ERROR: ", err))
    }


    const input = {
        label: "",
        id: "address",
        placeholder: "Address",
        isReadOnly: false,
        isRequired: true,
        styling: "bcgov-editable-white"
    }


    return (

        <div className="d-flex flex-column justify-content-between">
            {console.log(address)}
            <Input input={{...input}} onChange={setAddress}/>
            <Button 
                onClick={request}
                label="Search"
                styling="bcgov-normal-blue btn" 
            />
            <div id="mapContainer"  className="d-flex justify-content-center align-items-center p-2 m-2" style={{border: '2px solid red', height: '500px', width: '500px'}}>
            {console.log("COORDS: ", coords)}
                <Map coords={coords}/>

            </div>
        </div>
        
    )

}
