import {Col, Container, Row, Button} from "react-bootstrap";
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

export default function StatementForm({editable, statement, reloadCurrentStatement}) {

    const appCtx = useContext(AppContext)
    const fieldsName = statement ? StatementFormStructure[statement.statementtype] : []

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
                        stockcode: statement.stockcode,
                        statementtype: statement.statementtype,
                        quarter: statement.quarter,
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
    }, [statement, appCtx])

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
                                    const fieldValue = statement.statementfields[fieldName]
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
                                    const fieldValue = statement.statementfields[fieldName]
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