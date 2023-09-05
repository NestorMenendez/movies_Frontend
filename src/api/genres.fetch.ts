import { URL_GENRES } from "../global/serverUrls";


interface GenresProps {
    id: string,
    name: string
}


export const getAllGenres = async () => {
    try {
        const response = await fetch(URL_GENRES);
        const genres = await response.json();
        return genres;
    }
    catch {
        throw new Error("Error while getting all genres reference from mongoDB");
    }
};