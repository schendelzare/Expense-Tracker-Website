import React, { useEffect, useReducer, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import getAuthToken from "../../auth/getAuthToken";
import TransactionList from "./transactionList";
import useHttps from "../../../hooks/useHttps";

const initialState = {
  data: [],
};

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      return { data: action.data };
    }
    case "DELETE": {
      const filteredData = state.data.filter(
        (transaction) => transaction.id !== action.id
      );
      return {
        data: filteredData,
      };
    }
  }
};

const Transactions = React.memo(() => {
  const [transactionData, dispatch] = useReducer(
    transactionReducer,
    initialState
  );

  const navigate = useNavigate();

  const token = getAuthToken();

  const { response, sendRequest, isLoading, error, IDENTIFIER, id } =
    useHttps();

  useEffect(() => {
    const timer = setTimeout(() => {
      sendRequest(
        "https://expense-tracker-nodejs-dgov.onrender.com/api/transactions",
        "GET",
        null,
        token,
        null,
        "SEND_REQUEST"
      );
    }, 500);

    if (IDENTIFIER === "SEND_REQUEST") {
      console.log("IDENTIFIER", response);
      dispatch({ type: "SET", data: response.data });
    }
    if (IDENTIFIER === "DELETE_REQUEST") {
      console.log("DELETE", id, IDENTIFIER);
      dispatch({ type: "DELETE", id: id });
      navigate("/dashboard");
    }

    return () => clearTimeout(timer);
  }, [token, IDENTIFIER, id]);

  async function deleteTransactionHandler(id) {
    if (confirm("Are you sure?") === true) {
      sendRequest(
        "https://expense-tracker-nodejs-dgov.onrender.com/api/transactions/" +
          id,
        "DELETE",
        null,
        token,
        id,
        "DELETE_REQUEST"
      );
    }
  }

  return (
    <TransactionList
      transactionData={transactionData.data}
      deleteTransactionHandler={deleteTransactionHandler}
    />
  );
});

export default Transactions;
