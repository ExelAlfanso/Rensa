import React from "react";
import Heading from "./Heading";
import Image from "next/image";
interface UploadPreviewProps {
  photo: string;
}

const UploadPreview: React.FC<UploadPreviewProps> = ({ photo }) => {
  return (
    <div>
      <Heading size="l">What it is about?</Heading>
      <Image
        src={photo}
        alt={"image"}
        width={400}
        height={300}
        className="rounded-3xl"
      ></Image>
    </div>
  );
};

export default UploadPreview;
