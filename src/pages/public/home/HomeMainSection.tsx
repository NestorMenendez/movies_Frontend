import styled from 'styled-components';
import breakpoints from '../../../global/deviceVariables';

type Props = {}

export const HomeMainSection = (props: Props) => {


  return (


    <HomeMainSectionStyles>

        PRUEBA DE HomeMainSection
    
    </HomeMainSectionStyles>


  )
}


const HomeMainSectionStyles = styled.div`
grid-area: 2/1/10/7;
background-color: #dd1583;




@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;