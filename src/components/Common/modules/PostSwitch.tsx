import { FunctionComponent } from "react";
import {
  ArticleMetadataV3,
  ImageMetadataV3,
  Post,
  Quote,
  StoryMetadataV3,
  TextOnlyMetadataV3,
} from "../types/generated";
import Text from "./Text";
import Media from "./Media";
import { PostSwitchProps } from "../types/common.types";

const PostSwitch: FunctionComponent<PostSwitchProps> = ({
  item,
  dispatch,
  disabled,
}): JSX.Element => {
  switch (
    item?.__typename === "Mirror"
      ? item?.mirrorOn?.metadata?.__typename
      : (item as Post | Quote)?.metadata?.__typename
  ) {
    case "ArticleMetadataV3":
    case "TextOnlyMetadataV3":
    case "StoryMetadataV3":
      return (
        <Text
          metadata={
            (item?.__typename === "Mirror"
              ? item?.mirrorOn?.metadata
              : (item as Post)?.metadata) as
              | ArticleMetadataV3
              | StoryMetadataV3
              | TextOnlyMetadataV3
          }
        />
      );

    default:
      return (
        <Media
          metadata={
            (item?.__typename === "Mirror"
              ? item?.mirrorOn?.metadata
              : (item as Post)?.metadata) as ImageMetadataV3
          }
          dispatch={dispatch}
          disabled={disabled}
        />
      );
  }
};

export default PostSwitch;
