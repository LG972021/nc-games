import { useState } from "react";
import API from "../utils.js/APICalls";

const AddCommentForm = ({
  setReviewCommentList,
  review_id,
  setCommentsLoading,
  setCommentAddError,
}) => {
  const [newComment, setNewComment] = useState({
    username: "grumpy19",
    body: "",
  });

  const handleChange = (event) => {
    setNewComment((currentNewComment) => {
      const updatedNewComment = { ...currentNewComment };
      updatedNewComment.body = event.target.value;
      return updatedNewComment;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCommentsLoading(true);
    API.post(`reviews/${review_id}/comments`, newComment)
      .then((response) => {
        setReviewCommentList((currentReviewCommentList) => {
          const updatedReviewCommentList = [...currentReviewCommentList];
          updatedReviewCommentList.push(response.data.comment);
          return updatedReviewCommentList;
        });
        setCommentsLoading(false);
        setCommentAddError(false);
      })
      .catch((error) => {
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
          readOnly={true}
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
      <button className="AddCommentForm_SubmitButton">Submit Comment</button>
    </form>
  );
};

export default AddCommentForm;
