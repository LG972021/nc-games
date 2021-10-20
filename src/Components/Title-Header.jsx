import Dice from "../Dice.jpeg";

const TitleHeader = () => {
  return (
    <header className="Title">
      <h1>
        Dice-Roll Reviews
        <img src={Dice} alt="Logo"></img>
      </h1>
    </header>
  );
};

export default TitleHeader;
