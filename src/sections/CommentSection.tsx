import Heading from "@/components/Heading";
import Comment from "@/components/Comment";
import CommentInputField from "@/components/inputfields/CommentInputField";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

export interface CommentType {
  _id: string;
  text: string;
  userId: {
    _id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  id?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  // -------- Fetch Comments --------
  const fetchComments = async (photoId: string) => {
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

  // -------- Fetch More Comments --------
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

  // -------- Reset & Fetch on Photo Change --------
  useEffect(() => {
    if (!id) return;
    setComments([]);
    fetchComments(id);
  }, [id]);

  // -------- Scroll to latest comment --------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [comments]);

  // -------- Add Comment (Optimistic UI) --------
  const handleAddComment = (newComment: CommentType) => {
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div>
      <Heading size="m" className="mb-5">
        Comments
      </Heading>

      <div className="overflow-y-auto no-scrollbar max-h-80 mb-5">
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
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
        ) : loading ? (
          ""
        ) : (
          <p className="text-black-200 text-xs font-figtree">
            No comments yet. Be the first to comment!
          </p>
        )}

        {hasMore && (
          <button
            onClick={() => fetchMoreComments(id!)}
            disabled={loading}
            className="text-xs text-primary hover:underline mt-2 cursor-pointer w-full text-center"
          >
            {loading ? (
              <div className="loading loading-spinner text-primary"></div>
            ) : (
              "Load more comments"
            )}
          </button>
        )}
      </div>

      <CommentInputField id={id} onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentSection;
