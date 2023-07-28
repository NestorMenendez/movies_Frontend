// import { GridDisplayStyles } from "../../../global/gridDisplay.styles"
import { Header } from "../../../components/Header/Header"
import { HomeMainSection } from "./HomeMainSection"
import { Footer } from "../../../components/Footer/Footer"

import breakpoints from "../../../global/deviceVariables"

const HomePage = () => {




  return (

    <GridDisplayStyles>
        <Header/>
        <HomeMainSection/>
        <Footer/>
    </GridDisplayStyles>

  )
}

export default HomePage

import styled from 'styled-components';


const GridDisplayStyles = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(10, 1fr);
height: 100vh;
width: 100vw;



@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;