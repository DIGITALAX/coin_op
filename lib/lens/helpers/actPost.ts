import { AnyAction, Dispatch } from "redux";
import { collectPost } from "../../../graphql/lens/mutations/collect";
import { omit } from "lodash";
import { WalletClient, PublicClient } from "viem";
import broadcast from "../../../graphql/lens/mutations/broadcast";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";
import { LENS_HUB_PROXY_ADDRESS_MATIC } from "../../constants";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { polygon } from "viem/chains";
import { setInsufficientBalance } from "../../../redux/reducers/insufficientBalanceSlice";
import { ActOnOpenActionInput } from "@/components/Common/types/generated";
import { setIndexModal } from "../../../redux/reducers/indexModalSlice";

const actPost = async (
  pubId: string,
  actOn: ActOnOpenActionInput,
  dispatch: Dispatch<AnyAction>,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient
): Promise<boolean | void> => {
  try {
    const { data } = await collectPost({
      for: pubId,
      actOn,
    });

    const typedData = data?.createActOnOpenActionTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Act",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    const broadcastResult = await broadcast({
      id: data?.createActOnOpenActionTypedData?.id,
      signature,
    });

    if (
      broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess"
    ) {
      await handleIndexCheck(
        {
          forTxId: broadcastResult?.data?.broadcastOnchain.txId,
        },
        dispatch
      );
    } else {
      const { request } = await publicClient.simulateContract({
        address: LENS_HUB_PROXY_ADDRESS_MATIC,
        abi: LensHubProxy,
        functionName: "act",
        chain: polygon,
        args: [
          {
            publicationActedProfileId:
              typedData?.value.publicationActedProfileId,
            publicationActedId: typedData?.value.publicationActedId,
            actorProfileId: typedData?.value.actorProfileId,
            referrerProfileIds: typedData?.value.referrerProfileIds,
            referrerPubIds: typedData?.value.referrerPubIds,
            actionModuleAddress: typedData?.value.actionModuleAddress,
            actionModuleData: typedData?.value.actionModuleData,
          },
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      const tx = await publicClient.waitForTransactionReceipt({ hash: res });

      dispatch(
        setIndexModal({
          actionOpen: true,
          actionMessage: "Indexing Collect",
        })
      );

      await handleIndexCheck(
        {
          forTxHash: tx.transactionHash,
        },
        dispatch
      );

      dispatch(
        setIndexModal({
          actionOpen: false,
          actionMessage: undefined,
        })
      );
    }
    return true;
  } catch (err: any) {
    dispatch(
      setInsufficientBalance({
        actionMessage:
          "There was an issue estimating the tx gas. Try reducing the number of tokens you collect at once!",
        actionValue: true,
      })
    );
    console.error(err.message);
  }
};

export default actPost;
