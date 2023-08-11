import { URL_MOVIES } from "../global/serverUrls";


export const getAllMovies = async () => {
    try {
        console.log(URL_MOVIES)
        const response = await fetch(URL_MOVIES);
        const movies = await response.json();

        return movies;
    }

    catch {
        throw new Error("Error while getting products from JSON-server API");
    }

};

