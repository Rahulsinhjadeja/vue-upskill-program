<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="show" class="modal fade show d-block" tabindex="-1" @click="handleClose">
                <div class="modal-dialog" @click.stop>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ movieId ? 'Update Movie' : 'Add Movie' }}</h5>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" id="name" name="name" ref="nameInput" v-model="form.name"
                                        class="form-control">
                                    <div class="invalid-feedback d-block" v-if="errors.name">{{ errors.name }}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea id="description" name="description" class="form-control"
                                        v-model="form.description"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="image" class="form-label">Image</label>
                                    <input type="text" id="image" name="image" class="form-control" v-model="form.image">
                                </div>
                                <div class="mb-3">
                                    <label for="genres" class="form-label">Genres</label>
                                    <select id="genres" name="genres[]" class="form-select" multiple v-model="form.genres">
                                        <option v-for="genre in genresData" :key="genre" :value="genre">{{ genre }}</option>
                                    </select>
                                    <div class="invalid-feedback d-block" v-if="errors.genres">{{ errors.genres }}</div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="in_theaters" name="in_theaters"
                                            v-model="form.in_theaters">
                                        <label class="form-check-label" for="in_theaters">
                                            In theaters
                                        </label>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary action_btns"
                                    @click.stop.prevent="submitMovie">Submit</button>
                                <button type="button" class="btn btn-danger action_btns" @click="handleClose">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import type { Movie } from "../types/store";
const store = useStore();
const props = defineProps(['show', 'movieId']);
const emit = defineEmits(['close']);

const getInitialForm = () => ({
    name: '', description: '', image: "", rating: 0, genres: [], in_theaters: false
});
const getInitialErrors = () => ({ name: '', genres: '' });
const form = ref(getInitialForm());
const nameInput = ref<HTMLInputElement | null>(null); // to auto focus
const errors = ref((getInitialErrors()));
const resetErrors = () => {
    errors.value = (getInitialErrors());
};
const genresData = [
    'Drama',
    'Crime',
    'Action',
    'Comedy'
];

function validate() {
    let isValid = true;
    resetErrors();

    if (!form.value.name.trim()) {
        errors.value.name = "Movie name is required.";
        isValid = false;
    }

    if (!form.value.genres || form.value.genres.length === 0) {
        errors.value.genres = "Select at least one genre.";
        isValid = false;
    }

    return isValid;
}

watch(() => props.show, async (isVisible) => {
    if (isVisible) {
        const movie = store.getters.getMoviesList.find((m: Movie) => m.id === props.movieId);
        form.value = movie ? { ...movie } : getInitialForm();

        await nextTick();
        nameInput.value?.focus(); // focus the name element when form opens
    } else {
        resetErrors();
    }
});
function submitMovie() {
    if (!validate()) return;
    const action = props.movieId ? 'updateMovie' : 'addMovie';
    const payload = props.movieId ? form.value : { ...form.value, id: Date.now() };
    store.dispatch(action, payload);
    handleClose();
}

function handleClose() {
    form.value = getInitialForm();
    resetErrors();
    emit('close');
}
</script>

<style scoped>
.action_btns {
    margin-bottom: 20px;
    margin-right: 10px;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal-dialog,
.modal-fade-leave-active .modal-dialog {
    transition: transform 0.3s ease-out;
}

.modal-fade-enter-from .modal-dialog,
.modal-fade-leave-to .modal-dialog {
    transform: translateY(-50px);
}
</style>