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
            <Link to='/upcoming' className="ml-10 nav-btn">UPCOMING</Link>
            <Link to='/featured' className="ml-10 nav-btn">FEATURED</Link>
            <Link to='/brawl' className="ml-10 nav-btn">BRAWL</Link>
            
          </Nav>
          <Nav>
          <Link to='' className="nav-btn"style={{marginTop:"14px",marginLeft:'31px'}}>
              <div className='flex'>
                <Image src={Logo} className='h-10 mt-1' />
                <h3 className='text-white mt-1 ml-1' >{Math.floor(balance)}</h3>
              </div>
            </Link>
            <Link eventKey={2} to="#memes" style={{marginTop:"10px",marginLeft:'16px'}}>
              <WalletMultiButton className="wallet-btn"/>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigationbar;