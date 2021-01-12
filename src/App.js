import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar.component";
import Home from "./pages/Home.page";
import Info from "./pages/Info.page";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info/:animeId" component={Info} />
      </Switch>
    </>
  );
}

export default App;
