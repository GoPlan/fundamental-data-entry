import * as Plot from "@observablehq/plot";
import {useEffect, useRef, useState} from "react";

export default function LinePlot() {

    const closeRef = useRef();
    const retRef = useRef();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(' http://localhost:8005/n3cov98')
            .then((result) => result.json())
            .then(docs => {
                setData(docs.map(row => {
                    return {
                        Date: new Date(row["period"]),
                        Close: row["close"],
                        Return: row["ret"]
                    }
                }));
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    useEffect(() => {
        if (data === undefined) return;

        console.log(data)

        const closePlot = Plot.plot({
            x: {grid: true},
            y: {grid: true},
            color: {scheme: "burd"},
            marks: [
                Plot.ruleY([0]),
                Plot.lineY(data, {x: "Date", y: "Close", stroke: "blue"})
            ]
        });

        const retPlot = Plot.plot({
            x: {grid: true},
            y: {grid: true},
            color: {scheme: "burd"},
            marks: [
                Plot.ruleY([0]),
                Plot.lineY(data, {x: "Date", y: "Return"})
            ]
        });

        closeRef.current.append(closePlot);
        retRef.current.append(retPlot);

        return () => {
            closePlot.remove()
            retPlot.remove()
        };
    }, [data])

    console.log("APP!!!")

    return (
        <>
            <div ref={closeRef}/>
            <div ref={retRef}/>
        </>
    );
}