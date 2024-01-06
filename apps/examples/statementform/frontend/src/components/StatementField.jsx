import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";


function StatementField({username, stockcode, statementtype, quarter, fieldname}) {
    const [fieldValue, setFieldValue] = useState();
    const [firstRun, setFirstRun] = useState(true)

    function getField(username, stockcode, statementtype, quarter, fieldname) {
        const get_url = (
            `http://localhost:8005/statement/field/get/${username}/${stockcode}/${statementtype}/${quarter}/${fieldname}`
        )

        fetch(get_url)
            .then(result => result.json())
            .then(doc => {
                // if ("value" in doc)
                const value = doc["value"] ? doc["value"] : undefined
                setFieldValue(value)
            })
    }

    function saveField(username, stockcode, statementtype, quarter, fieldname, fieldvalue) {
        const update_url = (
            `http://localhost:8005/statement/field/update`
        )
        fetch(update_url, {
            method: "POST",
            body: JSON.stringify(
                {
                    username: username,
                    stockcode: stockcode,
                    statementtype: statementtype,
                    quarter: quarter,
                    fieldname: fieldname,
                    value: fieldvalue
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }


    useEffect(() => {
        if (firstRun) {
            getField(username, stockcode, statementtype, quarter, fieldname)
            setFirstRun(false)
        } else
            saveField(username, stockcode, statementtype, quarter, fieldname, fieldValue)
    }, [fieldValue]);

    const fieldValueHandler = (e) => {
        setFieldValue(e.target.value)
    }

    return (
        <Form.Group id={fieldname} className="mb-2" controlId="{fieldname}">
            <Form.Label>{fieldname}</Form.Label>
            <Form.Control type="text" defaultValue={fieldValue} onChange={fieldValueHandler}/>
        </Form.Group>
    )
}

export default StatementField