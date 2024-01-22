import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import StatementFieldEdit from "./StatementFieldEdit";
import StatementFormStructure from "./StatementFormStructure";
import {useCallback, useContext} from "react";
import {AppContext} from "./AppContext";


function value2number(unknownValue) {
    const value = typeof unknownValue === "string" && unknownValue.length === 0 ? NaN : Number(unknownValue)
    return isNaN(value) ? null : value
}

export default function StatementForm({editable, currentStatement, reloadCurrentStatement}) {

    const appCtx = useContext(AppContext)
    const fieldsName = currentStatement ? StatementFormStructure[currentStatement.statementtype] : []

    const editClickHandle = () => {
        editable.setIsEditing(editable => !editable)
        reloadCurrentStatement()
    }

    const updateField = useCallback((fieldName) => {
        return (fieldNewValue) => {
            const updateURL = appCtx.statementField.updateURL
            const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

            fetch(updateURL, {
                method: "POST",
                body: JSON.stringify(
                    {
                        stockcode: currentStatement.stockcode,
                        period: currentStatement.period,
                        statementtype: currentStatement.statementtype,
                        fieldname: fieldName,
                        value: value2number(fieldNewValue)
                    }
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": authorizationBearer
                }
            })
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
    }, [currentStatement, appCtx])

    if (currentStatement && !editable.isEditing) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ListGroup horizontal>
                            <ListGroup.Item><h5>{currentStatement.stockcode}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>{currentStatement.period}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>{currentStatement.statementtype}</h5></ListGroup.Item>
                            <ListGroup.Item><Button variant="primary"
                                                    size="lg"
                                                    onClick={editClickHandle}> Edit </Button></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            {
                                fieldsName.map(fieldName => {
                                    const fieldValue = currentStatement.statementfields[fieldName]
                                    return <StatementField key={fieldName}
                                                           field={{fieldName, fieldValue}}/>
                                })
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else if (currentStatement && editable.isEditing) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ListGroup horizontal>
                            <ListGroup.Item><h5>{currentStatement.stockcode}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>{currentStatement.period}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>{currentStatement.statementtype}</h5></ListGroup.Item>
                            <ListGroup.Item><Button variant="success"
                                                    size="lg"
                                                    onClick={editClickHandle}> Done </Button></ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            {
                                fieldsName.map(fieldName => {
                                    const fieldValue = currentStatement.statementfields[fieldName]
                                    return <StatementFieldEdit key={fieldName}
                                                               fieldName={fieldName}
                                                               fieldValue={fieldValue}
                                                               callUpdateField={updateField(fieldName)}/>
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