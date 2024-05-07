import React from "react";
import { Button } from "../ui/button";
import { AutosizeTextarea } from "../ui/autosizeTextarea";

type Props = {
  commentContent: string;
  setCommentContent: (commentContent: string) => void;
};

const CommentTextareaAndButton = (props: Props) => {
  const { commentContent, setCommentContent } = props;

  return (
    <>
      <AutosizeTextarea
        commentContent={commentContent}
        name="content"
        id="content"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        aria-describedby="content-error"
        maxHeight={100}
        minHeight={37}
        className={`h-10 dialog-scroll border-0 bg-neutral-100 resize-none rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full`}
        placeholder="Add a comment..."
      />
      <Button
        type="submit"
        className={`rounded-none sm:rounded-br-lg bg-neutral-100 hover:bg-neutral-100 ${
          commentContent
            ? "text-neutral-600 hover:text-neutral-900"
            : "text-neutral-300"
        }`}
        disabled={!commentContent}
      >
        Post
      </Button>
    </>
  );
};

export default CommentTextareaAndButton;
