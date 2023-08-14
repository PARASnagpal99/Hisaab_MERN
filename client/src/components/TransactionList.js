import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import Spinner from './Spinner/spinner'; // Adjust the import path to match your project

const ErrorComponent = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
      <p>{message}</p>
    </div>
  );
};

const TransactionList = () => {
  const { transactions, getTransactions, loading, error } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : (
        <ul id="list" className="list">
          {transactions.map(item => (
            <Transaction key={item._id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TransactionList;
