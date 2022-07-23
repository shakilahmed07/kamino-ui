import React, { Fragment, useEffect, useMemo, useState } from 'react';
import './index.css';
import { Outlet, Route, Routes } from "react-router-dom";
import App from './App';
// import Dashboard from './views/Dashboard';
import Upcoming from './views/Upcoming';
import Featured from './views/Featured';
import Brawl from './views/Brawl';

import NavigationBar from "./navbar/NavigationBar";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import Footer from './navbar/footer';


// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
const Main = () => {

    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);
    const [variant, setVariant] = useState("primary");
    const [title, setTitle] = useState("Devnet");


    useEffect(() => {
        console.log(`Network changed ${network}`);
    }, [network]);

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);


    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network }),
      ],
      [network]
    );

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Fragment>
              <Routes>
                <Route exact path="/" element={<Layout />} >
                  <Route index element={<App connection={endpoint} />} />
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                  <Route path="/upcoming" element={<Upcoming />} />
                  <Route path="/featured" element={<Featured />} />
                  <Route path="/brawl" element={<Brawl />} />
                </Route>
              </Routes>
            </Fragment>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
}

function Layout(props) {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
}

export default Main;