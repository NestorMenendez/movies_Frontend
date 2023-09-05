import styled from 'styled-components'
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react'
import breakpoints from '../../global/deviceVariables'
import { colors } from '../../global/theme'
import { createMovie } from '../../api/movies.fetch';
import { useContext, useState } from 'react';
import { GenresContext } from '../../context/genres.context';
import { MoviesUserContext } from '../../context/moviesUser.context';
import { MoviesPublicContext } from '../../context/moviesPublic.context';


interface AddMovieProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}
interface MovieData {
    title: string;
    genres: string[];
    score: number;
    imageList: FileList | null;
}


export const ModalAddMovie: React.FC<AddMovieProps> = ({ isOpen, handleCloseModal }) => {

    const [formData, setFormData] = useState<MovieData>({
        title: '',
        genres: [],
        score: 0,
        imageList: null,
    });

    const { user, getAccessTokenSilently } = useAuth0();
    const { genresAll } = useContext(GenresContext);
    const { arrayMoviesUser, handleArrayMoviesUser } = useContext(MoviesUserContext);
    const { arrayMovies, handleArrayMovies } = useContext(MoviesPublicContext);

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

            const newMovie = await createMovie(getAccessTokenSilently, formData, user);
            const updatedArrayMoviesUser = [...arrayMoviesUser, newMovie]
            handleArrayMoviesUser(updatedArrayMoviesUser)
            handleArrayMovies(updatedArrayMoviesUser)

            setFormData({
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

    const handleReset = () => {
        setFormData({
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
                    <h2>Add Movie</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </label>
                        <label>
                            Genre:
                            <select name="genres" onChange={handleChange} required>
                                <option value="">Select genre</option>
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
                            <button type="submit">Add</button>
                            <button type='button' onClick={handleReset}>Reset</button>
                            <button type='button' onClick={handleCloseModal}>Close</button>
                        </div>
                    </form>
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
    align-items: center;
}
label {
    gap: 2rem;
    padding: 1rem;
}
input, select {
    margin-left: 1rem;
}
.buttons-section {
    margin-bottom: 1rem;
    gap: 1rem;
}
button {
    margin: 0.5rem;
}


@media (max-width: ${breakpoints.mobile}px) {


}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;