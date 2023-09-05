import styled from 'styled-components'
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react'
import breakpoints from '../../global/deviceVariables'
import { colors } from '../../global/theme'
import { deleteMovie, getAllMovies, updateMovie } from '../../api/movies.fetch';
import { useContext, useEffect, useState } from 'react';
import { GenresContext } from '../../context/genres.context';
import { MoviesUserContext } from '../../context/moviesUser.context';
import { MoviesPublicContext } from '../../context/moviesPublic.context';


interface EditMovieProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    selectedMovie: MovieProps | null;
}
interface MovieData {
    id: string,
    title: string;
    genres: string[];
    score: number;
    imageList: FileList | null;
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


export const ModalEditMovie: React.FC<EditMovieProps> = ({ isOpen, handleCloseModal, selectedMovie }) => {

    const { arrayMoviesUser, handleArrayMoviesUser, handleDeleteMovieUser } = useContext(MoviesUserContext);
    const { arrayMovies, handleArrayMovies } = useContext(MoviesPublicContext);
    console.log(selectedMovie)
    const [formData, setFormData] = useState<MovieData>({
        id: '',
        title: '',
        genres: [],
        score: 0,
        imageList: null,
    });

    useEffect(() => {
        if (selectedMovie) {
            const firstGenre = selectedMovie.genres.id;
            setFormData({
                id: selectedMovie.id,
                title: selectedMovie.title,
                genres: [firstGenre],
                score: selectedMovie.score,
                imageList: null, // Puedes ajustarlo según tu lógica
            });
        }
    }, [selectedMovie]);

    let id = '';
    let title = '';
    let score = 0;
    let genres: string = '';
    let image = { public_id: '', secure_url: '' };
    if (selectedMovie) {
        id = selectedMovie.id;
        title = selectedMovie.title;
        score = selectedMovie.score;
        genres = selectedMovie.genres.name;
        image = selectedMovie.image;
    }

    const { user, getAccessTokenSilently } = useAuth0();
    const { genresAll } = useContext(GenresContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            setFormData({ ...formData, [name]: files });
        } else if (type === 'select-multiple') {
            const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions);
            const selectedGenreIds = selectedOptions.map(option => option.value);
            setFormData({ ...formData, genres: selectedGenreIds });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataToSend = { ...formData };
            if (formDataToSend.imageList && formDataToSend.imageList.length === 0) {
                formDataToSend.imageList = null;
            }
            formDataToSend.id = id;
            const updatedMovie = await updateMovie(getAccessTokenSilently, formDataToSend, user);
            const updatedArrayMovies = [...arrayMovies, updatedMovie];
            handleArrayMoviesUser(updatedArrayMovies);
            handleArrayMovies(updatedArrayMovies);

            setFormData({
                id: '',
                title: '',
                genres: [],
                score: 0,
                imageList: null,
            });
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {

        try {
            await deleteMovie(getAccessTokenSilently, formData, user);
            handleDeleteMovieUser(formData.id)
            const newArrayMovies = await getAllMovies();
            handleArrayMovies(newArrayMovies);

            setFormData({
                id: '',
                title: '',
                genres: [],
                score: 0,
                imageList: null,
            });
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = () => {
        setFormData({
            id: '',
            title: '',
            genres: [],
            score: 0,
            imageList: null,
        });
    };

    return (
        <ModalAddMovieStyles>
            <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
                <ModalFormStyles>
                    <h2>Edit Movie</h2>
                    <section className='modal-columns'>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                            </label>
                            <label>
                                Genre:
                                <select name="genres" onChange={handleChange} required>
                                    {genresAll.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Score:
                                <input type='number' name="score" value={formData.score} onChange={handleChange} required />
                            </label>
                            <label>
                                Image:
                                <input type="file" accept="image/*" name="imageList" onChange={handleChange} required />
                            </label>
                            <div className='buttons-section'>
                                <button type="submit">Modifie</button>
                                <button type='button' onClick={handleReset}>Reset</button>
                                <button type='button' onClick={handleDelete}>Delete</button>
                                <button type='button' onClick={handleCloseModal}>Close</button>
                            </div>
                        </form>
                        <section className='movie-container'>
                            <img src={image.secure_url}></img>
                            <div className='card-container__body'>
                                <div>{title}</div>
                                <div>{genres}</div>
                                <div>{score}</div>
                            </div>
                        </section>
                    </section>
                </ModalFormStyles>
            </Modal>
        </ModalAddMovieStyles>
    );
};


const ModalAddMovieStyles = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
padding: 1rem;
align-items: center;
justify-content: space-between;

background: rgba (255,255,255,0.5);


@media (max-width: ${breakpoints.mobile}px) {

}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;

}


@media (min-width: ${breakpoints.tablet}px) {

}
`;

const ModalFormStyles = styled.div`
display: flex;
flex-direction: column;
padding: 1rem;
align-items: center;
justify-content: space-between;

h2 {
    margin-bottom: 1rem;
}
form {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
}
label {
    gap: 2rem;
    padding: 1rem;
}
input, select {
    margin-left: 1rem;
}
button {
    margin: 0.5rem;
}
.buttons-section {
    margin-bottom: 1rem;
}
.modal-columns {
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width:90%;
}
.movie-container {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 30%;
    align-items: center;
    text-align: center;
    border: 1px solid grey;
    border-radius: 0.5rem;
    background-color: ${colors.secondary};
    opacity: 0.75;
}



@media (max-width: ${breakpoints.mobile}px) {


}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {



}


@media (min-width: ${breakpoints.tablet}px) {



}
`;