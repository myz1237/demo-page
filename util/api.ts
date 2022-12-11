import {
  Bridge,
  BridgeDefinition,
  BridgeTool,
  ChainId,
  ChainKey,
} from "@lifi/types";
import { Log } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import {
  backUpProviderArray,
  chainIdToChainName,
  CONTRACT,
  CONTRACT_EVENT_TOPIC,
  ERROR_TAG,
  LIFICONFIG,
  LIFI_ABI,
  providerArray,
} from "./const";
import { FailError, InitError, NullValueError, UnsupportError } from "./error";
import { FindChainReturn, ResolveTransactionReturn } from "./type";
import { awaitWrap, awaitWrapRPCWithTimeout } from "./utils";
import LIFI, { NotFoundError } from "@lifi/sdk";

export async function findTransactionChain(
  txHash: string
): Promise<FindChainReturn> {
  const { result, error } = await awaitWrap(
    Promise.any(
      providerArray.map((value) =>
        awaitWrapRPCWithTimeout({
          promise: value.rpcProvider.getTransaction(txHash),
          chainKey: value.chainName,
        })
      )
    )
  );

  // All failed
  // Two possibilities: 1. This tx is wrong, pending, not mined. 2. RPC of the right chain is unavailable now
  if (error) {
    const { result: backupResult, error: backupError } = await awaitWrap(
      Promise.any(
        backUpProviderArray.map((value) =>
          awaitWrapRPCWithTimeout({
            promise: value.rpcProvider.getTransaction(txHash),
            chainKey: value.chainName,
          })
        )
      )
    );

    if (backupError) {
      const aggregatorError = backupError as AggregateError;
      const isPendingOrWrongTX = aggregatorError.errors.filter(
        (error) => !(error instanceof NullValueError)
      );

      if (isPendingOrWrongTX.length === 0) {
        return {
          errorFlag: true,
          errorMessage: ERROR_TAG.NOT_FOUND,
        };
      } else {
        return {
          errorFlag: true,
          errorMessage: ERROR_TAG.RPC,
        };
      }
    } else {
      return {
        errorFlag: false,
        chainId: backupResult!,
      };
    }
  }

  return {
    errorFlag: false,
    chainId: result!,
  };
}

export async function getTransactionDetails({
  queryKey,
}: {
  queryKey: any;
}): Promise<ResolveTransactionReturn> {
  const chainKey = queryKey[1] as ChainKey;
  const txHash = queryKey[2];
  const rpc = LIFICONFIG[chainKey]!.RPC;
  const provider = new ethers.providers.JsonRpcBatchProvider(rpc);
  let { result: receipt, error } = await awaitWrap(
    provider.getTransactionReceipt(txHash)
  );

  if (error) {
    const backRpc = LIFICONFIG[chainKey]!.BackUpRPC;
    const backUpProvider = new ethers.providers.JsonRpcBatchProvider(backRpc);
    const { result: backUpReceipt, error: backUpError } = await awaitWrap(
      backUpProvider.getTransactionReceipt(txHash)
    );

    if (backUpError) {
      return {
        errorFlag: true,
        errorMessage: backUpError?.message ?? "Unknow Error Reason.",
      };
    } else {
      receipt = backUpReceipt;
    }
  }

  const status = receipt!.status;

  if (status === 0) throw new FailError();
  const toAddress = receipt!.to;

  if (!toAddress) throw new InitError();

  const from = chainKey;
  let bridge: BridgeTool;
  let to: ChainKey;
  let targetLogs: Array<Log>;
  let targetLog: Log;

  if (toAddress === CONTRACT.LIFI) {
    const lifiAbiInterface = new ethers.utils.Interface(LIFI_ABI);
    targetLogs = receipt!.logs.filter(
      (log) =>
        log.topics[0] === CONTRACT_EVENT_TOPIC.LIFI_TRANSFER_STARTED_EVENT_TOPIC
    );

    if (targetLogs.length !== 1) throw new UnsupportError();
    [targetLog] = targetLogs;
    const log = lifiAbiInterface.parseLog({
      topics: targetLog.topics,
      data: targetLog.data,
    });

    bridge = log.args.bridgeData.bridge;
    to = chainIdToChainName[log.args.bridgeData.destinationChainId.toNumber()];

    const api = new LIFI();
    const para = {
      fromChain: from,
      toChain: to,
      bridge: bridge,
      txHash: txHash,
    };
    console.log(para);
    const response = await api.getStatus(para);

    return {
      errorFlag: false,
      jsonResult: JSON.stringify(response, null, 2),
    };
  } else throw new UnsupportError();
}
