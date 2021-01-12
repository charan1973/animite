import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAnimeInfo, getCharacters } from "../helper";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import StarRatingComponent from "react-star-rating-component";
import Overlay from "../components/Overlay.component";

const Info = ({ search, match }) => {
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    setCharacters([]);
    getAnimeInfo(match.params.animeId).then(({ data }) => {
      setInfo(data);
    });
  }, [match.params.animeId]);

  const handleGetCharacters = () => {
    getCharacters(match.params.animeId).then(({ data }) =>
      setCharacters(data.characters)
    );
  };

  const handleShowMore = () => {
      setOverlay(true)
  }

  console.log(info);

  return (
    <div className="grid grid-cols-5">
      {search.length > 0 && (
        <div className="bg-gray-300 hidden lg:block">
          {search
            .filter((anime, idx) => idx < search.length / 2)
            .map((anime, idx) => {
              return (
                <Link key={anime.mal_id} to={`/info/${anime.mal_id}`}>
                  <div className="flex border h-24">
                    <img src={anime.image_url} alt="" className="h-24 w-20" />
                    <div className="p-3">
                      <p>{anime.title.length > 50 ? anime.title.slice(0, 50) + "..." : anime.title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
      {info.title ? (
        <div className="p-3 col-span-5 lg:col-span-4">
          <div className="flex">
            <img src={info.image_url} alt="" />
            <div className="mx-10 font-bold info-meta">
              <h2 className="text-3xl">{info.title}</h2>
              <table>
                <tr>
                  <td className="text-blue-400">Start Date</td>
                  <td>{moment(info.aired.from).format("MMM DD, YYYY")}</td>
                </tr>
                {(info.type !== "Movie" || info.airing) && (
                  <>
                    <tr>
                      <td className="text-blue-400">End Date</td>
                      <td>{moment(info.aired.to).format("MMM DD, YYYY")}</td>
                    </tr>
                    <tr>
                      <td className="text-blue-400">Episodes</td>
                      <td>{info.episodes}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td className="text-blue-400">Duration</td>
                  <td>{info.duration}</td>
                </tr>
                <tr>
                  <td className="text-blue-400">Type</td>
                  <td> {info.type === "TV" ? "TV Show" : info.type}</td>
                </tr>
                <tr>
                  <td className="text-blue-400">Genres</td>
                  <td>
                    {info.genres.map((genre, idx) => (
                      <span key={genre.mal_id}>
                        {genre.name}
                        {info.genres.length !== idx + 1 && ", "}
                      </span>
                    ))}
                  </td>
                </tr>
              </table>
              <StarRatingComponent value={info.score/2} editing={false} name="rating" />
              <div className="mt-10 flex">
                <a href={info.trailer_url} target="_blank" rel="noreferrer" className="bg-blue-500 text-white py-3 px-1 rounded hover:bg-blue-700 focus:outline-none">
                  Watch Trailer
                </a>
                <a
                  href={info.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-5 bg-green-500 py-3 px-1 text-white rounded hover:bg-blue-700 focus:outline-none"
                >
                  MyAnimeList Page
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-green-700 font-bold text-2xl">Plot</h3>
            <p>{info.synopsis}</p>
          </div>
          <div className="mt-10">
            <button
              onClick={handleGetCharacters}
              className="bg-blue-500 text-white p-1 rounded h-10 w-full hover:bg-blue-700 focus:outline-none"
            >
              Show Characters
            </button>
            {characters.length > 0 && (
              <>
                <h3 className="font-bold text-lg">Characters</h3>
                <div className="grid gap-3 grid-cols-5 lg:grid-cols-10 mt-10">
                  {characters
                    .filter((character, idx) => idx < 10)
                    .map((character, idx) => {
                      return (
                        <div className="relative">
                          {idx === 9 && (
                            <div
                              onClick={handleShowMore}
                              className="cursor-pointer absolute flex justify-center items-center h-full w-full text-white font-bold bg-black bg-opacity-40"
                            >
                              Show More
                            </div>
                          )}
                          <img src={character.image_url} alt="" />
                          <p className="font-bold">{character.name}</p>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="col-span-5 lg:col-span-4 items-center justify-center">
          <div className="h-96 flex items-center justify-center">
            <Loader type="Grid" />
          </div>
        </div>
      )}
    <Overlay isOpen={overlay} onClose={() => setOverlay(false)} children={characters} grid />
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.search.searchList,
});

export default connect(mapStateToProps)(Info);
