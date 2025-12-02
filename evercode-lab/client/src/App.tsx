import { Spin, Table } from "antd";
import { useEffect, useState } from "react";
import ExchangeRatesModal from "./components/ExchangeRatesModal";
import type { IDataSource, ICurrenciesInfo } from "./types";
import axios from "axios";
import { CURRENCIES_COLUMNS } from "./constants";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currencies, setCurrencies] = useState<IDataSource[]>([] as IDataSource[]);
  const [currencyName, setCurrencyName] = useState<string>('');
  const [currenciesInfo, setCurrenciesInfo] = useState<ICurrenciesInfo>({} as ICurrenciesInfo);

  const fetchCurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<IDataSource[]>('/api/currencies');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchCurrenciesInfo = async (currencies_symbol: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ICurrenciesInfo>(`/api/currencies/${currencies_symbol}`);

      setCurrenciesInfo(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleRowClick = (record: IDataSource) => {
    setCurrencyName(record.name);
    fetchCurrenciesInfo(record.symbol);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1>Current BTC exchange rates to various currencies</h1>
        <div className="w-full max-w-4xl mx-auto">
          {
            isLoading
              ?
              <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
              </div>
              :
              <Table
                rowKey="id"
                dataSource={currencies}
                columns={CURRENCIES_COLUMNS}
                pagination={false}
                onRow={(record) => {
                  return {
                    onClick: () => handleRowClick(record),
                  };
                }}
              />
          }
        </div>
      </div>

      {isModalOpen
        &&
        <ExchangeRatesModal
          currencyName={currencyName}
          currencyInfo={currenciesInfo}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />}
    </>
  )
}

export default App
