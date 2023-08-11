import styled from 'styled-components';
import breakpoints from '../../global/deviceVariables';
import { colors } from '../../global/theme';

type Props = {
    title: string,
    score: number,
    genres: [],
    image: {
        public_id: string,
        secure_url: string
    }
} //TOFIX hay que traerse las props de la carta... que vienen definidas en el proyecto -> ver el GIT.

export const CardMovie = (Props: Props) => {
    const { title, score, genres, image } = Props;
    return (

        <CardMovieStyles>
            <section className='card-container'>
                <img src={image.secure_url}></img>
                <div className='card-container__body'>
                    <h5>{title}</h5>
                    <h6>{genres}</h6>
                    <div>{score}</div>
                </div>
            </section>
        </CardMovieStyles>
    )
}

const CardMovieStyles = styled.div`
* {
    padding:0;
    margin:0;
}
.card-container{
    display: flex;
    flex-direction: column;
    background-color: ${colors.primary};

    &__body{
        flex-direction: column;
    }

}


@media (max-width: ${breakpoints.mobile}px) {
    width: 45%;

}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
    width: 22%;


}


@media (min-width: ${breakpoints.tablet}px) {
    width: 18%;


}
`;