/* eslint-disable no-unused-vars */
import { JsonRpcProvider } from "@ethersproject/providers";
import { ChainId, ChainKey } from "@lifi/types";
import { ethers } from "ethers";

export const NUMBER: Record<string, number> = {
  AWAIT_TIMEOUT: 30,
};

export enum ERROR_TAG {
  NOT_FOUND = "NOT FOUND ERROR",
  INIT = "INIT TX ERROR",
  RPC = "RPC ERROR",
  UNSUPPORT = "TX UNSUPPORT ERROR",
  UNKNOWN = "UNKNOWN ERROR",
  FAILED = "TX FAILED ERROR",
  API_NOT_FOUND = "API NOT FOUND ERROR",
  API_TIMEOUT = "API TIMEOUT ERROR",
  PROXY_CONTRACT = "PARTNER PROXY CONTRACT ERROR",
}

export const ERROR_MSG: Record<string, string> = {
  NOT_FOUND:
    "Transaction not found or not yet mined by blockchain, please check and try again.\n\nIf your transaction is not found, see [this article](https://metamask.zendesk.com/hc/en-us/articles/4415546187803-Error-Unable-to-locate-this-TxnHash-)\nIf your transaction is not yet mined, you can speed it up, see [this article](https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-speed-up-or-cancel-a-pending-transaction).",
  INIT: "You have submitted an init transaction used to deploy a contract. Please provide the transaction hash for the bridging transaction instead. If you need help locating the bridging transaction, please search the block explorer for your transaction.",
  RPC: "RPC server is unavailable now, please try again later.",
  UNSUPPORT:
    "There are a few situations where this can happen:\n(i) The transaction was not done through `%(partnerName)s`.\n(ii) The transaction submitted was an approve transaction. Please provide the transaction hash for the bridging transaction instead. If you need help locating the bridging transaction, please search the block explorer for your transaction.\n(iii) You are carrying out a transaction through %(partnerName)s using your own custom contracts. If so, please manually check your status [here](https://apidocs.li.fi/reference/get_status).",
  UNKNOWN:
    "Unknown error. Please contact our support team in <#%(supportChannel)s> and provide them with your transaction hash.\n\nIf you need help locating the bridging transaction, please search the block explorer for your transaction.",
  FAILED:
    "This error can arise under 2 circumstances:\n(i) The transaction you provided failed, please create a new transaction.\n(ii) You provided the incorrect transaction hash. Please provide the transaction hash for the bridging transaction instead. If you need help locating the bridging transaction, please search the block explorer for your transaction.",
  API_NOT_FOUND:
    "API error right now, please try again later. If you encounter this error message many times, please provide our support team in <#%(supportChannel)s> with the transaction hash and inform them of the bridge you used.",
  API_TIMEOUT:
    "API error right now, please try again later. If you encounter this error message many times, please provide our support team in <#%(supportChannel)s> with the transaction hash and inform them of the bridge you used.",
  PROXY_CONTRACT:
    "Your transaction appears to have been done through a proxy contract. Please contact <#%(supportChannel)s> to whitelist your contract address.\n\nIt is also possible that you have submitted a transaction unrelated to a swap or bridging transaction handled by %(partnerName)s. For example, you could have submitted an approve transaction. If you need help locating the bridging transaction, please search the block explorer for your transaction.",
};

export const LIFICONFIG: Partial<
  Record<
    ChainKey,
    {
      RPC: string;
      BackUpRPC: string;
      ID: ChainId;
      Explorer: string;
      name: ChainKey;
      FullName: string;
    }
  >
> = {
  opt: {
    RPC: "https://rpc.ankr.com/optimism",
    BackUpRPC: "https://mainnet.optimism.io/",
    ID: ChainId.OPT,
    Explorer: "https://optimistic.etherscan.io/",
    name: ChainKey.OPT,
    FullName: "Optimism",
  },
  arb: {
    RPC: "https://rpc.ankr.com/arbitrum",
    BackUpRPC: "https://arb1.arbitrum.io/rpc",
    ID: ChainId.ARB,
    Explorer: "https://arbiscan.io/",
    name: ChainKey.ARB,
    FullName: "Arbitrum",
  },
  eth: {
    RPC: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    BackUpRPC: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ID: ChainId.ETH,
    Explorer: "https://etherscan.io/",
    name: ChainKey.ETH,
    FullName: "Ethereum",
  },
  pol: {
    RPC: "https://poly-archival.gateway.pokt.network/v1/lb/62320b66b2feb2003985a7cd",
    BackUpRPC: "https://polygon-rpc.com/",
    ID: ChainId.POL,
    Explorer: "https://polygonscan.com/",
    name: ChainKey.POL,
    FullName: "Polygon (MATIC)",
  },
  bsc: {
    RPC: "https://rpc.ankr.com/bsc",
    BackUpRPC: "https://bsc-dataseed.binance.org/",
    ID: ChainId.BSC,
    Explorer: "https://bscscan.com/",
    name: ChainKey.BSC,
    FullName: "Binance Smart Chain",
  },
  ftm: {
    RPC: "https://rpc.ankr.com/fantom",
    BackUpRPC: "https://rpcapi.fantom.network",
    ID: ChainId.FTM,
    Explorer: "https://ftmscan.com/",
    name: ChainKey.FTM,
    FullName: "Fantom",
  },
  dai: {
    RPC: "https://rpc.ankr.com/gnosis",
    BackUpRPC: "https://rpc.gnosischain.com",
    ID: ChainId.DAI,
    Explorer: "https://blockscout.com/xdai/mainnet/",
    name: ChainKey.DAI,
    FullName: "Gnosis (xDAI)",
  },
  ava: {
    RPC: "https://rpc.ankr.com/avalanche",
    BackUpRPC: "https://api.avax.network/ext/bc/C/rpc",
    ID: ChainId.AVA,
    Explorer: "https://cchain.explorer.avax.network/",
    name: ChainKey.AVA,
    FullName: "Avalanche",
  },
  fus: {
    RPC: "https://fuse-rpc.gateway.pokt.network/",
    BackUpRPC: "https://rpc.fuse.io",
    ID: ChainId.FUS,
    Explorer: "https://explorer.fuse.io/",
    name: ChainKey.FUS,
    FullName: "Fuse",
  },
  moo: {
    RPC: "https://rpc.ankr.com/moonbeam",
    BackUpRPC: "https://rpc.api.moonbeam.network",
    ID: ChainId.MOO,
    Explorer: "https://blockscout.moonbeam.network/",
    name: ChainKey.MOO,
    FullName: "Moonbeam",
  },
  mor: {
    RPC: "https://rpc.api.moonriver.moonbeam.network",
    BackUpRPC: "https://moonriver.api.onfinality.io/public",
    ID: ChainId.MOR,
    Explorer: "https://blockscout.moonriver.moonbeam.network/",
    name: ChainKey.MOR,
    FullName: "Moonriver",
  },
  cel: {
    RPC: "https://rpc.ankr.com/celo",
    BackUpRPC: "https://forno.celo.org",
    ID: ChainId.CEL,
    Explorer: "https://explorer.celo.org/",
    name: ChainKey.CEL,
    FullName: "Celo",
  },
  one: {
    RPC: "https://harmony-0-rpc.gateway.pokt.network",
    BackUpRPC: "https://api.harmony.one",
    ID: ChainId.ONE,
    Explorer: "https://explorer.harmony.one/",
    name: ChainKey.ONE,
    FullName: "Harmony",
  },
  cro: {
    RPC: "https://evm-cronos.crypto.org",
    BackUpRPC: "https://evm-cronos.crypto.org",
    ID: ChainId.CRO,
    Explorer: "https://cronos.crypto.org/explorer/",
    name: ChainKey.CRO,
    FullName: "Cronos",
  },
  evm: {
    RPC: "https://eth.bd.evmos.org:8545",
    BackUpRPC:
      "https://evmos-mainnet.gateway.pokt.network/v1/lb/62e8a657a8578e0039ff685b",
    ID: ChainId.EVM,
    Explorer: "https://evm.evmos.org/",
    name: ChainKey.EVM,
    FullName: "Evmos",
  },
  okt: {
    RPC: "https://exchainrpc.okex.org",
    BackUpRPC: "https://exchainrpc.okex.org",
    ID: ChainId.OKT,
    Explorer: "https://www.oklink.com/en/okc/",
    name: ChainKey.OKT,
    FullName: "OKXChain",
  },
  hec: {
    RPC: "https://http-mainnet.hecochain.com",
    BackUpRPC: "https://http-mainnet.hecochain.com",
    ID: ChainId.HEC,
    Explorer: "https://hecoinfo.com/",
    name: ChainKey.HEC,
    FullName: "HECO",
  },
  bob: {
    RPC: "https://mainnet.boba.network",
    BackUpRPC:
      "https://boba-mainnet.gateway.pokt.network/v1/lb/6258298b981a0200395864f0",
    ID: ChainId.BOB,
    Explorer: "https://bobascan.com/",
    name: ChainKey.BOB,
    FullName: "Boba",
  },
  aur: {
    RPC: "https://mainnet.aurora.dev",
    BackUpRPC: "https://mainnet.aurora.dev",
    ID: ChainId.AUR,
    Explorer: "https://aurorascan.dev/",
    name: ChainKey.AUR,
    FullName: "Aurora",
  },
};

export const providerArray: Array<{
  rpcProvider: JsonRpcProvider;
  chainName: ChainKey;
}> = Object.values(LIFICONFIG).map((rpc) => ({
  rpcProvider: new ethers.providers.JsonRpcProvider(rpc.RPC),
  chainName: rpc.name,
}));

export const backUpProviderArray: Array<{
  rpcProvider: JsonRpcProvider;
  chainName: ChainKey;
}> = Object.values(LIFICONFIG).map((rpc) => ({
  rpcProvider: new ethers.providers.JsonRpcProvider(rpc.BackUpRPC),
  chainName: rpc.name,
}));

export const chainIdToChainName: {
  [id: number]: ChainKey;
} = Object.values(LIFICONFIG).reduce((pre, cur) => {
  pre = {
    ...pre,
    [cur.ID]: cur.name,
  };
  return pre;
}, {});

export const chainIdToChainFullName: {
  [id: number]: ChainKey;
} = Object.values(LIFICONFIG).reduce((pre, cur) => {
  pre = {
    ...pre,
    [cur.ID]: cur.FullName,
  };
  return pre;
}, {});

export const CONTRACT = {
  LIFI: "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE",
};

export const CONTRACT_EVENT_TOPIC = {
  CONNEXT_TX_MANAGER_TOPIC:
    "0x88fbf1dbc326c404155bad4643bd0ddadd23f0636929c66442f0433208b2c905",
  LIFI_TRANSFER_STARTED_EVENT_TOPIC:
    "0xcba69f43792f9f399347222505213b55af8e0b0b54b893085c2e27ecbe1644f1",
  LIFI_SWAPPED_GENERIC_EVENT_TOPIC:
    "0x93517b7c6f32856737008edf37cf2542b55d27d83fa299aa216f55a982a6ee1d",
  LIFI_TRANSFER_STARTED_EVENT_TOPIC_OLD:
    "0x438f81f3fe94456cd9d98e9073524f1c2bafb3ce75def8ced69f708061ddd5c4",
  LIFI_SWAPPED_GENERIC_EVENT_TOPIC_OLD:
    "0x5575cf3fc102f1c1470603a0cf871dad0c96ea2afe544e11452343d8eb6b2399",
  ASSET_SWAPPED_EVENT_TOPIC:
    "0x7bfdfdb5e3a3776976e53cb0607060f54c5312701c8cba1155cc4d5394440b38",
};

export const LIFI_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "transactionId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "bridge",
            type: "string",
          },
          {
            internalType: "string",
            name: "integrator",
            type: "string",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sendingAssetId",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "destinationChainId",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasSourceSwaps",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasDestinationCall",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct ILiFi.BridgeData",
        name: "bridgeData",
        type: "tuple",
      },
    ],
    name: "LiFiTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "transactionId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dex",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fromAssetId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toAssetId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "AssetSwapped",
    type: "event",
  },
];
