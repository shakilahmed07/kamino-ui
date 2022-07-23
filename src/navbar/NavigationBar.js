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
    <Navbar collapseOnSelect expand="lg" className="bg-black">
      <Container>
        <Navbar.Brand style={{ color: "#fff" }}>
          <Link to='/'><Image src={Brand} className="w-24 md:w-40" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Link to='/upcoming' className="nav-btn">UPCOMING</Link>
          <Nav className="me-auto"></Nav>
          <Link to='/featured' className="nav-btn">FEATURED</Link>
          <Nav className="me-auto"></Nav>
          <Link to='/brawl' className="nav-btn">BRAWL</Link>
          <Nav className="me-auto"></Nav>
          <div className='flex justify-end'>
            <Image src={Logo} className='h-10' />
            <h3 className='flex justify-end text-white items-center m-0'>{Math.floor(balance)}</h3>
          </div>
          {/* <Nav>
            <DropdownButton
              variant={props.variant.toLowerCase()}
              id="dropdown-basic-button"
              title={props.title}
              onSelect={(evt) => onChange(evt)}
            >
              <Dropdown.Item eventKey="devnet">Devnet</Dropdown.Item>
              <Dropdown.Item eventKey="mainnet">Mainnet</Dropdown.Item>
              <Dropdown.Item eventKey="testnet">Testnet</Dropdown.Item>
            </DropdownButton>
          </Nav> */}
          <Nav>
            <Nav.Link></Nav.Link>
            <WalletMultiButton className="wallet-btn"/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigationbar;
