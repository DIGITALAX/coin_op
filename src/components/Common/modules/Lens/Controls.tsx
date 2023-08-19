import Image from "next/image";
import { FormEvent, FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import lodash from "lodash";
import json from "./../../../../../public/videos/local.json";
import { INFURA_GATEWAY } from "../../../../../lib/constants";
import { setMainVideo } from "../../../../../redux/reducers/mainVideoSlice";
import { setVideoSync } from "../../../../../redux/reducers/videoSyncSlice";
import { ControlsProps } from "../../types/common.types";
import { setLogin } from "../../../../../redux/reducers/loginSlice";

const Controls: FunctionComponent<ControlsProps> = ({
  formatTime,
  volume,
  handleVolumeChange,
  volumeOpen,
  setVolumeOpen,
  handleHeart,
  collected,
  mirrored,
  liked,
  likeVideo,
  collectVideo,
  mirrorVideo,
  authStatus,
  profileId,
  likeLoading,
  mirrorLoading,
  collectLoading,
  mainVideo,
  progressRef,
  handleSeek,
  dispatchVideos,
  collectAmount,
  mirrorAmount,
  likeAmount,
  videoSync,
  dispatch,
  hasMore,
  fetchMoreVideos,
  videoLoading,
  setVideoLoading,
  handleLensSignIn,
  connected,
}): JSX.Element => {
  const currentIndex = lodash.findIndex(dispatchVideos, { id: mainVideo.id });
  return (
    <div
      className={`relative h-fit flex w-full gap-3 items-center px-2 justify-center flex-col`}
    >
      <div
        className={`relative w-fit h-full flex justify-center items-center gap-3`}
      >
        <div className="relative w-fit h-full flex items-center font-mana text-xxs text-white">
          <span className="text-rosa">{formatTime(videoSync.currentTime)}</span>
          /<span className="text-light">{formatTime(videoSync.duration)}</span>
        </div>
      </div>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div
          className="relative w-full h-2 bg-white/40 rounded-sm cursor-pointer"
          ref={progressRef}
          onClick={(e: any) => handleSeek(e)}
        >
          <div
            className="absolute h-full bg-white/80 rounded-sm"
            style={{
              width: `${(videoSync.currentTime / videoSync.duration) * 100}%`,
            }}
          />
        </div>
      </div>
      <div
        className={`relative w-full flex flex-row gap-3 items-center justify-center`}
      >
        <div className="relative flex flex-row w-fit h-fit gap-2 items-center justify-center">
          <div
            className={`cursor-pointer relative ${
              likeLoading && "animate-spin"
            }`}
            onClick={
              profileId && authStatus
                ? () => {
                    handleHeart();
                    likeVideo();
                  }
                : () => handleHeart()
            }
          >
            {likeLoading ? (
              <AiOutlineLoading size={12} color="white" />
            ) : liked ? (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/Qmc3KCKWRgN8iKwwAPM5pYkAYNeVwWu3moa5RDMDTBV6ZS`}
                width={12}
                height={12}
                alt="heart"
                draggable={false}
              />
            ) : (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmSX1Y5cKp8p53jv2CnfQBuhu3dgLANjZMTyAMKtgFtvV6`}
                width={12}
                height={12}
                alt="backward"
                draggable={false}
              />
            )}
          </div>
          <div className="relative w-fit h-fit font-mana text-white text-xxs">
            {likeAmount?.[currentIndex]}
          </div>
        </div>
        <div className="relative flex flex-row w-fit h-fit gap-2 items-center justify-center">
          <div
            className={`cursor-pointer relative ${
              collectLoading && "animate-spin"
            }`}
            onClick={
              profileId && authStatus
                ? () => collectVideo()
                : !connected
                ? () =>
                    dispatch(
                      setLogin({
                        actionOpen: true,
                        actionHighlight: "crypto",
                      })
                    )
                : connected && !profileId && !authStatus
                ? () => handleLensSignIn()
                : () => {}
            }
          >
            {collectLoading ? (
              <AiOutlineLoading size={12} color="white" />
            ) : collected ? (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmXG1mnHdBDXMzMZ9t1wE1Tqo8DRXQ1oNLUxpETdUw17HU`}
                width={12}
                height={12}
                alt="collect"
                draggable={false}
              />
            ) : (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmRGf1cz8h9bdw9VKp9zYXZoDfy15nRA1fKc7ARhxnRPwr`}
                width={12}
                height={12}
                alt="collect"
                draggable={false}
              />
            )}
          </div>
          <div className="relative w-fit h-fit font-mana text-white text-xxs">
            {collectAmount?.[currentIndex]}
          </div>
        </div>
        <div className="relative flex flex-row w-fit h-fit gap-2 items-center justify-center">
          <div
            className={`cursor-pointer relative ${
              mirrorLoading && "animate-spin"
            }`}
            onClick={
              profileId && authStatus
                ? () => mirrorVideo()
                : !connected
                ? () =>
                    dispatch(
                      setLogin({
                        actionOpen: true,
                        actionHighlight: "crypto",
                      })
                    )
                : connected && !profileId && !authStatus
                ? () => handleLensSignIn()
                : () => {}
            }
          >
            {mirrorLoading ? (
              <AiOutlineLoading size={12} color="white" />
            ) : mirrored ? (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmcMNSnbKvUfx3B3iHBd9deZCDf7E4J8W6UtyNer3xoMsB`}
                width={12}
                height={12}
                alt="mirror"
                draggable={false}
              />
            ) : (
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmXZi8e6UQaXm3BMMdsAUTnxoQSEr97nvuc19v7kBAgFsY`}
                width={12}
                height={12}
                alt="mirror"
                draggable={false}
              />
            )}
          </div>
          <div className="relative w-fit h-fit font-mana text-white text-xxs">
            {mirrorAmount?.[currentIndex]}
          </div>
        </div>
        <div
          className="relative cursor-pointer rotate-180"
          onClick={() =>
            dispatch(
              setMainVideo({
                actionCollected:
                  videoSync.collectedArray[
                    currentIndex === dispatchVideos.length - 1
                      ? 0
                      : currentIndex === 0
                      ? dispatchVideos.length - 1
                      : currentIndex - 1
                  ],
                actionLiked:
                  videoSync.likedArray[
                    currentIndex === dispatchVideos.length - 1
                      ? 0
                      : currentIndex === 0
                      ? dispatchVideos.length - 1
                      : currentIndex - 1
                  ],
                actionMirrored:
                  videoSync.mirroredArray[
                    currentIndex === dispatchVideos.length - 1
                      ? 0
                      : currentIndex === 0
                      ? dispatchVideos.length - 1
                      : currentIndex - 1
                  ],
                actionId:
                  dispatchVideos[
                    currentIndex === dispatchVideos.length - 1
                      ? 0
                      : currentIndex === 0
                      ? dispatchVideos.length - 1
                      : currentIndex - 1
                  ]?.id,
                actionLocal: `${
                  json[
                    currentIndex === dispatchVideos.length - 1
                      ? 0
                      : currentIndex === 0
                      ? dispatchVideos.length - 1
                      : currentIndex - 1
                  ]?.link
                }`,
              })
            )
          }
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmcYHKZJWJjgibox8iLqNozENnkgD4CZQqYsmmVJpoYUyo`}
            width={12}
            height={12}
            alt="backward"
            draggable={false}
          />
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() =>
            dispatch(
              setVideoSync({
                actionHeart: videoSync.heart,
                actionDuration: videoSync.duration,
                actionCurrentTime: videoSync.currentTime,
                actionIsPlaying: videoSync.isPlaying ? false : true,
                actionLikedArray: videoSync.likedArray,
                actionMirroredArray: videoSync.mirroredArray,
                actionCollectedArray: videoSync.collectedArray,
                actionVideosLoading: videoSync.videosLoading,
              })
            )
          }
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/${
              videoSync.isPlaying
                ? "Qmbg8t4xoNywhtCexD5Ln5YWvcKMXGahfwyK6UHpR3nBip"
                : "QmXw52mJFnzYXmoK8eExoHKv7YW9RBVEwSFtfvxXgy7sfp"
            }`}
            draggable={false}
            width={12}
            height={12}
            alt="play"
          />
        </div>
        <div
          className={`relative cursor-pointer ${
            videoLoading && "animate-spin"
          }`}
          onClick={
            hasMore &&
            (currentIndex + 1) % dispatchVideos?.length === 0 &&
            !videoLoading
              ? async () => {
                  setVideoLoading(true);
                  const more = await fetchMoreVideos();

                  dispatch(
                    setMainVideo({
                      actionCollected:
                        more?.collects[
                          (currentIndex + 1) % more?.videos?.length!
                        ],
                      actionLiked:
                        more?.likes[(currentIndex + 1) % more?.videos?.length!],
                      actionMirrored:
                        more?.mirrors[
                          (currentIndex + 1) % more?.videos?.length!
                        ],
                      actionId:
                        more?.videos[(currentIndex + 1) % more?.videos?.length!]
                          ?.id,
                      actionLocal: `${
                        json[(currentIndex + 1) % more?.videos?.length!]?.link
                      }`,
                    })
                  );
                  setVideoLoading(false);
                }
              : () =>
                  !videoLoading &&
                  dispatch(
                    setMainVideo({
                      actionCollected:
                        videoSync.collectedArray[
                          (currentIndex + 1) % dispatchVideos?.length
                        ],
                      actionLiked:
                        videoSync.likedArray[
                          (currentIndex + 1) % dispatchVideos?.length
                        ],
                      actionMirrored:
                        videoSync.mirroredArray[
                          (currentIndex + 1) % dispatchVideos?.length
                        ],
                      actionId:
                        dispatchVideos[
                          (currentIndex + 1) % dispatchVideos.length
                        ]?.id,
                      actionLocal: `${
                        json[(currentIndex + 1) % dispatchVideos?.length]?.link
                      }`,
                    })
                  )
          }
        >
          {videoLoading ? (
            <AiOutlineLoading color="white" size={12} />
          ) : (
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmcYHKZJWJjgibox8iLqNozENnkgD4CZQqYsmmVJpoYUyo`}
              width={12}
              height={12}
              alt="forward"
              draggable={false}
            />
          )}
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setVolumeOpen(!volumeOpen)}
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/${
              volume === 0
                ? "QmVVzvq68RwGZFi46yKEthuG6PXQf74BaMW4yCrZCkgtzK"
                : "Qme1i88Yd1x4SJfgrSCFyXp7GELCZRnnPQeFUt6jbfPbqL"
            }`}
            width={12}
            height={12}
            alt="volume"
            draggable={false}
          />
        </div>
        {volumeOpen && (
          <input
            className="absolute w-40 h-fit bottom-10"
            type="range"
            value={volume}
            max={1}
            min={0}
            step={0.1}
            onChange={(e: FormEvent) => handleVolumeChange(e)}
          />
        )}
      </div>
    </div>
  );
};

export default Controls;
