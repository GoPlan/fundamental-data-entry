import Form from "react-bootstrap/Form";


function StatementField({field}) {

    const fieldName = field.fieldName;
    const fieldValue = field.fieldValue ?? ""

    return (
        <Form.Group id={fieldName} className="mb-2" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control type="text" value={fieldValue} readOnly={true}/>
        </Form.Group>
    )
}


export default StatementField