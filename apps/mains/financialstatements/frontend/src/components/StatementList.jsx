import {ListGroup} from "react-bootstrap";

function statementListToMap(statementList) {

    const statementMap = new Map()

    if (statementList) {
        statementList.forEach(el => {
            statementMap.set(el.stockcode, el)
        })
    }

    return statementMap
}

export default function StatementList({editable, statementList, statement, setSelectstatement: setStatementToSelect}) {

    const statementMap = statementListToMap(statementList)

    const stockClickHandle = (e) => {
        const selected = statementMap.get(e.target.innerText)
        setStatementToSelect(selected)
    }

    return (
        <ListGroup>
            {
                statementList.map(item => (
                        <ListGroup.Item action
                                        disabled={editable.isEditing}
                                        active={statement && item.stockcode === statement.stockcode}
                                        onClick={stockClickHandle}
                                        key={item.stockcode}>{item.stockcode}</ListGroup.Item>
                    )
                )
            }
        </ListGroup>
    )
}