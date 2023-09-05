// import { GridDisplayStyles } from "../../../global/gridDisplay.styles"
import { Header } from "../../../components/header/Header"
import { HomeMainSection } from "./HomeMainSection"
import { Footer } from "../../../components/footer/Footer"
import breakpoints from "../../../global/deviceVariables"
import backgroundImg from '../../../assets/img/Background_movies.jpg';

import { useAuth0 } from "@auth0/auth0-react"



export const HomePage = () => {

  const { logout, user, isLoading } = useAuth0();

  if (isLoading) { }


  return (

    <GridDisplayStyles>
      <Header />
      <HomeMainSection />
      <Footer />
    </GridDisplayStyles>

  )
}


import styled from 'styled-components';


const GridDisplayStyles = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(12, 1fr);
height: 100vh;
width: 100vw;

background-image: url(${backgroundImg});
object-fit: cover;

@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {



}


@media (min-width: ${breakpoints.tablet}px) {



}
`;