import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react'
import breakpoints from '../../../global/deviceVariables';
import { colors } from '../../../global/theme';
import { CardMovie } from '../../../components/cardMovie/CardMovie';
import { useContext, useState } from 'react';
import { MoviesPublicContext } from '../../../context/moviesPublic.context';
import { MoviesUserContext } from '../../../context/moviesUser.context';
import { ModalEditMovie } from '../../../components/modalEditMovie/ModalEditMovie';


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


export const HomeMainSection = () => {

  const { isAuthenticated, loginWithPopup, logout, isLoading, user } = useAuth0();
  const { arrayMovies } = useContext(MoviesPublicContext);
  const { arrayMoviesUser } = useContext(MoviesUserContext);
  const [userZone, setUserZone] = useState(true);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

  const toogleUserZone = () => {
    setUserZone(!userZone);
  }
  const openModalEdit = ({ id, title, score, genres, image }: MovieProps) => {
    const movie = { id, title, score, genres, image }
    setSelectedMovie(movie);
    setIsModalEditOpen(true);
  }


  return (
    <HomeMainSectionStyles>
      {isAuthenticated && (
        <section className='movies-selector'>
          <span onClick={() => toogleUserZone()} className={userZone ? 'inactive selector' : 'active selector'}>All movies</span>
          <span onClick={() => toogleUserZone()} className={userZone ? 'active selector' : 'inactive selector'}>User movies</span>
        </section>
      )}
      <MoviesSectionStyles>
        {isAuthenticated && userZone
          ? arrayMoviesUser?.map(({ id, title, score, genres, image }) => (
            <CardMovie key={id} id={id} title={title} score={score} genres={genres} image={image} openModalEdit={openModalEdit} />
          ))
          : arrayMovies?.map(({ id, title, score, genres, image }) => (
            <CardMovie key={id} id={id} title={title} score={score} genres={genres} image={image} openModalEdit={isAuthenticated && userZone ? openModalEdit : undefined} />
          ))}

        {isAuthenticated && userZone && isModalEditOpen &&
          <ModalEditMovie isOpen={isModalEditOpen} handleCloseModal={() => setIsModalEditOpen(false)} selectedMovie={selectedMovie}></ModalEditMovie>
        }

      </MoviesSectionStyles>
    </HomeMainSectionStyles >

  );
};


const HomeMainSectionStyles = styled.div`
grid-area: 2/1/12/7;
display: flex;
flex-direction: column;


.movies-selector {
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;

  background: #ffffff;
  opacity: 0.75;
  /* color: ${colors.secondary}; */

}
.selector {
  cursor: pointer;
}
.active {
  font-weight: bold;
  font-size:1.4rem;
  color: ${colors.aux};
}
.inactive {
  font-weight: lighter;
  font-style: italic;
  font-size:1.2rem;
  /* font-size: 1.2rem; */
  color: ${colors.aux2}
}

@media (max-width: ${breakpoints.mobile}px) {

}

@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {


}

@media (min-width: ${breakpoints.tablet}px) {

}
`;

const MoviesSectionStyles = styled.div`
display: flex;
flex-wrap: wrap;
padding: 0.5rem 0 0.5rem 0;
gap: 1rem;
overflow-y: auto;

justify-content: space-evenly;


.movies-selector {
  display: block;
}

@media (max-width: ${breakpoints.mobile}px) {

}

@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {


}

@media (min-width: ${breakpoints.tablet}px) {

}
`;