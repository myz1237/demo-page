import { LIFICONFIG } from "../../../util/const";
import { ChainKey, StatusResponse } from "@lifi/types";
import { getTransactionDetails } from "../../../util/api";
import TrasactionStatus from "../../../components/TransactionStatus";

export const getServerSideProps = async (context: {
  params: {
    chain: ChainKey;
    id: string;
  };
}) => {
  const { chain, id: txHash } = context.params;

  if (!Object.keys(LIFICONFIG).includes(chain)) {
    return {
      props: {
        badChain: true,
        badTx: false,
      },
    };
  }

  if (!/^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
    return {
      props: {
        badChain: false,
        badTx: true,
      },
    };
  }

  const result = await getTransactionDetails({ chain, txHash });

  if (result.errorFlag) {
    return {
      props: {
        badChain: false,
        badTx: false,
        errorFlag: false,
        errorMessage: result.errorMessage,
      },
    };
  } else {
    return {
      props: {
        badChain: false,
        badTx: false,
        errorFlag: false,
        status: result.status,
      },
    };
  }
};

const Transaction = ({
  badChain,
  badTx,
  errorFlag,
  errorMessage,
  status,
}: {
  badChain: boolean;
  badTx: boolean;
  errorFlag: boolean;
  errorMessage?: string;
  status?: StatusResponse;
}) => {
  if (badChain) {
    return <div>Bad Chain, Please check the URL</div>;
  }

  if (badTx) {
    return <div>Bad TX, Please check the URL</div>;
  }

  if (errorFlag) {
    return <div>{errorMessage}</div>;
  } else {
    return (
      <div>
        <TrasactionStatus status={status!}></TrasactionStatus>
      </div>
    );
  }
};

export default Transaction;
