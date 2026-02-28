import { createStore } from "vuex";
import type { ActionContext } from "vuex";
import type { Movie, MovieState, RootState } from "@/types/store";
type Context = ActionContext<MovieState, RootState>

const store = createStore<RootState>({
    state: {
        moviesList: [ // Initial movie data
            {
                "id": 1,
                "name": "The Godfather",
                "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY1982_.jpg",
                "rating": 4,
                "genres": ["Crime", "Drama"],
                "in_theaters": false
            },
            {
                "id": 2,
                "name": "The Shawshank Redemption",
                "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "image": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg",
                "rating": 4,
                "genres": ["Drama"],
                "in_theaters": false
            },
            {
                "id": 3,
                "name": "The Dark Knight",
                "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
                "rating": 3,
                "genres": ["Action", "Crime", "Drama"],
                "in_theaters": true
            }
        ]
    },
    mutations: {
        addMovie(state: MovieState, movie: Movie) { // add movie to moviesList
            state.moviesList.push(movie);
        },
        updateMovie(state: MovieState, movie: Movie) { // update movie to moviesList
            state.moviesList = state.moviesList.map(m => m.id === movie.id ? movie : m);
        },
        deleteMovie(state: MovieState, movieId: number) { // delete movie from moviesList
            state.moviesList = state.moviesList.filter(movie => movie.id !== movieId);
        },
        updateRating(state: MovieState, ratingData: { rating: number, id: number }) { // update specific rating
            const movie = state.moviesList.find(m => m.id === ratingData.id);
            if (movie) {
                movie.rating = ratingData.rating;
            }
        },
        resetAllRatings(state: MovieState) { // reset all ratings
            state.moviesList.forEach(movie => {
                movie.rating = 0;
            });
        },
        initializeMoviesList(state: MovieState, movies: Movie[]) { // initialize movies
            state.moviesList = movies;
        }
    },
    actions: {
        addMovie({ commit, state }: Context, movie: Movie) {
            commit("addMovie", movie);
            localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
        },
        updateMovie({ commit, state }: Context, movie: Movie) {
            commit("updateMovie", movie);
            localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
        },
        deleteMovie({ commit, state }: Context, movieId: number) {
            commit("deleteMovie", movieId);
            localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
        },
        updateRating({ commit, state }: Context, ratingData: { rating: number, id: number }) {
            commit("updateRating", ratingData);
            localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
        },
        resetAllRatings({ commit, state }: Context) {
            commit("resetAllRatings");
            localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
        },
        initializeMoviesList({ commit }: Context) { // initialize movies from localStorage
            const storageMovies = localStorage.getItem('moviesList');
            if (storageMovies) {
                commit('initializeMoviesList', JSON.parse(storageMovies));
            }
        }
    },
    getters: {
        getMoviesList(state: MovieState) { // get all movies
            return state.moviesList;
        },
        getMovieDetails: (state: MovieState) => (movieId: number) => {
            return state.moviesList.find((movie: Movie) => movie.id === Number(movieId));
        }
    }
})
store.dispatch('initializeMoviesList');
export default store;
