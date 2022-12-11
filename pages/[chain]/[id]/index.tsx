import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ResolveTransactionReturn } from "../../../util/type";
import { getTransactionDetails } from "../../../util/api";
import { ChainKey } from "@lifi/types";

const Transaction = () => {
  const router = useRouter();
  const { chain, id } = router.query;
  const { data, isLoading } = useQuery<ResolveTransactionReturn>(
    ["resolveTx", chain, id],
    ({ queryKey }) => {
      return getTransactionDetails({ queryKey });
    },
    {
      enabled: typeof chain !== "undefined",
    }
  );

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    if (data?.errorFlag) {
      return <div>{`Error occured: ${data.errorMessage}`}</div>;
    } else {
      return <div><pre>{data?.jsonResult}</pre></div>;
    }
  }
};

export default Transaction;
