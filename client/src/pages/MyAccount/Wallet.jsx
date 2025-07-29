import { useState, useEffect } from "react";
import { FaWallet, FaMoneyBillWave, FaHistory, FaPlus, FaArrowRight } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import Section from "../../components/Section";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data - Thay thế bằng API call thực tế
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Giả lập API call
        setTimeout(() => {
          setBalance(1250000); // 1,250,000 VND
          
          const mockTransactions = [
            {
              id: 1,
              type: "deposit",
              amount: 500000,
              date: "15/06/2024 14:30",
              description: "Nạp tiền từ thẻ ngân hàng",
              status: "completed"
            },
            {
              id: 2,
              type: "payment",
              amount: -350000,
              date: "16/06/2024 09:15",
              description: "Thanh toán đặt sân bóng đá",
              status: "completed"
            },
            {
              id: 3,
              type: "deposit",
              amount: 1000000,
              date: "18/06/2024 11:45",
              description: "Nạp tiền từ ví điện tử",
              status: "completed"
            },
            {
              id: 4,
              type: "payment",
              amount: -200000,
              date: "20/06/2024 16:20",
              description: "Thanh toán đặt sân cầu lông",
              status: "pending"
            }
          ];
          setTransactions(mockTransactions);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Không thể tải dữ liệu ví");
        setLoading(false);
        console.error(err);
      }
    };

    fetchWalletData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="payment-wallet-page min-h-screen dark:bg-gray-800">
        {/* Hero Section */}
        <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                  Ví thanh toán
                </h1>
                <p className="text-lg dark:text-gray-200">
                  Quản lý tài khoản thanh toán của bạn
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Đang tải thông tin ví...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-wallet-page min-h-screen dark:bg-gray-800">
        {/* Hero Section */}
        <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                  Ví thanh toán
                </h1>
                <p className="text-lg dark:text-gray-200">
                  Quản lý tài khoản thanh toán của bạn
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Error State */}
        <Section>
          <div className="text-center py-12">
            <div className="text-red-500 text-4xl mb-4">
              <FaTimesCircle className="mx-auto" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Thử lại
            </button>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="payment-wallet-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                Ví thanh toán
              </h1>
              <p className="text-lg dark:text-gray-200">
                Quản lý tài khoản thanh toán của bạn
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/deposit')}
              >
                <FaPlus className="mr-2" /> Nạp tiền
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        <div className="container mx-auto px-4 py-8">
          {/* Balance Card */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <FaWallet className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Số dư khả dụng</h3>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/deposit')}
              >
                <FaPlus className="mr-2" /> Nạp tiền
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 rounded-lg shadow-sm flex items-center justify-between transition-colors"
              onClick={() => navigate('/deposit')}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <GiReceiveMoney className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-800 dark:text-white">Nạp tiền</span>
              </div>
              <FaArrowRight className="text-gray-400" />
            </button>

            <button
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 rounded-lg shadow-sm flex items-center justify-between transition-colors"
              onClick={() => navigate('/withdraw')}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <GiPayMoney className="text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-gray-800 dark:text-white">Rút tiền</span>
              </div>
              <FaArrowRight className="text-gray-400" />
            </button>

            <button
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 rounded-lg shadow-sm flex items-center justify-between transition-colors"
              onClick={() => navigate('/transfer')}
            >
              <div className="flex items-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full mr-3">
                  <FaMoneyBillWave className="text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-gray-800 dark:text-white">Chuyển tiền</span>
              </div>
              <FaArrowRight className="text-gray-400" />
            </button>
          </div>

          {/* Transaction History */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <FaHistory className="mr-2 text-green-600 dark:text-green-400" />
                Lịch sử giao dịch
              </h3>
            </div>

            {transactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Bạn chưa có giao dịch nào
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-4 ${
                          transaction.type === "deposit" 
                            ? "bg-green-100 dark:bg-green-900" 
                            : "bg-red-100 dark:bg-red-900"
                        }`}>
                          {transaction.type === "deposit" ? (
                            <GiReceiveMoney className="text-green-600 dark:text-green-400" />
                          ) : (
                            <GiPayMoney className="text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-gray-800 dark:text-white font-medium">
                            {transaction.description}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right ${
                        transaction.type === "deposit" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        <p className="font-bold">
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}>
                          {transaction.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Wallet;