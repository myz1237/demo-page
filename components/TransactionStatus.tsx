import { StatusResponse } from "@lifi/types";
import { Divider, List } from "@mantine/core";

import { chainIdToChainFullName } from "../util/const";
import { capitalizeFirstLetter } from "../util/utils";

const TrasactionStatus = ({ status }: { status: StatusResponse }) => {
  return (
    <List>
      <Divider my={"sm"}></Divider>
      <List.Item>Status: {capitalizeFirstLetter(status.status)}</List.Item>
      <Divider my={"sm"}></Divider>
      {status.substatus ? (
        <List.Item>
          Substatus:{" "}
          {capitalizeFirstLetter(status.substatus.replaceAll("_", " "))}
        </List.Item>
      ) : (
        <div></div>
      )}
      <Divider my={"sm"}></Divider>
      <List.Item>
        From Chain: {chainIdToChainFullName[status.sending.chainId!]}
      </List.Item>
      <Divider my={"sm"}></Divider>
      <List.Item>
        To Chain:{" "}
        {status.receiving?.chainId
          ? chainIdToChainFullName[status.receiving.chainId!]
          : "Undetermined"}
      </List.Item>
      <Divider my={"sm"}></Divider>
      <List.Item>
        From Chain Hash:{" "}
        <a href={status.sending.txLink}>{status.sending.txHash}</a>
      </List.Item>
    </List>
  );
};

export default TrasactionStatus;
