import {Button} from "./tailwindui/catalyst/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./tailwindui/catalyst/table";


export default function StatementTable({statementsList, selectStatement, backClickHandle}) {
    return (
        <div>
            <div className="mt-6 flex items-center justify-start gap-x-6">
                <Button color="indigo" onClick={backClickHandle}>Back</Button>
            </div>
            <div className="mt-6 space-y-12">
                <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Stock</TableHeader>
                            <TableHeader>Period</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader></TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statementsList.map((item, idx) => (
                            <TableRow key={idx} href="#">
                                <TableCell className="font-medium">{item.stockcode}</TableCell>
                                <TableCell>{item.period}</TableCell>
                                <TableCell className="text-zinc-500">{item.statementtype}</TableCell>
                                <TableCell>
                                    <Button
                                        color="indigo"
                                        onClick={() => {
                                            selectStatement(item.stockcode, item.period, item.statementtype)
                                        }}>Select</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}