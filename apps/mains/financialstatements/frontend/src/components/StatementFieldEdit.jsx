function StatementFieldEdit({fieldName, fieldValue, callUpdateField}) {
    const onChangeHandle = (e) => {
        callUpdateField(e.target.value)
    }

    return (
        <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {fieldName}
            </label>
            <div className="mt-2">
                <input
                    id={fieldName}
                    name={fieldName}
                    type="text"
                    onChange={onChangeHandle}
                    defaultValue={fieldValue}
                    className="block w-full rounded-md border-0 py-1.5 text-right text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}


export default StatementFieldEdit