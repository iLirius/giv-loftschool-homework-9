import {
  compose,
  /*withHandlers,*/ mapProps,
  lifecycle,
  pure,
} from "recompose";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import * as React from "react";
import styled from "styled-components";

import {
  getCoinsUsd,
  getCoinsBtc,
  getCoinsEth,
} from "../../../reducers/wallet";

const enhance = compose(
  connect(
    state => ({
      usd: getCoinsUsd(state),
      btc: getCoinsBtc(state),
      eth: getCoinsEth(state),
    }),
    {
      /*fetchWalletRequest*/
    },
  ),
  mapProps(({ usd, btc, eth /*, fetchWalletRequest*/ }) => ({
    usd,
    btc,
    eth,
    // fetchWalletRequest,
  })),
  lifecycle({
    componentDidMount() {
      // fetchWalletRequest();
    },
  }),
  pure,
);

const Wraper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 298px;
  width: 100%;
`;

const Budget = styled.div`
  background-color: #414244;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  flex: 1 1 150px;
  margin: 5px 0;
  font-size: 1.2rem;
`;
const CurrencySymbol = styled.div`
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;
const WholePart = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;
const FractionalPart = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Wallet = ({ usd, btc, eth }) => {
  return (
    <div>
      <Header as="h2">Ваш счет</Header>
      <Wraper>
        <Budget>
          <WholePart>{usd[0]}</WholePart>.
          <FractionalPart>{usd[1] ? usd[1] : 0}</FractionalPart>
        </Budget>
        <CurrencySymbol>$</CurrencySymbol>
      </Wraper>
      <Wraper>
        <Budget>
          <WholePart>{btc[0]}</WholePart>.
          <FractionalPart>{btc[1] ? btc[1] : 0}</FractionalPart>
        </Budget>
        <CurrencySymbol>BTC</CurrencySymbol>
      </Wraper>
      <Wraper>
        <Budget>
          <WholePart>{eth[0]}</WholePart>.
          <FractionalPart>{eth[1] ? eth[1] : 0}</FractionalPart>
        </Budget>
        <CurrencySymbol>ETH</CurrencySymbol>
      </Wraper>
    </div>
  );
};

export default enhance(Wallet);
