import { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import QuestStats from "@/components/Quests/modules/QuestStats";
import QuestList from "@/components/Quests/modules/QuestList";
import Countdown from "react-countdown";

const Quests: NextPage = (): JSX.Element => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div className="relative w-full h-fit flex font-vcr text-white text-2xl items-center justify-center">
        {days}:{hours}:{minutes}:{seconds}
      </div>
    );
  };
  return (
    <div className="relative w-full h-full flex flex-col gap-14">
      <Head>
        <title>Coin Op | Quests</title>
        <meta name="og:url" content="https://coin.manufactory.xyz/" />
        <meta name="og:title" content="Coin Op | Quests" />
        <meta name="og:description" content="" />
        <meta
          name="og:image"
          content="https://coin.manufactory.xyz/card.png/"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="og:url" content="https://coin.manufactory.xyz/" />
        <meta
          name="og:image"
          content="https://coin.manufactory.xyz/card.png/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@digitalax_" />
        <meta name="twitter:creator" content="@digitalax_" />
        <meta
          name="twitter:image"
          content="https://coin.manufactory.xyz/card.png/"
        />
        <meta name="twitter:url" content="https://coin.manufactory.xyz/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://coin.manufactory.xyz/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/MegamaxJones.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/Vcr.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/MonumentExtendedR.otf"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
        />
        <link
          rel="preload"
          href="/fonts/AquaticoRegular.otf"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
        />
        <link
          rel="preload"
          href="/fonts/SatoshiRegular.otf"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
        />
        <link
          rel="preload"
          href="/fonts/SatoshiBlack.otf"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
        />
        <link
          rel="preload"
          href="/fonts/HermanoAltoStamp.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/Manaspace.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
      </Head>
      <div className="absolute hidden 900:flex w-full h-full">
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmeDoviUgzhon6Gub8Wd1dA7tnmZTENxKwaoZwfpwTnQYT`}
          layout="fill"
          draggable={false}
        />
      </div>
      <div className="relative w-full h-fit flex flex-col 900:flex-row justify-between items-center">
        <div className="relative w-fit h-fit flex flex-col 900:flex-row justify-between gap-10 items-center">
          <div className="relative w-32 h-40 flex items-center 900:items-start justify-center">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmP33sc2h98AGoKGjwayvk7GLBtKkB9CeZ7SeTBfNk3SNb`}
              layout="fill"
              draggable={false}
            />
          </div>
          <div className="relative text-center 900:text-left w-full 900:w-32 before:w-52 xl:w-28 synth:w-40 h-fit text-white font-vcr text-lg xl:text-base synth:text-lg break-words xl:break-all synth:break-words">
            Collect <p className="text-eme">API Synth Keys </p> to operate Coin
            Op.
            <br />
            <br />
            All new creators start at Level 0. Unlock quests to level up.
          </div>
        </div>
        <div className="relative w-full justify-center items-center h-60 flex 900:pl-3 xl:pt-0 pt-10 900:pt-3">
          <div className="relative flex items-center justify-center w-5/6 sm:w-[70%] before:w-[85%] xl:w-[70%] synth:w-[87%] h-full bg-black border border-white rounded-md">
            <Image
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              src={`${INFURA_GATEWAY}/ipfs/QmVYuYUAJfE9UQH6opwpFAEV3oj8qu6bewfEotPtDqv7y3`}
              draggable={false}
            />
            <div className="absolute w-fit sm:w-48 h-fit sm:h-28 rounded-md border border-mist justify-between right-3 top-2 bg-black/80 flex flex-col p-2 break-words items-center break-all">
              <div className="relative w-fit h-fit flex items-center justify-center font-vcr text-ama text-xs flex-row gap-1">
                <p className="flex items-center justify-center">
                  Don&apos;t have
                </p>
                <p className="text-eme flex items-center justify-center">
                  {" "}
                  API Keys{" "}
                </p>
                <p className="flex items-center justify-center"> yet?</p>
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center font-vcr text-white text-xs">
                Next Quest Launching In:
              </div>
              <div className="relative w-full h-fit flex items-center justify-center">
                <Countdown date={new Date(2023, 7, 30)} renderer={renderer} />
              </div>
              <div className="relative w-full h-fit items-center justify-center flex flex-row justify-between gap-1.5 font-vcr text-xxs text-white">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  days
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  hours
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  mins
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  secs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuestStats />
      <QuestList />
    </div>
  );
};

export default Quests;