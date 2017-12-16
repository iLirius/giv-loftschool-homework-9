import { compose, mapProps, pure, withHandlers } from "recompose";
import { connect } from "react-redux";
import { Header, Loader, Dimmer, Segment } from "semantic-ui-react";
import { LineChart } from "react-chartkick";
import * as React from "react";
import styled from "styled-components";
import {
  getIsBtcLoading,
  getIsEthLoading,
  getOffset,
  getMin,
  getMax,
  getSell,
  getPurchase,
} from "../../../reducers/currency";
import { selectOffset } from "../../../actions/currency";

const enhance = compose(
  connect(
    state => ({
      isBtcLoading: getIsBtcLoading(state),
      isEthLoading: getIsEthLoading(state),
      offset: getOffset(state),
      max: getMin(state),
      min: getMax(state),
      purchase: getPurchase(state),
      sell: getSell(state),
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
      handleChangeOffset,
      max,
      min,
      purchase,
      sell,
    }) => ({
      isBtcLoading,
      isEthLoading,
      selectOffset,
      offset,
      handleChangeOffset,
      max,
      min,
      purchase,
      sell,
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
        {(!isBtcLoading && !isEthLoading) === true && (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        )}{" "}
        {(isBtcLoading && isEthLoading) === true && (
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
