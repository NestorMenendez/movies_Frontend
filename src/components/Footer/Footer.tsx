import styled from 'styled-components';

type Props = {}

export const Footer = (props: Props) => {



  return (

    <FooterStyles>

        PRUEBA DE FOOTER

    </FooterStyles>


  )
}


const FooterStyles = styled.div`
grid-area: 10/1/11/7;
background-color: red;




@media (max-width: ${breakpoints.mobile}px) {



}


@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px) {
background-color: green;


}


@media (min-width: ${breakpoints.tablet}px) {



}
`;