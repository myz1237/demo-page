import { ERROR_MSG, ERROR_TAG } from "./const";

export class TxFetchError extends Error {
  public tag: string;
  protected constructor(message: string, tag: string) {
    super(message);
    this.tag = tag;
    this.name = this.constructor.name;
  }
}

export class TimeoutError extends TxFetchError {
  public constructor() {
    super(ERROR_MSG.RPC, ERROR_TAG.RPC);
  }
}

export class NullValueError extends TxFetchError {
  public constructor() {
    super(ERROR_MSG.NOT_FOUND, ERROR_TAG.NOT_FOUND);
  }
}

export class TxFetchUnknownError extends TxFetchError {
  public constructor() {
    super("Unknown Error", "");
  }
}

export class TxStatusError extends Error {
  public tag: string;
  protected constructor(message: string, tag: string) {
    super(message);
    this.tag = tag;
    this.name = this.constructor.name;
  }
}

export class InitError extends TxStatusError {
  public constructor() {
    super(ERROR_MSG.INIT, ERROR_TAG.INIT);
  }
}

export class ProxyError extends TxStatusError {
  public constructor() {
    super(ERROR_MSG.PROXY_CONTRACT, ERROR_TAG.PROXY_CONTRACT);
  }
}

export class FailError extends TxStatusError {
  public constructor() {
    super(ERROR_MSG.FAILED, ERROR_TAG.FAILED);
  }
}

export class UnsupportError extends TxStatusError {
  public constructor() {
    super(ERROR_MSG.UNSUPPORT, ERROR_TAG.UNSUPPORT);
  }
}

export class TxStatusUnknownError extends TxStatusError {
  public constructor() {
    super(ERROR_MSG.UNKNOWN, ERROR_TAG.UNKNOWN);
  }
}
