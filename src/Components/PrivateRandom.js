import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";


function PrivateRandom() {
    const [result, setResult] = useState("")
    const [status, setStatus] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("https://24ji2e01n9.execute-api.us-east-1.amazonaws.com/private")
            .then((data) => {
                setStatus(true)
                setResult(data.data)
            }).catch((error)=>{
                setStatus(false)
            });
    }, [])
    return( 
        <Fragment>
             {status && result}
             {!status && "Loading ..."}
        </Fragment>
       
    )
};

export default PrivateRandom;