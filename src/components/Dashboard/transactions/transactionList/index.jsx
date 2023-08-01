import React from "react";

const TransactionList = React.memo(
  ({ deleteTransactionHandler, transactionData }) => {
    return (
      <div className="">
        <div className="w-[300px]  mx-auto">
          <h3 className="text-gray-200 text-xl font-medium my-5">
            Transactions
          </h3>
          <div className="h-[407px] overflow-auto">
            <ul className="grid grid-rows-2 gap-2 text-gray-200  p-2">
              {transactionData ? (
                transactionData.map((data) => (
                  <li key={data._id} className=" border-b-2 border-gray-700">
                    <p className="flex justify-between">
                      Amount: <span className="">${data.amount}</span>
                    </p>

                    <p>Transaction type: {data.transaction_type}</p>
                    <p>Remarks: {data.remarks}</p>
                    <button
                      className="text-red-600"
                      onClick={deleteTransactionHandler.bind(null, data._id)}
                    >
                      Delete transaction
                    </button>
                  </li>
                ))
              ) : (
                <div className="text-cwhite">
                  <p>There are no transactions! </p>
                  <p>Add some transactions now!</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);
export default TransactionList;
