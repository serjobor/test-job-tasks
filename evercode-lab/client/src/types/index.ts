export interface IDataSource {
  id: number;
  name: string;
  sign: string;
  symbol: string;
}

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
}

export interface ICurrenciesInfo {
  price: number;
  last_updated: string;
}