import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import StatementFormStructure from "./StatementFormStructure";
import {useState} from "react";

export default function StatementForm({statement, statementFields}) {
    const [isEditing, setIsEditing] = useState(false)

    if (!statement)
        return <></>;

    const fieldsName = StatementFormStructure[statement.statementtype]

    if (!isEditing) {
        return (
            <>
                <h1>
                    <p>{statement.stockcode}</p>
                </h1>
                <Form>
                    {
                        fieldsName.map(fieldName => {
                            const fieldValue = statementFields[fieldName] ? statementFields[fieldName] : ""
                            return <StatementField key={fieldName}
                                                   fieldName={fieldName}
                                                   fieldValue={fieldValue}/>
                        })
                    }
                </Form>
            </>
        )
    }
}