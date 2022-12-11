/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

import { findTransactionChain } from "../../util/api";
import { FindChainApiResponse } from "../../util/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<FindChainApiResponse>
) => {
  const { txHash } = req.query;
  const result = await findTransactionChain(txHash as string);

  res.status(200).send({
    result,
  });
};
