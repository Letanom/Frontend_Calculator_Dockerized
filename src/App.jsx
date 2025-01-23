import React, { useState } from "react";
import axios from "axios";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.post("http://localhost:7000/calculate", {
        num1: parseInt(num1),
        num2: parseInt(num2),
        operation: operation,
      });
      setResult(response.data);
      setError(null);
    } catch (error) {
      setError("Hesaplama işlemi başarısız oldu.");
    }
  };

  return (
   
    <div className="justify-center items-center flex h-screen bg-indigo-400" >
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <div className="space-y-6">
          <h1 className="text-center text-3xl font-bold text-gray-800">Kevın Hesap Makinesi</h1>

          <div className="grid grid-cols-1 gap-2">
            <input
              type="number"
              className="p-4 text-xl rounded border-gray-500 border-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Numara 1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
            <input
              type="number"
              className="p-4 text-xl rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Numara 2"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <select
              className="w-full p-4 text-xl rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
            <button
              onClick={handleCalculate}
              className="w-full p-4 text-xl bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Hesapla
            </button>
          </div>
          {result !== null && (
            <div className="mt-4 p-4 bg-green-200 text-black rounded text-xl text-center">
              Sonuç: <span className="font-bold">{result}</span>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-200 text-black rounded text-xl text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
