import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Icon from "../Icon.png";
import Voter from "./Voter";

const SingleReview = () => {
  const [review, setReview] = useState({});
  const [reviewCommentList, setReviewCommentList] = useState([]);
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}`
      )
      .then((response) => {
        setReview(response.data.review);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);

        console.log(error);
      });
  }, [review_id, review.votes]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}/comments`
      )
      .then((response) => {
        setReviewCommentList(response.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);

        console.log(error);
      });
  }, [review_id]);

  if (isError === true) {
    return (
      <section className="SingleReview">
        <img
          className="SingleReview__Fail__Image"
          alt="Review_Img"
          src={
            "https://m.media-amazon.com/images/I/61Dja35nTwL._AC_SL1500_.jpg"
          }
        />
        <div className="SingleReview__Fail__Text_Contents">
          <h2 className="SingleReview__Title">{review.title}</h2>
          <div className="SingleReview__ReviewBody">
            <p>No Review for that review id</p>
            <img
              className="SingleReview__Fail__AuthorCard__Image"
              alt="Author_Img"
              src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            />
          </div>
        </div>
      </section>
    );
  }

  if (isLoading === true) {
    return <p className="LoadingBar"> Loading...</p>;
  } else {
    return (
      <section className="SingleReview">
        <img
          className="SingleReview__Image"
          alt="Review_Img"
          src={review.review_img_url}
        />
        <div className="SingleReview__Text_Contents">
          <h2 className="SingleReview__Title">{review.title}</h2>
          <div className="SingleReview__ReviewBody">
            <p> {review.review_body} </p>
          </div>
          <div className="SingleReview__AuthorCard">
            <img
              className="SingleReview__AuthorCard__Image"
              alt="Author_Img"
              src={Icon}
            />
            <p className="SingleReview__AuthorCard__Author">
              by {review.owner}{" "}
            </p>
            <p className="SingleReview__AuthorCard__PostedAt">
              {" "}
              posted at {review.created_at}{" "}
            </p>
          </div>
          <Voter review={review} />

          <p>Review id: {review.review_id}</p>
        </div>
        <div className="Single__Review__Comments___Container">
          <h3 className="Single__Review__Comments___Heading">Comments</h3>
          <ul className="Single__Review__Comments__List">
            {reviewCommentList.map((comment) => {
              return (
                <li
                  className="Single__Review__Comment"
                  key={comment.comment_id}
                >
                  <h2>{comment.body}</h2>
                  <p> - {comment.author} </p>
                  <p> posted {comment.created_at} </p>
                  <p>Comment id: {comment.comment_id}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
};

export default SingleReview;
