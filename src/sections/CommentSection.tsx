import Heading from "@/components/Heading";
import Comment from "@/components/Comment";
import CommentInputField from "@/components/inputfields/CommentInputField";
import photoCommentsAtom, {
  CommentType,
} from "@/stores/atoms/CommentSection/photoCommentsAtom";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

interface CommentSectionProps {
  id?: string;
}
const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
  const [comments, setComments] = useAtom(photoCommentsAtom);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchComments = async (photoId: string) => {
    setComments([]);
    setLoading(true);
    try {
      const res = await api.get(`/photos/${photoId}/comments?offset=0`);
      setComments(res.data.data.comments);
      setHasMore(res.data.data.hasMore);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreComments = async (photoId: string) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await api.get(
        `/photos/${photoId}/comments?offset=${comments.length}`
      );

      setComments((prev) => [...prev, ...res.data.data.comments]);
      setHasMore(res.data.data.hasMore);
    } catch (err) {
      console.error("Error fetching more comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchComments(id);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [comments]);

  return (
    <div>
      <Heading size="m" className="mb-5">
        Comments
      </Heading>
      {!loading && (
        <div className="overflow-y-auto no-scrollbar max-h-80 mb-5">
          {comments.length > 0 ? (
            comments.map((comment: CommentType, idx: number) => (
              <Comment
                key={comment._id}
                createdAt={comment.createdAt}
                ref={idx === comments.length - 1 ? bottomRef : null}
                username={comment.userId.username}
                userId={comment.userId._id}
                avatarUrl={comment.userId.avatarUrl}
                disableBorder={idx === comments.length - 1}
              >
                {comment.text}
              </Comment>
            ))
          ) : (
            <p className="text-black-200 text-xs font-figtree">
              No comments yet. Be the first to comment!
            </p>
          )}
          {hasMore && (
            <button
              onClick={() => fetchMoreComments(id!)}
              className="text-xs text-primary hover:underline mt-2 cursor-pointer text-center w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="loading loading-spinner text-primary"></div>
              ) : (
                "Load more comments"
              )}
            </button>
          )}
        </div>
      )}

      <CommentInputField id={id}></CommentInputField>
    </div>
  );
};

export default CommentSection;
