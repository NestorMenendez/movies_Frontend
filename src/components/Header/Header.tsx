import styled from 'styled-components'
import breakpoints from '../../global/deviceVariables'

type Props = {}

export const Header = (props: Props) => {



  return (

    <HeaderStyles>
        
        PRUEBA DE HEADER

    </HeaderStyles>

  )
}


const HeaderStyles = styled.div`
grid-area: 1/1/2/7;
background-color: #5119eb;




@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;