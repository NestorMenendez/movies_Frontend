import styled from 'styled-components';

import breakpoints from '../../global/deviceVariables';
import { colors } from '../../global/theme';

type Props = {}

export const Footer = (props: Props) => {



  return (

    <FooterStyles>

        PRUEBA DE FOOTER

    </FooterStyles>


  )
}


const FooterStyles = styled.div`
grid-area: 12/1/13/7;
display: flex;
justify-content: center;
align-items: center;

background: linear-gradient(to bottom, #ffffff ,${colors.primary});




@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;