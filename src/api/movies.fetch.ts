import { URL_MOVIES, URL_MOVIES_PUBLIC } from "../global/serverUrls";

interface Movie {
    title: string,
    score: number,
    genres: string[],
    image: {
        public_id: string,
        secure_url: string
    }
}
interface MovieData {
    title: string;
    genres: string;
    score: number;
    imageList: FileList;
}


export const getAllMovies = async () => {
    try {
        const response = await fetch(URL_MOVIES_PUBLIC);
        const movies = await response.json();
        return movies;
    }
    catch {
        throw new Error("Error while getting all movies reference from mongoDB");
    }
};


export const getAllMoviesByUser = async (getToken: any, user: any) => {
    const token = await getToken();
    const userMail = user?.email;
    try {
        const response = await fetch(`${URL_MOVIES}` + '/byUser' + `/${userMail}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const movies = await response.json();
        return movies;
    }
    catch {
        throw new Error("Error while getting movies from mongoDB user profile");
    }
};


export const createMovie = async (getToken: any, data: any, user: any) => {
    const token = await getToken();
    const userMail = user?.email;
    const { title, score, genres, imageList } = data
    const image = imageList[0];

    const formData = new FormData()
    formData.append('title', title);
    formData.append('score', score);
    formData.append('genres', genres);
    formData.append('image', image);

    try {
        const response = await fetch(`${URL_MOVIES}/${userMail}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData
            })
        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status} `);
        }
        const movie = await response.json();
        return movie
    } catch {
        throw new Error("Error while sending movie to mongoDB");
    }
}


export const updateMovie = async (getToken: any, data: any, user: any) => {
    const token = await getToken();
    const { id, title, score, genres } = data

    const formData = new FormData()
    formData.append('title', title);
    formData.append('score', score);
    formData.append('genres', genres);

    try {
        const response = await fetch(`${URL_MOVIES}/${id}`,
            {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData
            })
        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status} `);
        }
        const movie = await response.json();
        return movie
    } catch {
        throw new Error("Error while sending movie to mongoDB");
    }
}


export const deleteMovie = async (getToken, data, user) => {
    const token = await getToken();
    const { id } = data;

    try {
        const response = await fetch(`${URL_MOVIES}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status}`);
        }
        return { success: true, message: "Movie deleted successfully" };
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw new Error("Error while deleting movie");
    }
};


