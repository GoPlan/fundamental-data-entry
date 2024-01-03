import {useState} from "react";
import Form from "react-bootstrap/Form";

function StatementField({fieldname}) {
    const [fieldValue, setFieldValue] = useState();

    const updateField = (e) => {
        setFieldValue(e.target.value)
    };

    return (
        <Form.Group className="mb-2" controlId="{fieldname}">
            <Form.Label>{fieldname}</Form.Label>
            <Form.Control type="text" onChange={updateField}/>
        </Form.Group>
    )
}

export default StatementField