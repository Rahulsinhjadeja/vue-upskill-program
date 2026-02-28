<template>
    <div v-if="movieData">
        <h3>Movie Details</h3>
        <RouterLink to="/" class="btn btn-danger action_btns">Home</RouterLink>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <img v-if="movieData.image" :src="movieData.image" class="card-img-top">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title d-flex align-items-center">
                                {{ movieData.name }}
                                <span class="badge rounded-pill bg-warning text-dark ms-2">
                                    {{ movieData.rating }} Stars
                                </span>
                            </h5>
                            <movie-genres :genre-list="movieData.genres"></movie-genres>
                            <p class="card-text" v-if="movieData.description">{{ movieData.description }}</p>
                            <p class="card-text" v-if="movieData.in_theaters">In Theater</p>
                            <p class="card-text">Ratings: ({{ movieData.rating }} / 5)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MovieGenres from './MovieGenres.vue';

const store = useStore();
const router = useRouter();
const props = defineProps(['id']);

const movieData = computed(() => store.getters.getMovieDetails(Number(props.id)));
if (!movieData.value) {
    router.replace({ name: 'not-found' });
}
</script>

<style scoped>
.action_btns {
    margin-bottom: 20px;
    margin-right: 10px;
}
</style>