import Form from "react-bootstrap/Form";


function StatementField({fieldName, fieldValue}) {

    const fieldValueHandle = (e) => {
        console.log(e.target.value)
    }

    return (
        <Form.Group id={fieldName} className="mb-2" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control type="text" value={fieldValue} onChange={fieldValueHandle}/>
        </Form.Group>
    )
}

export default StatementField