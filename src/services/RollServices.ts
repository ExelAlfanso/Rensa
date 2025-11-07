export function fetchRollsForUser(userId: string) {
  return fetch(`/api/rolls?userId=${userId}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch rolls");
    }
    return res.json();
  });
}
