import { Modal } from "antd";
import { type JSX } from "react";
import type { ICurrenciesInfo } from "../../types";

interface ExchangeRatesModalProps {
  currencyName: string;
  currencyInfo: ICurrenciesInfo;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ExchangeRatesModal = ({
  currencyName,
  currencyInfo,
  isOpen,
  setIsOpen
}: ExchangeRatesModalProps): JSX.Element => {

  const currencyPrice = Math.round(currencyInfo.price);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={`BTC to ${currencyName}`}
      closable
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>1 BTC = {`${currencyPrice} ${currencyName}`}</p>
      <p>last_updated: = {formatDate(currencyInfo.last_updated)}</p>

    </Modal>
  );
};

export default ExchangeRatesModal;

