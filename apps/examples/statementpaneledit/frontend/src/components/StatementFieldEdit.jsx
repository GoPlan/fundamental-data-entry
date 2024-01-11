import Form from "react-bootstrap/Form";
import {useContext} from "react";
import {AppContext} from "./AppContext";


function StatementFieldEdit({field, statement}) {

    const appCtx = useContext(AppContext)
    const fieldName = field.fieldName
    const fieldValue = field.fieldValue ?? ""

    const onChangeHandle = (e) => {
        const updateURL = appCtx.statementField.updateURL
        const fieldNewValue = e.target.value

        fetch(updateURL, {
            method: "POST",
            body: JSON.stringify(
                {
                    username: statement.username,
                    stockcode: statement.stockcode,
                    statementtype: statement.statementtype,
                    quarter: statement.quarter,
                    fieldname: fieldName,
                    value: fieldNewValue
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <Form.Group id={fieldName} className="mb-2" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control type="text" defaultValue={fieldValue} onChange={onChangeHandle}/>
        </Form.Group>
    )
}


export default StatementFieldEdit