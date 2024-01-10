import {ListGroup} from "react-bootstrap";

function statementList2Map(statementList) {

    const statementMap = new Map()

    if (statementList) {
        statementList.map(el => {
            statementMap.set(el.stockcode, el)
        })
    }

    return statementMap

}

export default function StatementList({statementList, statement, setSelectstatement}) {

    const statementMap = statementList2Map(statementList)

    const stockClickHandle = (e) => {
        const selected = statementMap.get(e.target.innerText)
        setSelectstatement(selected)
    }

    if (statementList) {
        return (
            <ListGroup>
                {
                    statementList.map(item => (
                            <ListGroup.Item action
                                            active={statement && item.stockcode === statement.stockcode ? statement : false}
                                            onClick={stockClickHandle}
                                            key={item.stockcode}>{item.stockcode}</ListGroup.Item>
                        )
                    )
                }
            </ListGroup>
        )
    } else {
        return <></>
    }
}