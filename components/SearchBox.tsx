import { ChainKey } from "@lifi/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Router from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LIFICONFIG } from "../util/const";

import { FindChainApiResponse, FindChainReturn } from "../util/type";
import { isValidTxHash, isValidUrl } from "../util/utils";

const SearchBox = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const [valid, setValid] = useState(false);
  const isValidInput = (txHash: string) => {
    const result = isValidTxHash(txHash);

    if (result) {
      return result;
    } else {
      if (isValidUrl(txHash)) {
        const extractResult = txHash
          .split("/")
          .filter((value) => /^0x([A-Fa-f0-9]{64})$/.test(value));

        if (extractResult.length !== 1) {
          return false;
        } else {
          return extractResult[0];
        }
      } else {
        return false;
      }
    }
  };

  const { data, isLoading } = useQuery<
    FindChainApiResponse,
    Error,
    FindChainReturn
  >(
    ["findTx", query],
    async ({ queryKey }) => {
      console.log(queryKey);
      const result = await fetch(
        "/api/findChain?" +
          new URLSearchParams({
            txHash: queryKey[1] as string,
          }).toString()
      );

      return result.json();
    },
    {
      select: (data) => data.result,
      enabled: valid,
    }
  );
  const searchResultComponent = (data: FindChainReturn, txHash: string) => {
    if (data.errorFlag) {
      return data.errorMessage;
    } else {
      const { FullName, name } = LIFICONFIG[data.chainId as ChainKey]!;
      const href = `/${name}/${txHash}`;
      const content = `${FullName}: ${txHash}`;

      return <Link href={href}>{content}</Link>;
    }
  };

  useEffect(() => {
    const clearQuery = () => setQuery("");

    // the page has been changed, meaning you do a query and then I clean the query
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const txHash = isValidInput(value);

    if (txHash) {
      setQuery(txHash);
      setValid(true);
    } else {
      setQuery(value);
      setValid(false);
    }
  };

  return (
    <div className="search">
      <input
        type={"text"}
        placeholder={placeholder}
        value={query}
        onChange={onChange}
      ></input>
      <div>
        {query.length > 0 && (
          <ul>
            {valid ? (
              isLoading ? (
                <li>Loading</li>
              ) : (
                <li>{searchResultComponent(data!, query)}</li>
              )
            ) : (
              <li>Please input a valid transaction</li>
            )}
          </ul>
        )}
      </div>
      {/* <button onClick={() => refetch()}>Click Me</button>
      {isLoading ? <div>Loading</div> : <div>{data}</div>} */}
    </div>
  );
};

export default SearchBox;
