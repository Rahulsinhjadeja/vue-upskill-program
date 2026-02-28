export interface Movie {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    genres: string[];
    in_theaters: boolean;
    starClasses: string[];
}
export interface MovieState {
    moviesList: Movie[];
}
export interface RootState {}