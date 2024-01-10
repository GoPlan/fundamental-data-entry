import {useState} from "react";
import {Col, Container, Row, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import StatementFieldEdit from "./StatementFieldEdit";
import StatementFormStructure from "./StatementFormStructure";

export default function StatementForm({statement, statementFields}) {
    const [isEditing, setIsEditing] = useState(false)

    if (!statement) return <></>;

    const fieldsName = StatementFormStructure[statement.statementtype]

    const editClickHandle = (e) => {
        setIsEditing(editable => !editable)
    }

    if (!isEditing) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1><p>{statement.stockcode}</p></h1>
                    </Col>
                    <Col>
                        <Button variant="primary" size="lg" onClick={editClickHandle}> Edit </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            {fieldsName.map(fieldName => {
                                const fieldValue = statementFields[fieldName] ? statementFields[fieldName] : ""
                                return <StatementField key={fieldName}
                                                       fieldName={fieldName}
                                                       fieldValue={fieldValue}/>
                            })}
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1><p>{statement.stockcode}</p></h1>
                    </Col>
                    <Col>
                        <Button variant="success" size="lg" onClick={editClickHandle}> Done </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            {fieldsName.map(fieldName => {
                                const fieldValue = statementFields[fieldName] ? statementFields[fieldName] : ""
                                return <StatementFieldEdit key={fieldName}
                                                           fieldName={fieldName}
                                                           fieldValue={fieldValue}/>
                            })}
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}