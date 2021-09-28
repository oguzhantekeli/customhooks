import { useEffect, useState } from "react"


export const UseFetch = (url) => {
    const [stato,setStato] = useState({data:null,loading:true});
    useEffect(()=>{
        setStato({data:null,loading:true})
        fetch(url)
        .then(x => x.text())
        .then(y => { 
            setStato({
                data:y,
                loading:false
            }) 
        })
    },[url])
 
    return stato
}
