import styled from 'styled-components';
import breakpoints from '../../global/deviceVariables';
import { colors } from '../../global/theme';
import { useAuth0 } from '@auth0/auth0-react';


type Props = {
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
    },
    openModalEdit?: (movie: any) => void | null
}


export const CardMovie = (Props: Props) => {
    const { id, title, score, genres, image, openModalEdit } = Props;
    const imageUrl = image ? image.secure_url : '';
    const genresNames = genres.name;
    const { isAuthenticated } = useAuth0();

    const handleCardMovieClick = () => {
        if (typeof openModalEdit === 'function') {
            openModalEdit({ id, title, score, genres, image });
        }
    };

    return (

        <CardMovieStyles isAuthenticated={isAuthenticated}>
            <section className='card-container' onClick={handleCardMovieClick}>
                <div className='img-container'>
                    <img src={imageUrl}></img>
                </div>
                <div className='card-container__body'>
                    <h5>{title}</h5>
                    <h6>{genresNames}</h6>
                    <div>{score}</div>
                </div>
            </section>
        </CardMovieStyles>
    )
}

type CardMovieStylesProps = {
    isAuthenticated: boolean;
};

const CardMovieStyles = styled.div<CardMovieStylesProps>`
* {
    padding:0;
    margin:0;
}
.card-container{
    display: flex;
    flex-direction: column;
    background-color: ${colors.secondary};
    opacity: 0.9;
    border-radius: 0.5rem;

    &__body{
        flex-direction: column;
    }

}
.img-container {
    padding-top: 0.5rem;
    padding-left:0.5rem;
    padding-right:0.5rem;
    height: 25vh;
}
img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    /* padding: 0.5rem; */
}
${({ isAuthenticated }) => isAuthenticated && `
    cursor: pointer;
  `}


@media (max-width: ${breakpoints.mobile}px) {
    width: 45%;

    .img-container {
    height: 25vh;
}

}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
    width: 22%;

    .img-container {
    height: 25vh;
}

}


@media (min-width: ${breakpoints.tablet}px) {
    width: 18%;

    .img-container {
    height: 40vh;
}

}
`;