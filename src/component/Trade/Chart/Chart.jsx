import { compose, withHandlers, mapProps, pure } from "recompose";
import { connect } from "react-redux";
import { Header, Loader, Dimmer, Segment } from "semantic-ui-react";
import { LineChart } from "react-chartkick";
import { withRouter } from "react-router-dom";
import * as React from "react";
import styled from "styled-components";
import {
  getIsBtcLoading,
  getIsEthLoading,
  getOffset,
  getBtcData,
  getEthData,
  getSelected,
} from "../../../reducers/currency";
import { selectOffset } from "../../../actions/currency";

const enhance = compose(
  withRouter,
  connect(
    state => ({
      isBtcLoading: getIsBtcLoading(state),
      isEthLoading: getIsEthLoading(state),
      offset: getOffset(state),
      btc: getBtcData(state),
      eth: getEthData(state),
      currencyName: getSelected(state),
    }),
    { selectOffset },
  ),
  withHandlers({
    handleChangeOffset: props => ({ target: { value } }) =>
      props.selectOffset(value),
  }),
  // withProps(({}) => ({})),
  mapProps(
    ({
      isBtcLoading,
      isEthLoading,
      selectOffset,
      offset,
      btc,
      eth,
      handleChangeOffset,
      currencyName,
    }) => ({
      isBtcLoading,
      isEthLoading,
      selectOffset,
      offset,
      btc,
      eth,
      min: (currencyName === "btc" ? btc : eth).reduce(
        (acc, { sell, purchase }) => Math.min(acc, sell, purchase),
        Number.MAX_SAFE_INTEGER,
      ),
      max: (currencyName === "btc" ? btc : eth).reduce(
        (acc, { sell, purchase }) => Math.max(acc, sell, purchase),
        0,
      ),
      purchase: (currencyName === "btc" ? btc : eth).map(item => [
        new Date(item.mts),
        item.purchase,
      ]),
      sell: (currencyName === "btc" ? btc : eth).map(item => [
        new Date(item.mts),
        item.sell,
      ]),
      handleChangeOffset,
      currencyName,
    }),
  ),
  pure,
);

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

const offsets = {
  "2h": "2ч",
  "4h": "4ч",
  "8h": "8ч",
  "1d": "День",
  "7d": "Неделя",
};
const Chart = ({
  offset,
  isBtcLoading,
  isEthLoading,
  handleChangeOffset,
  min,
  max,
  purchase,
  sell,
}) => {
  return (
    <React.Fragment>
      <Header as="h2">Окно графика</Header>
      <OffsetsSelector>
        {Object.keys(offsets).map((keyName, index) => (
          <OffsetButton
            key={keyName}
            type="button"
            value={keyName}
            onClick={handleChangeOffset}
            bg={offset !== keyName ? "green" : "white"}
            colors={offset !== keyName ? "white" : "green"}
          >
            {offsets[keyName]}
          </OffsetButton>
        ))}
      </OffsetsSelector>
      <Segment style={{ width: "780px", height: "420px" }}>
        {!isBtcLoading && !isEthLoading ? (
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
            width={100 + "%"}
            height={100 + "%"}
          />
        )}
      </Segment>
    </React.Fragment>
  );
};

export default enhance(Chart);
