import * as React from "react";
import {
  Header as SemanticHeader,
  Loader,
  Dimmer,
  Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import { LineChart } from "react-chartkick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LogoWhite from "../../assets/img/Logo-white.svg";
import {
  getIsBtcLoading,
  getIsEthLoading,
  getOffset,
  getSelected,
  getBtcData,
  getEthData,
} from "../../reducers/currency";

import { selectBtc, selectEth, selectOffset } from "../../actions/currency";

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
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
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

const OffsetsSelector = styled.div`
  margin-bottom: 12px;
`;

const OffsetButton = styled.button`
  border: 1px solid green;
  margin: 0 4px;
  background-color: ${props => props.bg};
  color: ${props => props.colors};
  padding: 2px 16px;
  cursor: pointer;
`;

const offsets = { "2h": "2ч", "4h": "4ч", "8h": "8ч", "1d": "1д", "7d": "7д" };

class Trade extends React.PureComponent {
  componentDidMount() {
    const { location, selectEth } = this.props;
    if (location.pathname === "/trade/eth") {
      selectEth();
    }
  }
  handleChangeOffset = event => {
    const { value } = event.target;
    const { selectOffset } = this.props;
    selectOffset(value);
  };
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

  getPurchaseSell = () => {
    const { selected } = this.props;
    const currency = this.props[selected];
    let sell = {};
    let purchase = {};
    let x = 0;
    for (let i = currency.length; i--; ) {
      purchase[new Date(currency[i].mts)] = currency[i].purchase;
      sell[new Date(currency[i].mts)] = currency[i].sell;
    }
    return { purchase, sell };
  };

  getMinMax = () => {
    const { selected } = this.props;
    const currency = this.props[selected];

    return {
      min: currency.reduce(
        (acc, { sell, purchase }) => Math.min(acc, sell, purchase),
        Number.MAX_SAFE_INTEGER,
      ),
      max: currency.reduce(
        (acc, { sell, purchase }) => Math.max(acc, sell, purchase),
        0,
      ),
    };
  };

  render() {
    const {
      selected,
      offset,
      btc,
      eth,
      isBtcLoading,
      isEthLoading,
    } = this.props;
    const { min, max } = this.getMinMax();
    const { purchase, sell } = this.getPurchaseSell();

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
          <Contener>
            <SemanticHeader as="h1">Окно графика</SemanticHeader>
            <OffsetsSelector>
              {Object.keys(offsets).map((keyName, index) => (
                <OffsetButton
                  key={keyName}
                  type="button"
                  value={keyName}
                  onClick={this.handleChangeOffset}
                  bg={offset !== keyName ? "green" : "white"}
                  colors={offset !== keyName ? "white" : "green"}
                >
                  {offsets[keyName]}
                </OffsetButton>
              ))}
            </OffsetsSelector>
            <Segment style={{ width: "780px", height: "420px" }}>
              {!isBtcLoading && !isEthLoading && min > 0 ? (
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              ) : (
                <LineChart
                  data={[
                    { name: "Продажа", data: sell },
                    { name: "Покупка", data: purchase },
                  ]}
                  min={min}
                  max={max}
                  width={750}
                  height={400}
                />
              )}
            </Segment>
          </Contener>
        </Main>
        <Footer>
          <Contener>2Footer2</Contener>
        </Footer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isBtcLoading: getIsBtcLoading(state),
  isEthLoading: getIsEthLoading(state),
  offset: getOffset(state),
  selected: getSelected(state),
  btc: getBtcData(state),
  eth: getEthData(state),
});

const mapDispatchToProps = { selectBtc, selectEth, selectOffset };

// export default Trade;
export default connect(mapStateToProps, mapDispatchToProps)(Trade);
