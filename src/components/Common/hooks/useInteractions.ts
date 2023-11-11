import { useEffect, useState } from "react";
import { FetchResult } from "@apollo/client";
import {
  getPublications,
  getPublicationsAuth,
} from "../../../../graphql/lens/queries/getPublications";
import {
  PublicationsQuery,
  Comment,
  CommentRankingFilterType,
  LimitType,
  Profile,
} from "../types/generated";
import { MainVideoState } from "../../../../redux/reducers/mainVideoSlice";
import { IndexModalState } from "../../../../redux/reducers/indexModalSlice";

const useInteractions = (
  profile: Profile | undefined,
  mainVideo: MainVideoState,
  commentId: string | undefined,
  index: IndexModalState
) => {
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [paginated, setPaginated] = useState<any>();
  const [commentors, setCommentors] = useState<Comment[]>([]);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  const getPostComments = async (): Promise<void> => {
    setCommentsLoading(true);
    try {
      let comments: FetchResult<PublicationsQuery>;

      if (profile?.id) {
        comments = await getPublicationsAuth({
          where: {
            commentOn: {
              id: commentId !== "" ? commentId : mainVideo.id,
              ranking: {
                filter: CommentRankingFilterType.Relevant,
              },
            },
          },
          limit: LimitType.TwentyFive,
        });
      } else {
        comments = await getPublications({
          where: {
            commentOn: {
              id: commentId !== "" ? commentId : mainVideo.id,
              ranking: {
                filter: CommentRankingFilterType.Relevant,
              },
            },
          },
          limit: LimitType.TwentyFive,
        });
      }
      if (!comments || !comments?.data || !comments?.data?.publications) {
        setCommentsLoading(false);
        return;
      }
      const sortedArr: Comment[] = [
        ...comments?.data?.publications?.items,
      ] as Comment[];
      if (sortedArr?.length < 25) {
        setHasMoreComments(false);
      } else {
        setHasMoreComments(true);
      }
      setCommentors(sortedArr);
      setPaginated(comments?.data?.publications?.pageInfo);
    } catch (err: any) {
      console.error(err.message);
    }
    setCommentsLoading(false);
  };

  const getMorePostComments = async (): Promise<void> => {
    try {
      if (!paginated?.next) {
        // fix apollo duplications on null next
        setHasMoreComments(false);
        return;
      }
      let comments: FetchResult<PublicationsQuery>;
      if (profile?.id) {
        comments = await getPublicationsAuth({
          where: {
            commentOn: {
              id: commentId !== "" ? commentId : mainVideo.id,
              ranking: {
                filter: CommentRankingFilterType.Relevant,
              },
            },
          },
          limit: LimitType.TwentyFive,
          cursor: paginated?.next,
        });
      } else {
        comments = await getPublications({
          where: {
            commentOn: {
              id: commentId !== "" ? commentId : mainVideo.id,
              ranking: {
                filter: CommentRankingFilterType.Relevant,
              },
            },
          },
          limit: LimitType.TwentyFive,
          cursor: paginated?.next,
        });
      }
      if (
        !comments ||
        !comments?.data ||
        !comments?.data?.publications ||
        comments?.data?.publications?.items?.length < 1
      ) {
        setHasMoreComments(false);
        setCommentsLoading(false);
        return;
      }
      const sortedArr: Comment[] = [
        ...comments?.data?.publications?.items,
      ] as Comment[];
      if (sortedArr?.length < 25) {
        setHasMoreComments(false);
      }
      setCommentors([...commentors, ...sortedArr]);
      setPaginated(comments?.data?.publications?.pageInfo);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (mainVideo.id) {
      getPostComments();
    }
  }, [mainVideo.id, profile?.id, commentId]);
  useEffect(() => {
    if (index.message === "Successfully Indexed") {
      getPostComments();
    }
  }, [index.message]);

  return {
    commentors,
    getMorePostComments,
    commentsLoading,
    hasMoreComments,
    commentsOpen,
    setCommentsOpen,
  };
};

export default useInteractions;
