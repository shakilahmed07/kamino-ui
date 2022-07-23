import { Container, Dropdown, DropdownButton, Nav, Navbar, Image } from "react-bootstrap";
import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Link } from "react-router-dom";
import Brand from "../assets/brand/brand-logo.png";
import Logo from '../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { selectBalance } from '../features/balanceSlice';
const Navigationbar = (props) => {

  const balance = useSelector(selectBalance);
  // function onChange(val){

  //   if(val==="devnet"){
  //       props.setNetwork(WalletAdapterNetwork.Devnet);
  //       props.setTitle("Devnet");
  //       props.setVariant("primary");
  //   } else if(val==="testnet"){
  //       props.setNetwork(WalletAdapterNetwork.Testnet);
  //       props.setTitle("Testnet");
  //       props.setVariant("warning");
  //   } else if(val==="mainnet"){
  //       props.setNetwork(WalletAdapterNetwork.Mainnet);
  //       props.setTitle("Mainnet");
  //       props.setVariant("success");
  //   }
    
  // }

  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant="dark" className="bg-black">
      <Container>
        <Navbar.Brand style={{ color: "#fff" }}>
          <Link to='/'><Image src={Brand} className="w-24 md:w-40" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto me-auto">
            <Nav.Link to='/upcoming' className="ml-10 nav-btn">UPCOMING</Nav.Link>
            <Nav.Link to='/featured' className="ml-10 nav-btn">FEATURED</Nav.Link>
            <Nav.Link to='/brawl' className="ml-10 nav-btn">BRAWL</Nav.Link>
            
          </Nav>
          <Nav>
          <Nav.Link className="">
              <div className='flex align-items-center'>
                <Image src={Logo} className='h-10' />
                <h3 className='text-white '>{Math.floor(balance)}</h3>
              </div>
            </Nav.Link>
            <Nav.Link eventKey={2} to="#memes">
              <WalletMultiButton className="wallet-btn"/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigationbar;
