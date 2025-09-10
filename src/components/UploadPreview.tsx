import React from "react";
import Heading from "./Heading";
import Image from "next/image";
interface UploadPreviewProps {
  photo: string;
}

const UploadPreview: React.FC<UploadPreviewProps> = ({ photo }) => {
  return (
    <div>
      <Heading size="l" alignment="left">
        What it is about?
      </Heading>
      <Image
        src={photo}
        alt={"image"}
        width={1200}
        height={900}
        className="max-w-3/4 h-auto rounded-3xl"
      ></Image>
    </div>
  );
};

export default UploadPreview;
