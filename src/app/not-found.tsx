"use client";
import Footer from "@/components/footer/Footer";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import IconButton from "@/components/buttons/IconButton";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <div className="relative flex flex-col justify-between min-h-screen bg-white text-black rounded-b-3xl">
        <Image
          src="/images/not-found/not-found.png"
          alt="Not found"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute inset-0 w-full xl:w-[75%] h-auto mx-auto object-contain self-end "
        />
        <Image
          src="/images/not-found/pic.png"
          alt="Not found"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-20 right-20 xl:size-auto"
        />
        <Image
          src="/images/not-found/pic2.png"
          alt="Not found"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 size-auto "
        />

        <div className="absolute flex flex-col items-center justify-center flex-1 w-full gap-8 px-6 py-12 top-10 md:flex-row text-primary md:text-left">
          <h1 className="text-[120px] md:text-[240px] font-sans font-bold leading-none">
            404
          </h1>
          <div className="flex flex-col items-center space-y-4 text-center xl:text-left xl:items-start w-60 xl:w-85">
            <h1 className="text-[28px] md:text-[38px] font-forum">
              you&apos;ve reached an empty zone
            </h1>
            <Text size="m">
              The page you&apos;re looking for might have been moved, renamed,
              or no longer exists.
            </Text>
            <Link href={"/"}>
              <IconButton
                weight={"bold"}
                Icon={ArrowRightIcon}
                iconPosition={"right"}
                className="h-12"
              >
                <p className="font-figtree font-normal text-[12px]">
                  Return to Homepage
                </p>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
