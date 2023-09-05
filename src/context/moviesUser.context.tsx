import { FC, createContext, useState } from "react"

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
    }[],
    image: {
        public_id: string,
        secure_url: string
    }
}

export const MoviesUserContext = createContext<{ arrayMoviesUser: MovieProps[], handleArrayMoviesUser: (newArrayMoviesUser: MovieProps[]) => void }>({ arrayMoviesUser: [], handleArrayMoviesUser: () => { } })

export const MoviesUserProvider: FC<Props> = ({ children }) => {

    const [arrayMoviesUser, setArrayMoviesUser] = useState<MovieProps[]>([]);

    console.log(arrayMoviesUser)

    const handleArrayMoviesUser = (newArrayMoviesUser: MovieProps[]) => {
        setArrayMoviesUser(newArrayMoviesUser)
    }

    return (
        <>
            <MoviesUserContext.Provider value={{ arrayMoviesUser, handleArrayMoviesUser }}>
                {children}
            </MoviesUserContext.Provider>
        </>
    )
}