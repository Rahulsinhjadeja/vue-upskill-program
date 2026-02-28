<template>
    <span class="badge bg-success" v-for="genre in genreList" :key="genre.toLowerCase()">{{genre}}</span>
</template>

<script setup lang="ts">
interface genreProps {
  genreList: string[];
}
const props = defineProps<genreProps>();
</script>

<style scoped>
.badge {
    margin-right: 5px;
}
</style>