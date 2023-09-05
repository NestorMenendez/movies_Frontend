import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/public/home/HomePage';
import PublicRoute from '../router/Public.route';
import PrivateRoute from '../router/Private.route';
import ErrorRoute from '../router/Error.route';
import { GenresProvider } from '../context/genres.context';
import { MoviesPublicProvider } from '../context/moviesPublic.context';
import { MoviesUserProvider } from '../context/moviesUser.context';


export const RouterPaths = () => {

    return (
        <>
            <GenresProvider>
                <MoviesPublicProvider>
                    <MoviesUserProvider>
                        <Routes>

                            <Route path='/' element={<PublicRoute />}>
                                <Route path="/home" element={<HomePage />} />
                            </Route>

                            <Route path='/' element={<PrivateRoute />}>
                                <Route path="/userhome" element={<HomePage />}></Route>
                                {/* <Route path="/userprofile" element={<HomePage />}></Route> */}
                            </Route>

                            <Route path="*" element={<ErrorRoute />} />

                        </Routes>
                    </MoviesUserProvider>
                </MoviesPublicProvider>
            </GenresProvider>
        </>
    )
}