import { INFURA_GATEWAY } from "../../constants";
import {
  NftImage,
  ProfilePicture,
  Maybe,
} from "@/components/Common/types/generated";

const createProfilePicture = (
  publication: Maybe<ProfilePicture> | undefined
): string => {
  let profileImage: string;

  if (!publication) {
    return "";
  }

  if (publication?.__typename === "ImageSet") {
    if (publication?.raw?.uri) {
      profileImage = `${INFURA_GATEWAY}/ipfs/${
        publication?.raw?.uri?.split("ipfs://")[1]
      }`;
    } else {
      profileImage = publication?.optimized?.uri;
    }
  } else {
    if ((publication as NftImage)?.image?.raw?.uri) {
      profileImage = `${INFURA_GATEWAY}/ipfs/${
        (publication as NftImage)?.image?.raw?.uri?.split("ipfs://")[1]
      }`;
    } else {
      profileImage = (publication as NftImage)?.image?.optimized?.uri;
    }
  }

  return profileImage;
};

export default createProfilePicture;
