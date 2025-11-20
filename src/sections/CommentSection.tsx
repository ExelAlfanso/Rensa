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
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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

      <div className="mb-5 overflow-y-auto no-scrollbar max-h-90">
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div key={comment._id} className="relative">
              <Comment
                createdAt={comment.createdAt}
                username={comment.userId.username}
                userId={comment.userId._id}
                avatarUrl={comment.userId.avatarUrl}
                disableBorder={idx === comments.length - 1}
              >
                {comment.text}
              </Comment>
              {hasMore && idx === comments.length - 1 && (
                <div
                  onClick={() => !loading && fetchMoreComments(id!)}
                  className="*absolute bottom-0 left-0 flex items-center justify-center w-full h-10 cursor-pointer bg-gradient-to-t from-white/95 via-white/60 to-transparent backdrop-blur-[1px]"
                >
                  {loading ? (
                    <div className="scale-75 loading loading-spinner text-primary"></div>
                  ) : (
                    <span className="text-xs text-primary font-figtree">
                      Load more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : loading ? (
          ""
        ) : (
          <p className="text-xs text-black-200 font-figtree">
            No comments yet. Be the first to comment!
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <CommentInputField id={id} onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentSection;
