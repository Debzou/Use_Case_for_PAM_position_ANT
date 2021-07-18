import {useState} from "react"
import{Navbar} from "react-bulma-components"
import Link from 'next/link';


// NavBar
const NavBar = (props) => {

    const [isActived, setInverse] = useState(false);
  
    // Render html

    return (
        <Navbar  active={isActived}>
        <Navbar.Brand>
            <Navbar.Item renderAs="a" href="/">
            <img src="/logo.png" alt="logo" width="40"
                            />
            </Navbar.Item>
            <Navbar.Burger onClick={() => setInverse(!isActived)} />
        </Navbar.Brand>
        <Navbar.Menu >
            <Navbar.Container>            
            <Link href={"/"}>
                <Navbar.Item className="navitemStyle">
                    Home
                </Navbar.Item>
            </Link>        
            </Navbar.Container>
        </Navbar.Menu>
        </Navbar>
    ); 
}

export default NavBar;