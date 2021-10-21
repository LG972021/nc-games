import axios from "axios";
import { useState } from "react";

const AddCommentForm = ({
  setReviewCommentList,
  review_id,
  setCommentsLoading,
  setCommentAddError,
}) => {
  const [newComment, setNewComment] = useState({ username: "", body: "" });

  const handleChange = (event) => {
    setNewComment((currentNewComment) => {
      const updatedNewComment = { ...currentNewComment };
      updatedNewComment[event.target.name] = event.target.value;
      console.log(updatedNewComment);
      return updatedNewComment;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCommentsLoading(true);
    axios
      .post(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}/comments`,
        newComment
      )
      .then((response) => {
        console.log("post successful");
        setReviewCommentList((currentReviewCommentList) => {
          const updatedReviewCommentList = [...currentReviewCommentList];
          updatedReviewCommentList.push(response.data.comment);
          return updatedReviewCommentList;
        });
        setCommentsLoading(false);
        setCommentAddError(false);
      })
      .catch((error) => {
        console.log("post failed");
        setCommentAddError(true);
        setCommentsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="AddCommentForm">
      <div className="AddCommentForm__Container">
        <h1 className="Add_A_Comment">Add a comment</h1>
        <label className="AddCommentForm__Label" htmlFor="item-name">
          Username:
        </label>
        <input
          type="text"
          name="username"
          required
          onChange={handleChange}
          value={newComment.username}
          className="AddCommentForm_InputBar"
        ></input>
      </div>
      <div className="AddCommentForm__Container">
        <label className="AddCommentForm__Label" htmlFor="item-name">
          Comment:
        </label>
        <input
          type="text"
          name="body"
          required
          onChange={handleChange}
          value={newComment.body}
          className="AddCommentForm_InputBar"
        ></input>
      </div>
      <button
        className="AddCommentForm_SubmitButton"
        onClick={() => {
          console.log("Click");
        }}
      >
        Submit Comment
      </button>
    </form>
  );
};

export default AddCommentForm;

// username: "dav3rid",
// body: "This is the body of the test review",
