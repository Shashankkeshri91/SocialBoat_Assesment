import "./styles.css";
import Header from "./components/Header"
import SearchResults from "./components/SearchResults"
// import SearchResults from "./components/SearchResults";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <SearchResults/>
    </div>
  );
}