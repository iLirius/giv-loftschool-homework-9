import * as React from "react";
import { Header as SemanticHeader } from "semantic-ui-react";
import styled from "styled-components";
import { LineChart } from "react-chartkick";

import LogoWhite from "../../assets/img/Logo-white.svg";

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
const User = styled.div`
  font-weight: 600;
`;
class Trade extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header>
          <Wraper>
            <HeaderLogo>
              <ResponsiveImg src={LogoWhite} />
            </HeaderLogo>
            <CryptoCurrencySelector>
              <div>1</div>
              <div>1</div>
            </CryptoCurrencySelector>
            <User>User email</User>
          </Wraper>
        </Header>
        <Main>
          <Contener>
            <SemanticHeader as="h1">Окно графика</SemanticHeader>
            {/*
            <LineChart
              data={[
                { name: "Продажа", data: sellEth },
                { name: "Покупка", data: purchaseEth },
              ]}
              min={minEth}
              max={maxEth}
              width={750}
              height={400}
            />*/}
          </Contener>
        </Main>
        <Footer>
          <Contener>22</Contener>
        </Footer>
      </React.Fragment>
    );
  }
}
export default Trade;
