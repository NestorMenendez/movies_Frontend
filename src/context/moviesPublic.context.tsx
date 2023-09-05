import { FC, createContext, useEffect, useState } from "react"
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

export const MoviesPublicContext = createContext<{ arrayMovies: MovieProps[], handleArrayMovies: (newArrayMovies: MovieProps[]) => void, }>({ arrayMovies: [], handleArrayMovies: () => { } })

export const MoviesPublicProvider: FC<Props> = ({ children }) => {

    const [arrayMovies, setArrayMovies] = useState<MovieProps[]>([]);
    const [arrayMoviesCount, setArrayMoviesCount] = useState(0);
    console.log(arrayMovies)
    useEffect(() => {
        async function getAllMoviesLauncher() {
            const arrayMovies = await getAllMovies();
            setArrayMovies(arrayMovies);

            if (arrayMovies.length !== arrayMoviesCount) {
                setArrayMoviesCount(arrayMovies.length);
                setArrayMovies(arrayMovies);
            }
        }
        getAllMoviesLauncher();
    }, [arrayMoviesCount])

    const handleArrayMovies = (newArrayMovies: MovieProps[] | ((prevArrayMovies: MovieProps[]) => MovieProps[])) => {
        if (typeof newArrayMovies === 'function') {
            // Si newArrayMovies es una función, la ejecutamos para obtener el nuevo array.
            setArrayMovies(newArrayMovies(arrayMovies));
        } else {
            // Si newArrayMovies es un array, lo establecemos directamente.
            setArrayMovies(newArrayMovies);
        }
    }

    return (
        <>
            <MoviesPublicContext.Provider value={{ arrayMovies, handleArrayMovies }}>
                {children}
            </MoviesPublicContext.Provider>
        </>
    )
}