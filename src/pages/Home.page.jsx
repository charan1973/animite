import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { getQueried, getTop } from "../helper";
import { addToList } from "../redux/search/search.actions";

const Home = ({ search, addToList }) => {
  const [query, setQuery] = useState("");
  const [topAnime, setTopAnime] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    getTop().then(({ data }) => {
      addToList([]);
      setTopAnime(data.top);
    }); // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!(query.length >= 3)) {
        setError(true)
        return ""
    };
    setError(false)
    getQueried(query).then(({ data }) => {
      addToList(data.results);
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch} className="my-5">
        <div className="flex">
          <input
            className={`border border-gray-400 p-1 rounded w-56 h-10 border-r-0 rounded-r-none focus:outline-none ${error && "border-red-400"}`}
            placeholder="Search Anime"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-1 rounded h-10 rounded-l-none hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
        {error && <small className="text-red-700">input atleast 3 characters</small>}
        </form>
        {!search.length && (
          <>
            <h3 className="mb-6 font-bold text-lg">
              Top Anime from MyAnimeList
            </h3>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {topAnime.map((anime) => {
                return (
                  <Link key={anime.mal_id} to={`/info/${anime.mal_id}`}>
                    <div className="mb-3 border w-56 h-96">
                      <img
                        className="h-56 w-full"
                        src={anime.image_url}
                        alt=""
                      />
                      <div className="px-1">
                      <p>{anime.title}</p>
                      <StarRatingComponent
                        starCount={5}
                        name="rating"
                        value={anime.score / 2}
                        editing={false}
                      />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
        <div>
          {search.length &&
            search.map((anime) => {
              return (
                <Link key={anime.mal_id} to={`/info/${anime.mal_id}`}>
                  <div className="flex border rounded mb-5 h-56">
                    <img src={anime.image_url} alt="" className="w-36" />
                    <div className="p-5">
                      <p>{anime.title}</p>
                      <p>Broadcast type: {anime.type}</p>
                      <p>
                        Start Date:{" "}
                        {moment(anime.start_date).format("MMM DD, YYYY")}
                      </p>
                      <StarRatingComponent
                        name="rating"
                        value={anime.score / 2}
                        editing={false}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.search.searchList,
});

const mapDispatchToProps = (dispatch) => ({
  addToList: (list) => dispatch(addToList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
