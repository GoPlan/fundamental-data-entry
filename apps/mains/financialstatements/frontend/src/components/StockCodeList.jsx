import {ArrowRightEndOnRectangleIcon} from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function StockCodeList({stockcodeList, selectStockCode}) {

    const stockClickHandle = (stockcode) => {
        return () => {
            selectStockCode(stockcode)
        }
    }

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">Stock Codes</h2>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {stockcodeList.map((stockcode) => (
                    <li key={stockcode} className="col-span-1 flex rounded-md shadow-sm">
                        <div
                            className={classNames(
                                'bg-green-500',
                                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                            )}
                        >
                            {stockcode}
                        </div>
                        <div
                            className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <a href="#"
                                   onClick={stockClickHandle(stockcode)}
                                   className="no-underline font-medium text-gray-900 hover:text-gray-600">
                                    {stockcode}
                                </a>
                                <p className="text-gray-500">Stock Sector</p>
                            </div>
                            <div className="flex-shrink-0 pr-2">
                                <button
                                    type="button"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">Open options</span>
                                    <ArrowRightEndOnRectangleIcon className="h-5 w-5"
                                                                  aria-hidden="true"
                                                                  onClick={stockClickHandle(stockcode)}/>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}