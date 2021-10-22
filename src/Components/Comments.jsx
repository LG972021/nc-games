import { useState, useEffect } from "react";
import axios from "axios";
import AddCommentForm from "./AddCommentForm";

const Comments = ({ review_id }) => {
  const [reviewCommentList, setReviewCommentList] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState([]);
  const [commentsError, setCommentsError] = useState(false);
  const [commentAddError, setCommentAddError] = useState(false);

  useEffect(() => {
    setCommentsLoading(true);
    setCommentsError(false);
    axios
      .get(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}/comments`
      )
      .then((response) => {
        setReviewCommentList(response.data.comments);
        setCommentsLoading(false);
      })
      .catch((error) => {
        setCommentsLoading(false);
        setCommentsError(true);
      });
  }, [review_id]);

  if (commentsError === true) {
    return <p>Cannot Find Comments, please try again later</p>;
  } else if (commentsLoading === true) {
    return <p className="LoadingBar"> Loading...</p>;
  } else {
    return (
      <div className="Single__Review__Comments___Container">
        <h3 className="Single__Review__Comments___Heading">Comments</h3>
        <ul className="Single__Review__Comments__List">
          {reviewCommentList.map((comment) => {
            return (
              <li className="Single__Review__Comment" key={comment.comment_id}>
                <h2>{comment.body}</h2>
                <p> - {comment.author} </p>
                <p> posted {comment.created_at} </p>
                <p>Comment id: {comment.comment_id}</p>
              </li>
            );
          })}
        </ul>
        {commentAddError ? (
          <p>
            Could not add that comment, please check the comment and try again
          </p>
        ) : null}
        <AddCommentForm
          setReviewCommentList={setReviewCommentList}
          review_id={review_id}
          setCommentsLoading={setCommentsLoading}
          setCommentAddError={setCommentAddError}
        />
      </div>
    );
  }
};

export default Comments;
