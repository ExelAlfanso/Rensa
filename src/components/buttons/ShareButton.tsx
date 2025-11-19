import React, { useEffect, useState } from "react";
import AccentButton from "./AccentButton";
import { useToast } from "@/providers/ToastProvider";
import { CheckIcon, LinkIcon } from "@phosphor-icons/react";
interface ShareButtonProps {
  userId: string;
}
const ShareButton: React.FC<ShareButtonProps> = ({ userId }) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setProfileUrl(`${window.location.origin}/profile/${userId}`);
  }, [userId]);

  const handleCopy = async () => {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      showToast("Link copied to clipboard!", "success");
    } catch (err) {
      showToast("Failed to copy link.", "error");
    }
  };
  return (
    <AccentButton onClick={handleCopy}>
      {copied ? (
        <>
          <CheckIcon className="mr-2 h-4 w-4" /> Copied!
        </>
      ) : (
        <>
          <LinkIcon className="mr-2 h-4 w-4" /> Share
        </>
      )}
    </AccentButton>
  );
};

export default ShareButton;
