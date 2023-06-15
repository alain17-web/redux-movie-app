import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'
import AutorenewIcon from '@mui/icons-material/Autorenew';





//fetch movies
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {

     const response = await movieApi.get(
        `?apiKey=${APIKEY}&s=${term}&type=movie`
    )
    
    if(response.data) {
        return response.data
    }else{
        (<div><AutorenewIcon/> ...loading</div>)
    }
     
})

//fetch shows
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    
    const response = await movieApi.get(
        `?apiKey=${APIKEY}&s=${term}&type=series`
    )
    
    return response.data
})

//fetch movie or show details
export const fetchAsyncMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetails', async (id) => {
    
    const response = await movieApi.get(
        `?apiKey=${APIKEY}&i=${id}&Plot=full`
    )
    
    return response.data
})

//initial state 
const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
}

//actions
 const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
       removeSelectedMovieOrShow: (state) => {
        state.selectedMovieOrShow = {}
       }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending")
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            console.log("fetched succesfully")
            return {...state,movies: payload}
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected")
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            console.log("fetched succesfully")
            return {...state,shows: payload}
        },
        [fetchAsyncMovieOrShowDetails.fulfilled]: (state, {payload}) => {
            console.log("fetched succesfully")
            return {...state,selectedMovieOrShow: payload}
        },
    }
})

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow

export default movieSlice.reducer;