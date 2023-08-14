import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './AppReducer';
import axios from 'axios';

const API_BASE_URL = 'https://hisaab-0ejx.onrender.com/api/v1';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const handleError = (error) => {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: error.response ? error.response.data.error : 'An error occurred',
    });
  };

  const getTransactions = async () => {
    try {
      dispatch({ type: 'REQUEST' });
      const res = await axios.get(`${API_BASE_URL}/transactions`);
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (err) {
      handleError(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      dispatch({ type: 'REQUEST' });
      await axios.delete(`${API_BASE_URL}/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({ type: 'REQUEST' });
      const res = await axios.post(`${API_BASE_URL}/transactions`, transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch transactions when the component mounts

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
