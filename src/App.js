import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import TitleHeader from "./Components/Title-Header";
import Home from "./Components/Home";
import SingleReview from "./Components/SingleReview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TitleHeader />
        <NavBar />
        <Switch>
          <Route exact path="/reviews">
            <Home />
          </Route>
          <Route exact path="/reviews/categories/:category">
            <Home />
          </Route>
          <Route exact path="/reviews/id/:review_id">
            <SingleReview />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
