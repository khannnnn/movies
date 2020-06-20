const secondMoviesList = (state = [], action) =>{
    switch(action.type){
        case "SECONDMOVIESLIST":
            return action.payload;
        default:
            return state;
    }
}

export default secondMoviesList;