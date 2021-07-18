
import NavBar from './NavBar';
import Footer from './Footer';
import Svgfooter from './SvgFooter';

const Layout = ({children}) => {

   
   return (
        <>
            <div className="mainContent">
               <NavBar/>
               {children}  
            </div>
            <Svgfooter/>
            <Footer/>
        </>
    )
}

export default Layout;