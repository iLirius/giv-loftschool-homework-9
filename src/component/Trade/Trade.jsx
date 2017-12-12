import * as React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LogoWhite from "../../assets/img/Logo-white.svg";
import { getSelected, getBtcData, getEthData } from "../../reducers/currency";

import { selectBtc, selectEth } from "../../actions/currency";

import Operations from "./Operations";
import Wallet from "./Wallet";
import Chart from "./Chart";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2c2e;
  max-height: 80px;
  color: #fff;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  // align-items: center;
  align-content: space-between;
  width: 100%;
  flex-grow: 1;
  margin: 0 auto;
  padding: 25px 0 7px;
  width: 100%;
  max-width: 1200px;
`;
const OperationsWallet = styled.div`
  flex: 1 1 auto;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2c2e;
  min-height: 80px;
  color: #fff;
  width: 100%;
`;

const Contener = styled.div`
  margin: 0 auto;
  padding: 7px 15px;
  width: 100%;
  max-width: 1200px;
`;

const HeaderLogo = styled.div`
  width: 180px;
  heigth: 100%;
`;

const ResponsiveImg = styled.img`
  src: url(${props => props.src});
  alt: url(${props => props.alt});
  width: auto;
  height: 100%;
`;
const Wraper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const CryptoCurrencySelector = styled.div`
  display: flex;
  flex-direction: row;
`;
const CryptoCurrencyActive = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 80px;
  justify-content: center;
  margin: 0 8px;
  text-decoration: none;
  cursor: auto;
  color: white;
`;
const CryptoCurrencyDisable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 80px;
  justify-content: center;
  margin: 0 8px;
  text-decoration: none;
  cursor: pointer;
  color: #aaa;
`;
const User = styled.div`
  font-weight: 600;
`;

class Trade extends React.PureComponent {
  componentDidMount() {
    const { location, selectEth } = this.props;
    if (location.pathname === "/trade/eth") {
      selectEth();
    }
  }

  handleChangeCurrency = () => {
    const { selected, selectEth, selectBtc } = this.props;
    selected !== "btc" ? selectBtc() : selectEth();
  };
  /**
   * @param [array] currency
   */
  getCurrency = currency => {
    let sell = 0;
    if (currency.length) {
      sell = currency.slice(0, 1)[0].sell;
    }
    return sell;
  };

  render() {
    const { selected, btc, eth } = this.props;

    return (
      <React.Fragment>
        <Header>
          <Wraper>
            <HeaderLogo>
              <ResponsiveImg src={LogoWhite} />
            </HeaderLogo>
            <CryptoCurrencySelector>
              {selected === "btc" ? (
                <CryptoCurrencyActive>
                  {this.getCurrency(btc)}
                  <b>1 BTC</b>
                </CryptoCurrencyActive>
              ) : (
                <Link to="/trade/btc" onClick={this.handleChangeCurrency}>
                  <CryptoCurrencyDisable>
                    {this.getCurrency(btc)}
                    <b>1 BTC</b>
                  </CryptoCurrencyDisable>
                </Link>
              )}
              {selected === "eth" ? (
                <CryptoCurrencyActive>
                  {this.getCurrency(eth)}
                  <b>1 ETH</b>
                </CryptoCurrencyActive>
              ) : (
                <Link to="/trade/eth" onClick={this.handleChangeCurrency}>
                  <CryptoCurrencyDisable>
                    {this.getCurrency(eth)}
                    <b>1 ETH</b>
                  </CryptoCurrencyDisable>
                </Link>
              )}
            </CryptoCurrencySelector>
            <User>User email</User>
          </Wraper>
        </Header>
        <Main>
          <OperationsWallet>
            <Wallet />
            <Operations />
          </OperationsWallet>
          <div>
            <Chart />
          </div>
        </Main>
        <Footer>
          <Contener>2Footer2</Contener>
        </Footer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  selected: getSelected(state),
  btc: getBtcData(state),
  eth: getEthData(state),
});

const mapDispatchToProps = { selectBtc, selectEth };

// export default Trade;
export default connect(mapStateToProps, mapDispatchToProps)(Trade);
