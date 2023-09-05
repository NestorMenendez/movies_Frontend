import { FC, createContext, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import { getAllMovies } from "../api/movies.fetch";

type Props = {
    children: React.ReactNode;
}
type MovieProps = {
    id: string,
    title: string,
    score: number,
    genres: {
        name: string,
        id: string
    },
    image: {
        public_id: string,
        secure_url: string
    }
}

export const MoviesUserContext = createContext<{ arrayMoviesUser: MovieProps[], handleArrayMoviesUser: (newArrayMoviesUser: MovieProps[]) => void, handleDeleteMovieUser: (movieToDelete: string) => void }>({ arrayMoviesUser: [], handleArrayMoviesUser: () => { }, handleDeleteMovieUser: () => { } })

export const MoviesUserProvider: FC<Props> = ({ children }) => {

    const { isAuthenticated } = useAuth0();
    const [arrayMoviesUser, setArrayMoviesUser] = useState<MovieProps[]>([]);


    const handleArrayMoviesUser = (newArrayMoviesUser: MovieProps[]) => {
        setArrayMoviesUser(newArrayMoviesUser)
    }

    const handleDeleteMovieUser = (movieToDelete: string) => {
        console.log('entra');
        console.log(movieToDelete)
        const newArrayMoviesUser = arrayMoviesUser.filter((movie) => movie.id !== movieToDelete);
        console.log(newArrayMoviesUser)
        setArrayMoviesUser(newArrayMoviesUser);
    }

    return (
        <>
            <MoviesUserContext.Provider value={{ arrayMoviesUser, handleArrayMoviesUser, handleDeleteMovieUser }}>
                {children}
            </MoviesUserContext.Provider>
        </>
    )
}