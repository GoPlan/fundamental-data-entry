import {useState, useEffect, useContext} from "react";
import Form from "react-bootstrap/Form";
import {AppContext, StatementContext} from "./AppContext";

function StatementField({fieldname}) {

    const appCtx = useContext(AppContext)
    const statementCtx = useContext(StatementContext)

    const [fieldValue, setFieldValue] = useState();
    const [firstRun, setFirstRun] = useState(true)

    function getField(getURL, username, stockcode, statementtype, quarter, fieldname) {
        const url = `${getURL}/${username}/${stockcode}/${statementtype}/${quarter}/${fieldname}`
        fetch(url)
            .then(result => result.json())
            .then(doc => {
                setFieldValue(doc["value"] ? doc["value"] : undefined)
            })
    }

    function saveField(updateURL, username, stockcode, statementtype, quarter, fieldname, fieldvalue) {

        fetch(updateURL, {
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
        const getURL = appCtx.statementField.getURL
        const updateURL = appCtx.statementField.updateURL
        const username = appCtx.username
        const stockcode = statementCtx.currentStatement.stockcode
        const statementtype = statementCtx.currentStatement.statementtype
        const quarter = statementCtx.currentStatement.quarter

        if (firstRun) {
            getField(getURL, username, stockcode, statementtype, quarter, fieldname)
            setFirstRun(false)
        } else {
            saveField(updateURL, username, stockcode, statementtype, quarter, fieldname, fieldValue)
        }

    }, [fieldValue, statementCtx]);

    const fieldValueHandle = (e) => {
        setFieldValue(e.target.value)
    }

    return (
        <Form.Group id={fieldname} className="mb-2" controlId="{fieldname}">
            <Form.Label>{fieldname}</Form.Label>
            <Form.Control type="text" defaultValue={fieldValue} onChange={fieldValueHandle}/>
        </Form.Group>
    )
}

export default StatementField