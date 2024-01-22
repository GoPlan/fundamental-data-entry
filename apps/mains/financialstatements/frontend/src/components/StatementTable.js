import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";

export default function StatementTable({statementsList, selectStatement}) {

    return (
        <Table bordered hover>
            <thead>
            <tr>
                <th>Stock</th>
                <th>Period</th>
                <th>Statement</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                statementsList.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.stockcode}</td>
                            <td>{item.period}</td>
                            <td>{item.statementtype}</td>
                            <td>{<Button onClick={() => {
                                selectStatement(item.stockcode, item.period, item.statementtype)
                            }}>Select</Button>}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}