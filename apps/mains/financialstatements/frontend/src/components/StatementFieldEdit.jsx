import Form from "react-bootstrap/Form";

function StatementFieldEdit({fieldName, fieldValue, callUpdateField}) {
    const onChangeHandle = (e) => {
        callUpdateField(e.target.value)
    }

    return (
        <Form.Group id={fieldName} className="mb-2" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control type="text" defaultValue={fieldValue} onChange={onChangeHandle}/>
        </Form.Group>
    )
}


export default StatementFieldEdit