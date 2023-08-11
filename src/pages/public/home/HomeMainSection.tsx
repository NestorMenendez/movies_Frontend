import styled from 'styled-components';

import breakpoints from '../../../global/deviceVariables';

import { CardMovie } from '../../../components/cardMovie/CardMovie';
import { useEffect } from 'react';
import { getAllMovies } from '../../../api/movies.fetch';





export const HomeMainSection = async (props: Props) => {



  const arrayMovies = await getAllMovies();
  console.log(arrayMovies)

  return (


    <HomeMainSectionStyles>

      {arrayMovies.map()}

    </HomeMainSectionStyles>


  );
}


const HomeMainSectionStyles = styled.div`
grid-area: 2/1/12/7;
display: flex;
flex-wrap: wrap;
padding: 0.5rem 0 0.5rem 0;
gap: 1rem;
overflow-y: auto;

justify-content: space-evenly;
background-color: #dd1583;




@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;