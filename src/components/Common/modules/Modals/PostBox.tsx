import {
  ClipboardEvent,
  FormEvent,
  FunctionComponent,
  KeyboardEvent,
} from "react";
import { ImCross } from "react-icons/im";
import Image from "next/legacy/image";
import { AiOutlineLoading } from "react-icons/ai";
import { PostBoxProps } from "../../types/common.types";
import { INFURA_GATEWAY } from "../../../../../lib/constants";
import createProfilePicture from "../../../../../lib/lens/helpers/createProfilePicture";
import syncScroll from "../../../../../lib/lens/helpers/syncScroll";
import { setModalOpen } from "../../../../../redux/reducers/modalOpenSlice";
import { setLensPostBox } from "../../../../../redux/reducers/lensPostBoxSlice";
import OptionsComment from "../Lens/OptionsComment";
import CollectButton from "../Lens/CollectButton";
import CollectInput from "../Lens/CollectInput";
import ImageUploads from "../Lens/ImageUploads";
import { setCollectOpen } from "../../../../../redux/reducers/collectOpenSlice";

const PostBox: FunctionComponent<PostBoxProps> = ({
  dispatch,
  postLoading,
  handlePostDescription,
  mappedFeaturedFiles,
  postImagesDispatched,
  handleRemoveImage,
  handleGifSubmit,
  handleGif,
  results,
  gifOpen,
  collectible,
  limitedEdition,
  chargeCollect,
  chargeCollectDropDown,
  setChargeCollect,
  setChargeCollectDropDown,
  handleSetGif,
  audienceTypes,
  collectOpen,
  setLimitedDropDown,
  limitedDropDown,
  audienceDropDown,
  audienceType,
  setAudienceDropDown,
  setAudienceType,
  setEnabledCurrency,
  enabledCurrencies,
  enabledCurrency,
  setCollectibleDropDown,
  setCollectible,
  collectibleDropDown,
  setTimeLimitDropDown,
  timeLimit,
  timeLimitDropDown,
  setTimeLimit,
  setLimitedEdition,
  currencyDropDown,
  setCurrencyDropDown,
  limit,
  setLimit,
  value,
  setValue,
  referral,
  setReferral,
  handleKeyDownDelete,
  postDescription,
  textElement,
  mentionProfiles,
  caretCoord,
  profilesOpen,
  handleMentionClick,
  videoLoading,
  imageLoading,
  uploadVideo,
  uploadImages,
  setGifOpen,
  collectNotif,
  handlePost,
  preElement,
  handleImagePaste,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-20 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-[80vw] preG:w-[70vw] sm:w-[50vw] h-fit col-start-1 place-self-center rounded-lg bg-oscurazul">
        <div className="relative w-full row-start-2 h-fit rounded-xl grid grid-flow-col auto-cols-auto">
          <div className="relative w-full h-full col-start-1 rounded-xl place-self-center">
            <div className="relative w-full h-full grid grid-flow-row auto-rows-auto gap-4 pb-2">
              <div className="relative w-fit h-fit row-start-1 self-center justify-self-end pr-5 pt-5 cursor-pointer">
                <ImCross
                  color="white"
                  size={15}
                  onClick={() => {
                    dispatch(setLensPostBox(false));
                    dispatch(setCollectOpen(false));
                    setGifOpen(false);
                    // dispatch(setPostImages([]));
                  }}
                />
              </div>
              <div className="relative w-full min-h-60 h-fit flex flex-col">
                <div className="relative w-full h-full px-4 pb-4 flex flex-col gap-3">
                  {(mappedFeaturedFiles?.length !== 0 ||
                    postImagesDispatched?.length !== 0) && (
                    <ImageUploads
                      handleRemoveImage={handleRemoveImage}
                      commentLoading={postLoading}
                      postImagesDispatched={postImagesDispatched}
                    />
                  )}
                  {gifOpen ? (
                    <div className="relative w-full h-full grid grid-flow-row auto-rows-auto overflow-y-scroll">
                      <div className="relative w-full h-fit flex flex-row gap-2">
                        <input
                          className={`relative row-start-1 col-start-1 h-10 bg-black border border-white font-mana text-white p-2 rounded-md caret-transparent w-full text-sm`}
                          name="gif"
                          onChange={(e: FormEvent) => handleGif(e)}
                        />
                        <div
                          className="relative w-20 border border-white flex items-center text-center justify-center text-white font-mana rounded-md cursor-pointer active:scale-95"
                          onClick={() => handleGifSubmit()}
                        >
                          Search
                        </div>
                      </div>
                      {results?.length !== 0 && (
                        <div className="relative w-full h-full flex flex-row flex-wrap justify-center overflow-y-scroll gap-2 pt-3">
                          {results?.map((result: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="relative w-16 h-12 bg-white cursor-pointer active:scale-95 place-self-center"
                                onClick={() =>
                                  handleSetGif(result?.media_formats?.gif?.url)
                                }
                              >
                                <Image
                                  layout="fill"
                                  objectFit="cover"
                                  src={result?.media_formats?.gif?.url}
                                  draggable={false}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : collectOpen ? (
                    <div className="relative w-full h-full flex overflow-y-scroll items-center justify-center flex-col">
                      <div className="relative w-full h-full flex flex-wrap gap-10 flex-row">
                        <div className="relative w-full h-fit flex flex-col flex-wrap justify-start items-start gap-3 break-words">
                          <div className="relative flex flex-col preG:flex-row">
                            <CollectButton
                              col={"1"}
                              row={"1"}
                              selectFunction={setCollectible}
                              openDropdown={collectibleDropDown}
                              handleOpenDropdown={setCollectibleDropDown}
                              selectValue={collectible}
                              label={"Collectible?"}
                            />
                            {collectible === "yes" && (
                              <CollectButton
                                col={"1"}
                                row={"1"}
                                values={audienceTypes}
                                selectFunction={setAudienceType}
                                openDropdown={audienceDropDown}
                                handleOpenDropdown={setAudienceDropDown}
                                selectValue={audienceType}
                                label={"Who can collect?"}
                              />
                            )}
                            {collectible === "yes" && (
                              <CollectButton
                                col={"1"}
                                row={"1"}
                                selectFunction={setChargeCollect}
                                openDropdown={chargeCollectDropDown}
                                handleOpenDropdown={setChargeCollectDropDown}
                                selectValue={chargeCollect}
                                label={"Creator award?"}
                              />
                            )}
                          </div>
                          <div className="relative flex flex-col preG:flex-row">
                            {collectible === "yes" &&
                              chargeCollect === "yes" && (
                                <CollectButton
                                  col={"1"}
                                  row={"1"}
                                  selectFunction={setTimeLimit}
                                  openDropdown={timeLimitDropDown}
                                  handleOpenDropdown={setTimeLimitDropDown}
                                  selectValue={timeLimit}
                                  label={"24 Hour Collect"}
                                />
                              )}
                            {collectible === "yes" && (
                              <CollectButton
                                col={"1"}
                                row={"1"}
                                selectFunction={setLimitedEdition}
                                openDropdown={limitedDropDown}
                                handleOpenDropdown={setLimitedDropDown}
                                selectValue={limitedEdition}
                                label={"Limited edition?"}
                              />
                            )}
                            {collectible === "yes" &&
                              limitedEdition === "yes" && (
                                <CollectInput
                                  min="1"
                                  step="1"
                                  defaultValue={limit.toString()}
                                  placeholder={limit.toString()}
                                  id="collectLimit"
                                  label="Edition Amount"
                                  name="collectLimit"
                                  col={"1"}
                                  row={"1"}
                                  handleValueChange={setLimit}
                                />
                              )}
                          </div>
                          <div className="relative flex flex-col preG:flex-row w-full">
                            {collectible === "yes" &&
                              chargeCollect === "yes" && (
                                <CollectButton
                                  col={"1"}
                                  row={"1"}
                                  values={enabledCurrencies}
                                  selectFunction={setEnabledCurrency}
                                  openDropdown={currencyDropDown}
                                  handleOpenDropdown={setCurrencyDropDown}
                                  selectValue={enabledCurrency}
                                  label={"Award currency"}
                                />
                              )}
                            {collectible === "yes" &&
                              chargeCollect === "yes" && (
                                <CollectInput
                                  min="0"
                                  defaultValue={value.toString()}
                                  placeholder={value.toString()}
                                  id="valueAmount"
                                  label="Award amount"
                                  name="valueAmount"
                                  col={"1"}
                                  row={"1"}
                                  step="0.01"
                                  handleValueChange={setValue}
                                />
                              )}
                            {collectible === "yes" &&
                              chargeCollect === "yes" && (
                                <CollectInput
                                  min="0"
                                  defaultValue={referral.toString()}
                                  placeholder={referral.toString()}
                                  id="referral"
                                  label="Mirrored posts (%)"
                                  name="referral"
                                  col={"1"}
                                  row={"1"}
                                  step="0.1"
                                  handleValueChange={setReferral}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full p-px rounded-md">
                      <div className="relative w-full h-40 border border-white p-px rounded-md grid grid-flow-col auto-cols-auto">
                        <textarea
                          id="post"
                          onScroll={(e: any) =>
                            syncScroll(textElement, preElement)
                          }
                          onInput={(e: FormEvent) => {
                            handlePostDescription(e);
                            syncScroll(textElement, preElement);
                          }}
                          onKeyDown={(e: KeyboardEvent<Element>) =>
                            handleKeyDownDelete(e)
                          }
                          style={{ resize: "none" }}
                          className="relative w-full h-full bg-black font-mana text-white p-2 z-1 rounded-lg overflow-y-scroll"
                          ref={textElement}
                          value={postDescription}
                          disabled={postLoading ? true : false}
                          onPaste={(e: ClipboardEvent<HTMLTextAreaElement>) =>
                            handleImagePaste(e)
                          }
                        ></textarea>
                        <pre
                          id="highlighting"
                          className={`absolute w-full h-full bg-black font-mana text-white p-2 rounded-lg overflow-y-auto`}
                          ref={preElement}
                        >
                          <code
                            id="highlighted-content"
                            className={`w-full h-full place-self-center text-left whitespace-pre-wrap overflow-y-auto z-0`}
                          >
                            Have Something to Say?
                          </code>
                        </pre>
                        {mentionProfiles?.length > 0 && profilesOpen && (
                          <div
                            className={`absolute w-44 max-h-28 h-fit flex flex-col overflow-y-auto items-start justify-start z-2 rounded-sm border-x border-white`}
                            style={{
                              top: caretCoord.y + 30,
                              left: caretCoord.x,
                            }}
                          >
                            {mentionProfiles?.map(
                              (user: any, index: number) => {
                                const profileImage: string =
                                  createProfilePicture(user);
                                return (
                                  <div
                                    key={index}
                                    className={`relative w-full h-fit px-3 py-2 bg-black flex flex-row gap-3 cursor-pointer items-center justify-center border-b border-white hover:bg-ama/70 z-2`}
                                    onClick={() => {
                                      handleMentionClick(user);
                                    }}
                                  >
                                    <div className="relative flex flex-row w-full h-full text-white font-mana lowercase place-self-center gap-2">
                                      <div
                                        className={`relative rounded-full flex bg-white w-3 h-3 items-center justify-center col-start-1`}
                                        id="crt"
                                      >
                                        {profileImage !== "" && (
                                          <Image
                                            src={profileImage}
                                            objectFit="cover"
                                            alt="pfp"
                                            layout="fill"
                                            className="relative w-fit h-fit rounded-full items-center justify-center flex"
                                            draggable={false}
                                          />
                                        )}
                                      </div>
                                      <div className="relative col-start-2 items-center justify-center w-fit h-fit text-xs flex">
                                        @{user?.handle?.split(".lens")[0]}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="relative w-full h-fit preG:h-12 flex flex-row items-center gap-3 flex-wrap preG:flex-nowrap">
                    <div className="relative w-fit h-fit flex flex-row items-center gap-2 justify-start">
                      <OptionsComment
                        videoLoading={videoLoading}
                        imageLoading={imageLoading}
                        commentLoading={postLoading}
                        uploadImages={uploadImages}
                        uploadVideo={uploadVideo}
                        setGifOpen={setGifOpen}
                        gifOpen={gifOpen}
                        collectOpen={collectOpen}
                        postImages={postImagesDispatched}
                        dispatch={dispatch}
                      />
                    </div>
                    <div className="relative w-full h-fit justify-end flex flex-row gap-2 items-center">
                      <div className="relative w-24 min-w-fit h-10 border-white border rounded-md py-2 px-4 flex items-center cursor-pointer active:scale-95 hover:bg-ama justify-center">
                        <div
                          className={`relative w-full h-full flex text-white font-mana items-center text-center justify-center ${
                            postLoading && "animate-spin"
                          }`}
                          onClick={
                            collectNotif !== ""
                              ? () =>
                                  dispatch(
                                    setModalOpen({
                                      actionOpen: true,
                                      actionMessage: collectNotif,
                                    })
                                  )
                              : () => handlePost()
                          }
                        >
                          {postLoading ? (
                            <AiOutlineLoading size={10} color="white" />
                          ) : (
                            "SEND IT"
                          )}
                        </div>
                      </div>
                      <Image
                        alt="gear"
                        src={`${INFURA_GATEWAY}/ipfs/QmY72fgrYJvDrc8iDSYRiyTpdsxbPMbPk7hxT2jrH9jrXJ`}
                        width={15}
                        height={15}
                        className="relative w-7 h-7 flex justify-end"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
