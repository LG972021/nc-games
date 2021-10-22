import { useState } from "react";
import axios from "axios";

const Voter = ({ review, reviewLoading, setReviewLoading }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [votePressed, setVotePressed] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [voteClass, setVoteClass] = useState(
    "SingleReview__Comments__VoteButtonImage__NoPress"
  );

  if (reviewLoading === true) {
    return <p className="LoadingBar"> Loading...</p>;
  } else {
    return (
      <section className="Voter">
        <p>Votes: {review.votes + voteChange}</p>
        <img
          className={voteClass}
          alt="Vote Button"
          src="data:image/png;base64,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"
          onClick={() => {
            if (votePressed === false) {
              setVoteChange((currentVotes) => {
                return currentVotes + 1;
              });
              setVotePressed(true);
              setVoteClass("SingleReview__Comments__VoteButtonImage__Press");
            }
            axios
              .patch(
                `https://nc-board-game-reviewing.herokuapp.com/api/reviews/${review.review_id}`,
                { inc_votes: 1 }
              )
              .then((response) => {
                setReviewLoading(false);
              })
              .catch((error) => {
                setReviewLoading(false);
              });
          }}
        ></img>
      </section>
    );
  }
};

export default Voter;
