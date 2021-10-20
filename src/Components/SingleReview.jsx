import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Icon from "../Icon.png";

const SingleReview = () => {
  const [review, setReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review_id}`
      )
      .then((response) => {
        setReview(response.data.review);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [review_id]);

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
          <p className="SingleReview__AuthorCard__Author">by {review.owner} </p>
          <p className="SingleReview__AuthorCard__PostedAt">
            {" "}
            posted at {review.created_at}{" "}
          </p>
        </div>

        <p>Review id: {review.review_id}</p>
      </div>
    </section>
  );
};

export default SingleReview;
