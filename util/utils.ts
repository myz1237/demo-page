import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ChainKey } from "@lifi/types";

import { NullValueError, TimeoutError, TxFetchUnknownError } from "./error";

interface awaitWrapType<T> {
  result: T | null;
  error: any;
}

export function isValidTxHash(hashValue: string) {
  const txMatchResult = hashValue.match(/^0x([A-Fa-f0-9]{64})$/g);

  if (!txMatchResult || txMatchResult.length > 1) return false;
  else return txMatchResult[0];
}

export async function awaitWrap<T>(
  promise: Promise<T>
): Promise<awaitWrapType<T>> {
  return promise
    .then((data) => {
      return {
        result: data,
        error: null,
      };
    })
    .catch((error) => {
      return {
        result: null,
        error: error,
      };
    });
}

export async function awaitWrapRPCWithTimeout({
  promise,
  chainKey,
}: {
  promise: Promise<TransactionResponse>;
  chainKey: ChainKey;
}): Promise<ChainKey> {
  return Promise.race([promise])
    .then((data) => {
      if (data) {
        return chainKey;
      } else throw new NullValueError();
    })
    .catch((error) => {
      if (error instanceof TimeoutError) {
        throw new TimeoutError();
      } else if (error instanceof NullValueError) {
        throw new NullValueError();
      } else {
        console.log(error);
        throw new TxFetchUnknownError();
      }
    });
}

export function isValidUrl(url: string) {
  try {
    // eslint-disable-next-line no-unused-vars
    const urlObj = new URL(url);

    return true;
  } catch (error) {
    return false;
  }
}

export function capitalizeFirstLetter(stringValue: string) {
  return (
    stringValue.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase()
  );
}
