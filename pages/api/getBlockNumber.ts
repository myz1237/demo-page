/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import { getBlockNumberApiResponse } from "../../util/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<getBlockNumberApiResponse>
) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://poly-archival.gateway.pokt.network/v1/lb/62320b66b2feb2003985a7cd"
  );

  const number = await provider.getBlockNumber();

  res.status(200).send({
    number,
  });
};
