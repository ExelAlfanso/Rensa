import { useEffect, useState, useCallback } from "react";
import {
  addPhotoToRoll,
  removePhotoFromRoll,
  fetchIsSavedToRolls,
} from "@/services/RollServices";
import { useToast } from "@/providers/ToastProvider";

export function usePhotoRoll(photoId: string | null) {
  const { showToast } = useToast();

  const [selectedRoll, setSelectedRoll] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [savedRoll, setSavedRoll] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [savedToRolls, setSavedToRolls] = useState<string[]>([]);

  const fetchSavedRolls = useCallback(async () => {
    if (!photoId) return;
    try {
      const res = await fetchIsSavedToRolls(photoId);
      setSavedToRolls(res || []);
    } catch (error) {
      console.error("Failed to fetch saved rolls:", error);
    }
  }, [photoId]);

  useEffect(() => {
    fetchSavedRolls();
  }, [fetchSavedRolls]);

  const saveToRoll = async () => {
    if (!selectedRoll) return;

    try {
      setIsLoading(true);
      await addPhotoToRoll(selectedRoll.id, photoId || "");
      setSavedRoll(selectedRoll);
      setSaved(true);
      showToast("Photo added to roll", "success");
    } catch (e) {
      showToast("Failed to add photo", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromRoll = async () => {
    try {
      setIsLoading(true);
      await removePhotoFromRoll(savedRoll?.id || "", photoId || "");
      setSaved(false);
      showToast("Photo removed from roll", "success");
    } catch (e) {
      showToast("Failed to remove photo", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedRoll,
    setSelectedRoll,
    isLoading,
    isSaved,
    savedRoll,
    savedToRolls,
    saveToRoll,
    removeFromRoll,
  };
}
export default usePhotoRoll;
