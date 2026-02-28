<template>
    <h3 class="title">Movies List</h3>
    <p>Total Movies: {{ totalMovies }}</p>
    <p>Average Rating: {{ averageRating }}</p>
    <button class="btn btn-primary action_btns" @click="removeRatings">Remove Ratings</button>
    <button class="btn btn-success action_btns" @click="showMovieForm(0)">Add Movie</button>
    <div class="row">
        <RouterLink class="col-lg-4" :to="{ name: 'movie-details', params: { id: movie.id } }"
            v-for="movie in moviesList" :key="movie.id" v-if="moviesList.length > 0">
            <div class="card">
                <img v-if="movie.image" :src="movie.image" class="card-img-top">
                <div class="card-body">
                    <div>
                        <h5 class="card-title d-flex align-items-center">
                                {{ movie.name }}
                                <span class="badge rounded-pill bg-warning text-dark ms-2">
                                    {{ movie.rating }} Stars
                                </span>
                            </h5>
                        <movie-genres :genre-list="movie.genres"></movie-genres>
                        <p class="card-text" v-if="movie.description">{{ movie.description }}</p>
                        <p class="card-text" v-if="movie.in_theaters">In Theater</p>
                        <p class="card-text">Ratings: ({{ movie.rating }} / 5)</p>
                    </div>
                    <div class="movie-ratings">
                        <span v-for="star in stars" :key="star"
                            @click.stop.prevent="star > movie.rating ? updateRating(star, movie.id) : ''"><i
                                class="star"
                                :class="star <= movie.rating ? 'fill-up-star fas fa-star' : 'fa-regular fa-star'"></i></span>
                    </div>
                    <button class="btn btn-primary action_btns"
                        @click.stop.prevent="showMovieForm(movie.id)">Edit</button>
                    <button class="btn btn-danger action_btns"
                        @click.stop.prevent="deleteMovie(movie.id)">Delete</button>
                </div>
            </div>
        </RouterLink>
        <div class="col-lg-6" v-else>
            <div class="card">
                <div class="card-body">
                    No movies added.
                </div>
            </div>
        </div>
    </div>
    <MovieModal :show="isVisible" @close="hideMovieForm" :movie-id="selectedId" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MovieGenres from './MovieGenres.vue';
import { useStore } from 'vuex';
import '@fortawesome/fontawesome-free/css/all.css'
import MovieModal from './MovieForm.vue';
const stars = 5;

const store = useStore();

const moviesList = computed(() => store.getters.getMoviesList);
const isVisible = ref(false);
const selectedId = ref(0);
const totalMovies = computed(() => moviesList.value.length);

// 2. Average Rating
const averageRating = computed(() => {
    if (moviesList.value.length === 0) return 0;
    let total = 0;
    for (const movie of moviesList.value) {
        total += movie.rating;
    }
    const sum = total;
    const avg = sum / moviesList.value.length;
    return avg.toFixed(1);
});

function showMovieForm(movieId: number) {
    selectedId.value = movieId;
    isVisible.value = true;
}

function hideMovieForm() {
    isVisible.value = false;
}

function updateRating(newRating: number, movieId: number) {
    store.dispatch("updateRating", { rating: newRating, id: movieId })
}

function removeRatings() {
    store.dispatch("resetAllRatings")
}

function deleteMovie(movieId: number) {
    store.dispatch("deleteMovie", movieId);
}

</script>

<style scoped>
.title {
    margin-bottom: 20px;
}

.action_btns {
    margin-bottom: 20px;
    margin-right: 10px;
}

.card {
    margin-bottom: 20px;
    width: 18rem;
}

.star {
    cursor: pointer;
    margin-right: 5px;
}

.fill-up-star {
    color: gold;
}

.movie-ratings {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>