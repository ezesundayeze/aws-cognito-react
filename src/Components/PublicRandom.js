import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";


function PublicRandom() {
    const [result, setResult] = useState("")
    const [status, setStatus] = useState(false); 

    useEffect(() => {

        axios.get("https://24ji2e01n9.execute-api.us-east-1.amazonaws.com/public")
        .then((data)=>{
            setStatus(true)
            setResult(data.data)
        }).catch((error)=>{
            console.error(error)
            setStatus(false)
        });
    }, [])

    return (
        <Fragment>
        {status && result}
        {!status && "Loading ..."}
   </Fragment>
    )
};

export default PublicRandom;