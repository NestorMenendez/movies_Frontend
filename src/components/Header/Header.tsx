import styled from 'styled-components'
import breakpoints from '../../global/deviceVariables'
import { colors } from '../../global/theme'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { redirectUri } from '../../main'
import { useState, useContext, useEffect } from 'react'
import { ModalAddMovie } from '../modalAddMovie/ModalAddMovie'
import { getAllMoviesByUser } from '../../api/movies.fetch'
import { MoviesUserContext } from '../../context/moviesUser.context'
import { createUser, verifyUser } from '../../api/user.fetch'

type MovieProps = {
  id: string,
  title: string,
  score: number,
  genres: { name: string }[],
  image: {
    public_id: string,
    secure_url: string
  }
}

export const Header = () => {

  //
  const { isAuthenticated, loginWithPopup, logout, isLoading, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  //ModalAddMovie
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  //
  const { arrayMoviesUser, handleArrayMoviesUser } = useContext(MoviesUserContext)
  //
  useEffect(() => {
    if (isAuthenticated) {
      async function getAllMoviesUserLauncher() {

        if (user?.email) {
          console.log(user?.email)
          const verifyUserInDB = await verifyUser(getAccessTokenSilently, user);
          if (verifyUserInDB?.email == 'notFound') {
            await createUser(getAccessTokenSilently, user);
          }
        }

        const newArrayMoviesUser: MovieProps[] = await getAllMoviesByUser(getAccessTokenSilently, user);
        handleArrayMoviesUser(newArrayMoviesUser);
        navigate('/userhome');
      }
      getAllMoviesUserLauncher();
    }
  }, [isAuthenticated]);
  //
  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
    }
  }
  //ModalAddMovie
  const handleOpenModal = () => {
    setIsModalAddOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  }

  return (

    <HeaderStyles>

      <div className='noOpa'>
        your MOVIES dir
      </div>

      <div>
        {isAuthenticated &&
          <button onClick={handleOpenModal}>ADD MOVIE</button>}
        {isAuthenticated ?
          <button onClick={() => logout({ logoutParams: { returnTo: redirectUri } })}>LOG-OUT</button> :
          <button onClick={() => handleLogin()}>LOG-IN</button>
        }
      </div>
      {isModalAddOpen &&
        <ModalAddMovie isOpen={isModalAddOpen} handleCloseModal={handleCloseModal} ></ModalAddMovie>
      }

    </HeaderStyles>

  )
}


const HeaderStyles = styled.div`
grid-area: 1/1/2/7;
display: flex;
flex-direction: row;
padding: 1rem;
align-items: center;
justify-content: space-between;

background: linear-gradient(to bottom, ${colors.primary}, #ffffff);
opacity: 0.75;

.noOpa{
  font-weight: bold;
  font-size: 1.5rem;
  opacity: 1;
}

button {
  margin: 0.5rem;
}

@media (max-width: ${breakpoints.mobile}px) {


}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {



}


@media (min-width: ${breakpoints.tablet}px) {



}
`;