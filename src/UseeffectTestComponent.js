import { useEffect, useRef } from "react";

export const UseeffectTestComponent=()=>{
    useEffect(() => {
        console.log('test works');
        return () => {
            console.log('cleanup works');
        }
    }, [])
// burada use ref ile bu komponent render olduğunda
// console a renders değerini güncelleyip yazmasını sağladık
    const renders = useRef(0);
    console.log(`componenet renders ${renders.current} times`);

    return(
        <div>
            test
        </div>
    )
}