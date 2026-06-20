import React, { useState } from "react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!category || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setCategory("");
    setAmount("");
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  const categorySummary = {};

  transactions.forEach((item) => {
    if (item.type === "Expense") {
      categorySummary[item.category] =
        (categorySummary[item.category] || 0) + item.amount;
    }
  });

  return (
    <div className="container">

      <div className="form-box">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add
        </button>
      </div>

      <div className="summary">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹ {income}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹ {expense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹ {balance}</p>
        </div>
      </div>

      <h2>Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>₹ {item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Category Analytics</h2>

      <ul>
        {Object.entries(categorySummary).map(([cat, amt]) => (
          <li key={cat}>
            {cat} : ₹ {amt}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Dashboard;