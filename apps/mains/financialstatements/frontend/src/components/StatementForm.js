import {useCallback, useContext} from "react";
import {AppContext} from "./AppContext";
import StatementFormStructure from "./StatementFormStructure";
import StatementField from "./StatementField";
import {Button} from "./tailwindui/catalyst/button";
import StatementFieldEdit from "./StatementFieldEdit";

function value2number(unknownValue) {
    const value = typeof unknownValue === "string" && unknownValue.length === 0 ? NaN : Number(unknownValue)
    return isNaN(value) ? null : value
}

function FormWrap({children}) {
    return (
        <form>
            <div className="mt-6 space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">(A h2 to be put here)</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">(A paragraph to be put here)</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {children}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default function StatementForm({editable, currentStatement, reloadCurrentStatement, goBack}) {

    const appCtx = useContext(AppContext)
    const fieldsName = currentStatement ? StatementFormStructure[currentStatement.statementtype] : []

    const bindEditClickHandle = () => {
        if (editable.isEditing) {
            return () => {
                editable.setIsEditing(false)
                reloadCurrentStatement()
            }
        } else {
            return () => {
                editable.setIsEditing(true)
            }
        }
    }

    const goBackClickHandle = () => {
        goBack()
    }

    const bindUpdateField = useCallback((fieldName) => {
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

    if (editable.isEditing) {
        return (
            <>
                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <Button color="indigo" disabled> Back </Button>
                    <Button color="green" onClick={bindEditClickHandle()}> Done </Button>
                </div>
                <FormWrap>
                    {
                        fieldsName.map((fieldName) => {
                            const fieldValue = currentStatement.statementfields[fieldName]
                            return <StatementFieldEdit fieldName={fieldName}
                                                       fieldValue={fieldValue}
                                                       callUpdateField={bindUpdateField(fieldName)}/>
                        })
                    }
                </FormWrap>
            </>
        )
    } else {
        return (
            <>
                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <Button color="indigo" onClick={goBackClickHandle}> Back </Button>
                    <Button color="indigo" onClick={bindEditClickHandle()}> Edit </Button>
                </div>
                <FormWrap>
                    {
                        fieldsName.map((fieldName) => {
                            const fieldValue = currentStatement.statementfields[fieldName]
                            return <StatementField fieldName={fieldName}
                                                   fieldValue={fieldValue}/>
                        })
                    }
                </FormWrap>
            </>
        )
    }
}
