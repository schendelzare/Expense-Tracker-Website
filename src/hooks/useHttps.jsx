import React, { useReducer } from "react";
import { redirect, useNavigate } from "react-router-dom";

const initialState = {
  isLoading: false,
  response: null,
  error: null,
  IDENTIFIER: null,
  id: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "RESPONSE": {
      return {
        ...state,
        isLoading: false,
        response: action.response,
        IDENTIFIER: action.identifier,
        id: action.id,
      };
    }
    case "ERROR": {
      return { ...state, isLoading: false, error: action.error };
    }
    case "LOADING": {
      return { ...state, isLoading: true };
    }
    case "DELETE": {
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((transaction) => transaction.id !== action.id),
      };
    }
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttps = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = async (url, method, body, token, id, IDENTIFIER) => {
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      dispatch({ type: "ERROR", error: response.message });
    }

    const resData = await response.json();

    dispatch({
      type: "RESPONSE",
      response: resData,
      identifier: IDENTIFIER,
      id: id,
    });
  };

  return {
    response: httpState.response,
    error: httpState.error,
    isLoading: httpState.isLoading,
    sendRequest,
    IDENTIFIER: httpState.IDENTIFIER,
    id: httpState.id,
  };
};

export default useHttps;
