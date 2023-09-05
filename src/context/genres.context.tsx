import { FC, createContext, useEffect, useState } from "react"
import { getAllGenres } from "../api/genres.fetch"

type Props = {
    children: React.ReactNode;
}
interface GenresProps {
    id: string,
    name: string
}

export const GenresContext = createContext<{ genresAll: GenresProps[] }>({ genresAll: [] })

export const GenresProvider: FC<Props> = ({ children }) => {

    const [genresAll, setGenres] = useState<GenresProps[]>([])
    console.log(genresAll)
    useEffect(() => {
        async function getAllGenresLauncher() {
            const arrayGenres = await getAllGenres();
            setGenres(arrayGenres);
        }
        getAllGenresLauncher();
    }, [])

    return (
        <>
            <GenresContext.Provider value={{ genresAll }}>
                {children}
            </GenresContext.Provider>
        </>
    )
}