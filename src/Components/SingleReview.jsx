import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Icon from "../Icon.png";
import Voter from "./Voter";
import Comments from "./Comments";

const SingleReview = () => {
  const [review, setReview] = useState({});

  const [ReviewError, setReviewError] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const { review_id } = useParams();

  useEffect(() => {
    setReviewLoading(true);
    setReviewError(false);
    axios
      .get(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}`
      )
      .then((response) => {
        setReview(response.data.review);

        setReviewLoading(false);
      })
      .catch((error) => {
        setReviewLoading(false);
        setReviewError(true);
      });
  }, [review_id]);

  if (ReviewError === true) {
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

  if (reviewLoading === true) {
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
          {Object.keys(review).length ? (
            <Voter
              review={review}
              reviewLoading={reviewLoading}
              setReviewLoading={setReviewLoading}
            />
          ) : (
            <p>Loading Voter</p>
          )}
          <p>Review id: {review.review_id}</p>
        </div>
        <Comments review_id={review.review_id} />
      </section>
    );
  }
};

export default SingleReview;
