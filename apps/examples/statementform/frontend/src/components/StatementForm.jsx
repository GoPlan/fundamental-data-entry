import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import {AppContext, StatementContext} from "./AppContext";

export default function StatementForm() {

    const appCtx = {
        username: "user00",
        statementField: {
            getURL: "http://localhost:8005/statement/field/get",
            updateURL: "http://localhost:8005/statement/field/update"
        }
    }

    const statementCtx = {
        stockcode: "PVT",
        statementtype: "Income",
        quarter: "2023Q4",
    }

    const fields = [
        // "Revenue",
        // "RevenueDeduction",
        "NetRevenue",
        "COGS",
        "GrossProfit",
        // "FinancialIncome",
        // "FinancialExpense",
        // "InterestExpense",
        // "AssociateAndJointVenture",
        // "SellingExpense",
        // "GeneralAndAdministrativeExpense",
        // "OperatingProfit",
        // "OtherIncome",
        // "OtherExpense",
        // "OtherProfit",
        // "ProfitBeforeTax",
        // "CurrentTaxExpense",
        // "DeferredTaxExpense",
        // "ProfitAfterTax",
        // "ProfitAfterTaxForMinorityInterest",
        // "ProfitAfterTaxForShareholdersOfParentCompany"
    ]

    return (
        <AppContext.Provider value={appCtx}>
            <Form>
                <StatementContext.Provider value={statementCtx}>
                    {
                        fields.map(fieldname => <StatementField key={fieldname}
                                                                fieldname={fieldname}/>)
                    }
                </StatementContext.Provider>
            </Form>
        </AppContext.Provider>
    )
}