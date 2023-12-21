import CommentItem from "./CommentItem";

interface CommentsFeedProps {
  comments?: Record<string, any>[];
}

const CommentsFeed: React.FC<CommentsFeedProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentsFeed;
