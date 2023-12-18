import {useEffect, useState} from "react";

function Table() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(' http://localhost:8005/n3cov98')
            .then((result) => result.json())
            .then(doc => {
                setItems(doc);
                setIsLoaded(true);
                // console.log(doc);
            })
            .catch(error => {
                console.error(error);
                setError(error)
            })
    }, []);

    if (error)
        return (
            <p>Page has loading error</p>
        )
    else if (!isLoaded)
        return (
            <p>Page is loading</p>
        )
    else
        return (
            <div className="flex flex-row bg-orange-600 text-white align-middle justify-center p-5">
                <ul>
                    {
                        items.map(doc => {
                            return <li key={doc.period}>{doc.close}</li>
                        })
                    }
                </ul>
            </div>
        )
}

export default Table