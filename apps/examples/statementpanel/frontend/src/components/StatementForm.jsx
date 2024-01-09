import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import {AppContext, StatementContext} from "./AppContext";
import {useContext, useEffect, useState} from "react";

import StatementFormStructure from "./StatementFormStructure";

export default function StatementForm({statement}) {
    if (!statement)
        return <></>

    // const appCtx = useContext(AppContext)
    const statementFields = StatementFormStructure[statement.statementtype]
    const statementFieldsList = statement.statementfields
    const statementFieldsData = {}

    statementFieldsList.map(el => {
        statementFieldsData[el.fieldname] = el.value ? el.value : ""
    })

    return (
        <>
            <h1>
                <p>{statement.stockcode}</p>
            </h1>
            <Form>
                {
                    statementFields.map(fieldName => {
                        return <StatementField key={fieldName}
                                               statement={statement}
                                               fieldName={fieldName}
                                               fieldValue={statementFieldsData[fieldName]}/>
                    })
                }
            </Form>
        </>
    )
}