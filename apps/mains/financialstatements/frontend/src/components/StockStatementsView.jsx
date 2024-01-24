import {useCallback, useContext, useState} from "react";
import {AppContext} from "./AppContext";
import StatementForm from "./StatementForm";
import StatementTable from "./StatementTable";

function fieldsListToMap(fieldsList) {

    const fieldsDict = {}

    fieldsList.forEach(item => {
        fieldsDict[item.fieldname] = item.value
    })

    return fieldsDict
}

function docToStatement(statement) {
    statement.statementfields = fieldsListToMap(statement.statementfields)
    return statement
}


export default function StockStatementsView({statementsList, goBack}) {

    const appCtx = useContext(AppContext)
    const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

    const [currentStatement, setCurrentStatement] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const selectStatement = useCallback((stockcode, period, statementtype) => {
        const getURL = appCtx.statement.getStatementURL
        const fetchURL = `${getURL}/${stockcode}/${period}/${statementtype}`

        fetch(fetchURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(res => res.json())
            .then(doc => {
                setCurrentStatement(docToStatement(doc))
            })
    }, [appCtx])

    const deSelectStatement = useCallback(() => {
        setCurrentStatement(null)
    })

    const reloadCurrentStatement = useCallback(() => {
        selectStatement(
            currentStatement.stockcode,
            currentStatement.period,
            currentStatement.statementtype
        )
    }, [currentStatement])


    const backClickHandle = () => {
        goBack()
    }

    if (currentStatement) {
        return (
            <StatementForm goBack={deSelectStatement}
                           editable={{isEditing, setIsEditing}}
                           reloadCurrentStatement={reloadCurrentStatement}
                           currentStatement={currentStatement}/>
        )
    } else {
        return (
            <StatementTable statementsList={statementsList}
                            selectStatement={selectStatement}
                            backClickHandle={goBack}/>
        )
    }
}