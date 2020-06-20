import {combineReducers} from 'redux';
import firstMoviesList from './FirstMoviesList';
import secondMoviesList from './SecondMoviesList';

const allReducer = combineReducers({
    firstMoviesList:firstMoviesList,
    secondMoviesList:secondMoviesList
});

export default allReducer;