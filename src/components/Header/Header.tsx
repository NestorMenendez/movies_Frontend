import styled from 'styled-components'
import breakpoints from '../../global/deviceVariables'
import { colors } from '../../global/theme'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { redirectUri } from '../../main'



export const Header = () => {

  const { isAuthenticated, loginWithPopup, logout, isLoading } = useAuth0();
  const navigate = useNavigate();


  const handleLogin = async () => {

    await loginWithPopup();

    navigate('/userhome')

  }


  return (

    <HeaderStyles>

      <div>
        your MOVIES dir
      </div>

      <div>
        {isAuthenticated && <button>ADD MOVIE</button>}
        {isAuthenticated ?
          <button onClick={() => logout({ logoutParams: { returnTo: redirectUri } })}>LOG-OUT</button> :
          <button onClick={() => handleLogin()}>LOG-IN</button>
        }
      </div>

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





@media (max-width: ${breakpoints.mobile}px) {


}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;