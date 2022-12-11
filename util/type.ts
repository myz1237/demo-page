/* eslint-disable no-unused-vars */
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { ChainId, ChainKey } from "@lifi/types";

export type MyTransactionReceipt = {
  chainId: ChainId;
} & TransactionReceipt;

export type FindChainReturn = {
  errorFlag: boolean;
  errorMessage?: string;
  chainId?: ChainKey;
};

export type ResolveTransactionReturn = {
  errorFlag: boolean;
  errorMessage?: string;
  jsonResult?: string
};

export type FindChainApiResponse = {
  result: FindChainReturn;
};

export type getBlockNumberApiResponse = {
  number: number;
};
