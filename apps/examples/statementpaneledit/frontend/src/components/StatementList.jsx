import {ListGroup} from "react-bootstrap";

function statementList2Map(statementList) {

    const statementMap = new Map()

    if (statementList) {
        statementList.forEach(el => {
            statementMap.set(el.stockcode, el)
        })
    }

    return statementMap

}

export default function StatementList({editable, statementList, statement, setSelectstatement}) {

    const statementMap = statementList2Map(statementList)

    const stockClickHandle = (e) => {
        const selected = statementMap.get(e.target.innerText)
        setSelectstatement(selected)
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