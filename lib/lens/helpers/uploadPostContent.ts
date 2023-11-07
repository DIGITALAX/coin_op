import {
  PostImage,
  UploadedMedia,
} from "@/components/Common/types/common.types";
import { PublicationMetadataMainFocusType } from "@/components/Common/types/generated";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

const uploadPostContent = async (
  postImages: UploadedMedia[] | undefined,
  postDescription: string,
  setContentURI: (e: string | undefined) => void,
  contentURI: string | undefined
): Promise<string | undefined> => {
  let $schema: string,
    mainContentFocus: PublicationMetadataMainFocusType,
    value;

  let newImages: PostImage[] = [];
  postImages?.forEach((image) => {
    newImages.push({
      item: image.type !== 2 ? "ipfs://" + image.cid : image.cid,
      type:
        image.type === 1
          ? "image/png"
          : image.type === 2
          ? "image/gif"
          : "video/mp4",
      altTag: image.cid,
    });
  });

  const videos = lodash.filter(newImages, (image: PostImage) => {
    if (image.type === "video/mp4") return true;
  });

  if (postImages && postImages?.length < 1) {
    if (postDescription?.length > 270) {
      $schema = "https://json-schemas.lens.dev/publications/text/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.TextOnly;
    } else {
      $schema = "https://json-schemas.lens.dev/publications/article/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Article;
    }
  } else {
    if (videos?.length > 0) {
      $schema = "https://json-schemas.lens.dev/publications/video/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Video;
      value = {
        image: newImages?.find((item) => item.type !== "video/mp4"),
        attachments: newImages,
      };
    } else {
      $schema = "https://json-schemas.lens.dev/publications/image/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Image;
      value = {
        video: videos[0],
        attachments: videos,
      };
    }
  }

  try {
    const response = await fetch("/api/ipfs", {
      method: "POST",
      body: JSON.stringify({
        $schema,
        lens: {
          mainContentFocus,
          title: postDescription ? postDescription?.slice(0, 20) : "Chromadin",
          content:
            postDescription.length < 0 || postDescription.trim().length < 0
              ? null
              : postDescription,
          ...value,
          appId: "chromadin",
          id: uuidv4(),
          hideFromFeed: false,
          locale: "en",
        },
      }),
    });
    if (response.status !== 200) {
    } else {
      let responseJSON = await response.json();
      setContentURI(responseJSON.cid);
      return responseJSON.cid;
    }
  } catch (err: any) {
    console.error(err.message);
  }
  return contentURI;
};

export default uploadPostContent;
