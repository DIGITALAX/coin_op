import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
import getDefaultProfile from "../../../../graphql/lens/queries/getDefaultProfile";
import generateChallenge from "../../../../graphql/lens/queries/generateChallenge";
import authenticate from "../../../../graphql/lens/mutations/authenticate";
import {
  getAddress,
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAddress,
  setAuthenticationToken,
} from "../../../../lib/lens/utils";
import { setProfile } from "../../../../redux/reducers/profileSlice";
import { setNoHandle } from "../../../../redux/reducers/noHandleSlice";
import { Profile } from "../types/generated";
import { setWalletConnected } from "../../../../redux/reducers/walletConnectedSlice";

const useSignIn = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  const { signMessageAsync } = useSignMessage();

  const handleLensSignIn = async (): Promise<void> => {
    setSignInLoading(true);
    try {
      const profile = await getDefaultProfile({
        for: address,
      });
      const challengeResponse = await generateChallenge({
        for: profile.data?.defaultProfile?.id,
        signedBy: address,
      });
      const signature = await signMessageAsync({
        message: challengeResponse.data?.challenge.text!,
      });
      const accessTokens = await authenticate({
        id: challengeResponse.data?.challenge.id,
        signature: signature,
      });
      if (accessTokens) {
        setAuthenticationToken({ token: accessTokens.data?.authenticate! });
        setAddress(address as string);

        if (profile?.data?.defaultProfile) {
          dispatch(setProfile(profile?.data?.defaultProfile as Profile));
        } else {
          dispatch(setNoHandle(true));
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setSignInLoading(false);
  };

  const handleRefreshProfile = async (): Promise<void> => {
    try {
      const profile = await getDefaultProfile({
        for: address,
      });
      if (profile?.data?.defaultProfile) {
        dispatch(setProfile(profile?.data?.defaultProfile as Profile));
      } else {
        removeAuthenticationToken();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      dispatch(setWalletConnected(isConnected));
      const newAddress = getAddress();

      if (
        (newAddress && newAddress?.replace(/^"|"$/g, "") === address) ||
        (!newAddress && address)
      ) {
        const token = getAuthenticationToken();
        setAddress(address as string);
        if (isConnected && !token) {
          dispatch(setProfile(undefined));
          removeAuthenticationToken();
        } else if (isConnected && token) {
          if (isAuthExpired(token?.exp)) {
            const refreshedAccessToken = await refreshAuth(); // await the refreshAuth promise
            if (!refreshedAccessToken) {
              dispatch(setProfile(undefined));
              removeAuthenticationToken();
            }
          }
          await handleRefreshProfile(); // await the handleRefreshProfile promise
        }
      } else if (isConnected && address !== newAddress) {
        dispatch(setProfile(undefined));
        removeAuthenticationToken();
      }
    };

    handleAuthentication();
  }, [isConnected]);

  return {
    handleLensSignIn,
    handleRefreshProfile,
    signInLoading,
  };
};

export default useSignIn;
