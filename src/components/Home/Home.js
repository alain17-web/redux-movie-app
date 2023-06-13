import './home.scss'
import MovieListing from '../MovieListing/MovieListing'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'
import { addMovies } from '../../features/movies/movieSlice';

const Home = () => {

    const movieText = "Harry"
    const dispatch = useDispatch()

    useEffect(() => {
        
        const fetchMovies = async () => {
            const response = await movieApi.get(
                `?apiKey=${APIKEY}&s=${movieText}&type=movie`
            )
            .catch ((err) => {
                console.log('Err :',err)
            })
            dispatch(addMovies(response.data))
        }
           fetchMovies() 
    },[dispatch])

    return (  
        <div className="banner-img">
           <MovieListing />
        </div>
    );
}
 
export default Home;