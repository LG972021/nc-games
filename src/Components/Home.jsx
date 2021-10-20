import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const [searchReviewId, SetSearchReviewId] = useState("");
  const [searchButtonClass, setSearchButtonClass] = useState("CanNotClick");
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  const createSearchURL = () => {
    if (category === undefined) {
      // console.log("https://nc-board-game-reviewing.herokuapp.com/api/reviews");
      return "https://nc-board-game-reviewing.herokuapp.com/api/reviews";
    } else {
      // console.log(
      //   `https://nc-board-game-reviewing.herokuapp.com/api/reviews?cat=${category}`
      // );
      return `https://nc-board-game-reviewing.herokuapp.com/api/reviews?cat=${category}`;
    }
  };

  const searchUrl = createSearchURL();
  const numRegex = /^\d+$/;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(searchUrl)
      .then((response) => {
        setReviewsList(response.data.reviews);
        setIsLoading(false);

        return response.data.reviews;
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  }, [category, searchUrl]);

  console.log(searchButtonClass);

  const handleChange = (event) => {
    SetSearchReviewId(event.target.value);
    if (
      event.target.value === "" ||
      numRegex.test(event.target.value) === false
    ) {
      setSearchButtonClass("CanNotClick");
    } else {
      setSearchButtonClass("CanClick");
    }
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (isError === true) {
    return (
      <section className="SingleReview">
        <h1>We're Sorry, Something Went Wrong...</h1>
      </section>
    );
  }

  if (isLoading === true) {
    return <p className="LoadingBar"> Loading...</p>;
  } else {
    return (
      <section className="Home">
        <div className="Home__Search__Form__Container">
          <form className="Home__Search__Form" onSubmit={handleSubmit}>
            <label className="Home__Search__Form__Label" htmlFor="item-name">
              Search by Review Id:
            </label>
            <input
              type="text"
              required
              placeholder="Please enter a Review_Id"
              id="item-name"
              name="name"
              onChange={handleChange}
              value={searchReviewId}
              className="Home__Search__Form__SearchBar"
            ></input>
            <Link
              to={`/reviews/id/${searchReviewId}`}
              className={searchButtonClass}
            >
              <button
                className="Home__Search__Form__SubmitButton"
                onClick={() => {
                  console.log("Click");
                }}
              >
                Search Id {searchButtonClass}
              </button>
            </Link>
          </form>
        </div>
        <ul className="Home__Reviews__List">
          {reviewsList.map((review) => {
            return (
              <li
                className="Home__Reviews__List__Review"
                key={review.review_id}
              >
                <Link
                  className="Home__Reviews__Links"
                  to={`/reviews/id/${review.review_id}`}
                >
                  <h2>{review.title}</h2>
                  <p> by {review.owner} </p>
                  <p> posted at {review.created_at} </p>
                  <p>Review id: {review.review_id}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Home;
