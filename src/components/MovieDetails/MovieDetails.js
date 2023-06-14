import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncMovieOrShowDetails, getSelectedMovieOrShow, removeSelectedMovieOrShow } from "../../features/movies/movieSlice";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './movieDetails.scss'

const MovieDetails = () => {

    const { imdbID } = useParams()
    const dispatch = useDispatch()
    const data = useSelector(getSelectedMovieOrShow)


    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetails(imdbID))
        return () => {
            dispatch(removeSelectedMovieOrShow())
        }
    }, [dispatch, imdbID])

    return (
        <div className="movie-section">
            {Object.keys(data).length === 0 ?
                (<div>...Loading</div>) : (
                    <>
                        <div className="section-left">
                            <div className="movie-title">{data.title}</div>
                            <div className="movie-rating">
                                <span>
                                    IMDB Rating <StarBorderIcon className="star" /> : {data.imdbRating}
                                </span>
                                <span>
                                    IMDB Votes <ThumbUpIcon className="thumbs-up" /> : {data.imdbVotes}
                                </span>
                                <span>
                                    IMDB Runtime <VideocamIcon className="film" /> : {data.Runtime}
                                </span>
                                <span>
                                    Year <CalendarMonthIcon className="calendar" /> : {data.Year}
                                </span>
                            </div>
                            <div className="movie-plot">
                                {data.Plot}
                            </div>
                            <div className="movie-info">
                                <div>
                                    <span>Director</span>
                                    <span>{data.Director}</span>
                                </div>
                                <div>
                                    <span>Stars</span>
                                    <span>{data.Actors}</span>
                                </div>
                                <div>
                                    <span>Genre</span>
                                    <span>{data.Genre}</span>
                                </div>
                                <div>
                                    <span>Languages</span>
                                    <span>{data.Language}</span>
                                </div>
                                <div>
                                    <span>Awards</span>
                                    <span>{data.Awards}</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-right">
                            <img src={data.Poster} alt={data.Title} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default MovieDetails;