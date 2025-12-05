import { useEffect, useState } from "react";
import {
  addPhotoToRoll,
  removePhotoFromRoll,
  fetchIsSavedToRolls,
  fetchDefaultRoll,
} from "@/services/RollServices";
import { useToast } from "@/providers/ToastProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePhotoRoll(photoId: string | null) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const actorId = user?.id || "";
  const [selectedRoll, setSelectedRoll] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // -----------------------
  // Fetch DEFAULT ROLL
  // -----------------------
  const { data: defaultRoll } = useQuery({
    queryKey: ["defaultRoll", user?.id],
    queryFn: fetchDefaultRoll,
    enabled: !!user?.id,
    select: (res) => res.data, // res.data.data → changed based on your API structure
  });

  // Set selected roll once default roll is loaded
  useEffect(() => {
    if (defaultRoll && !selectedRoll) {
      setSelectedRoll({
        id: defaultRoll._id,
        name: defaultRoll.name,
      });
    }
  }, [defaultRoll, selectedRoll]);

  // -----------------------
  // Fetch rolls containing this photo
  // -----------------------
  const { data: savedToRolls = [] } = useQuery({
    queryKey: ["savedRolls", photoId],
    queryFn: async () => {
      const res = await fetchIsSavedToRolls(photoId!);
      return res || [];
    },
    enabled: !!photoId && !!user?.id,
  });

  // -----------------------
  // Add photo to roll
  // -----------------------
  const saveMutation = useMutation({
    mutationFn: (rollId: string) =>
      addPhotoToRoll(actorId, rollId, photoId || ""),
    onSuccess: () => {
      showToast("Photo added to roll", "success");
      queryClient.invalidateQueries({ queryKey: ["savedRolls", photoId] });
    },
    onError: () => showToast("Failed to add photo", "error"),
  });

  // -----------------------
  // Remove photo from roll
  // -----------------------
  const removeMutation = useMutation({
    mutationFn: (rollId: string) => removePhotoFromRoll(rollId, photoId || ""),
    onSuccess: () => {
      showToast("Photo removed from roll", "success");
      queryClient.invalidateQueries({ queryKey: ["savedRolls", photoId] });
    },
    onError: () => showToast("Failed to remove photo", "error"),
  });

  // -----------------------
  // Check if photo is in default roll
  // -----------------------
  const isSaved = defaultRoll ? savedToRolls.includes(defaultRoll._id) : false;

  return {
    selectedRoll,
    isLoading: saveMutation.isPending || removeMutation.isPending,
    isSaved,
    savedToRolls,
    setSelectedRoll,
    saveToRoll: () => defaultRoll && saveMutation.mutate(defaultRoll._id),
    removeFromRoll: () => defaultRoll && removeMutation.mutate(defaultRoll._id),
  };
}

export default usePhotoRoll;
