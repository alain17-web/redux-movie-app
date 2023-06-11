import './home.scss'
import MovieListing from '../MovieListing/MovieListing'
import { useEffect } from 'react';
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'

const Home = () => {

    useEffect(() => {
        const movieText = "Harry"
        const fetchMovies = async () => {
            const response = await movieApi.get(
                `?apiKey=${APIKEY}&s=${movieText}&type=movie`
            )
            .catch ((err) => {
                console.log('Err :',err)
            })
            console.log('response from API',response)
        }
           fetchMovies() 
    },[])

    return (  
        <div className="banner-img">
           <MovieListing />
        </div>
    );
}
 
export default Home;