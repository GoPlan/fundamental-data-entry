import {Col, Container, Row, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import StatementFieldEdit from "./StatementFieldEdit";
import StatementFormStructure from "./StatementFormStructure";

function fieldsList2Map(fieldsList) {

    const fieldsDict = {}

    fieldsList.forEach(item => {
        fieldsDict[item.fieldname] = item.value
    })

    return fieldsDict
}

export default function StatementForm({editable, statement, setSelectstatement}) {

    const fieldsName = statement ? StatementFormStructure[statement.statementtype] : []
    const fieldsValueMap = statement ? fieldsList2Map(statement.statementfields) : {}

    const editClickHandle = () => {
        editable.setIsEditing(editable => !editable)
        setSelectstatement({
            username: statement.username,
            stockcode: statement.stockcode,
            statementtype: statement.statementtype,
            quarter: statement.quarter
        })
    }

    if (statement && !editable.isEditing) {
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
                            {
                                fieldsName.map(fieldName => {
                                    const fieldValue = fieldsValueMap[fieldName]
                                    return <StatementField key={fieldName}
                                                           field={{fieldName, fieldValue}}/>
                                })
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else if (statement && editable.isEditing) {
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
                            {
                                fieldsName.map(fieldName => {
                                    const fieldValue = fieldsValueMap[fieldName]
                                    return <StatementFieldEdit key={fieldName}
                                                               field={{fieldName, fieldValue}}
                                                               statement={statement}/>
                                })
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        // statement is Null (No selected statement)
        return <></>
    }
}