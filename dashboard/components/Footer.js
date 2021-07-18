import {Container, Content, Footer as FooterBulma} from 'react-bulma-components'


const Footer = () => {
    return (
        <FooterBulma>
            <Container>
                <Content style={{textAlign: 'center'}}>
                    <p>
                        Dashboard by
                        <a href="https://github.com/Debzou"> David ♡</a>
                    </p>
                </Content>
            </Container>
        </FooterBulma>
    )
}

export default Footer