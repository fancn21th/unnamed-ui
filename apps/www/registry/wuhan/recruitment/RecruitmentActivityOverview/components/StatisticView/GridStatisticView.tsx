import { Fragment } from "react";
import { Col, Flex, Row } from "antd";
import type {
  GridStatisticViewProps,
  RecruitmentProcessStatisticItem,
} from "../../types";
import { getStageLabel, transformToGridData } from "./utils";
import { StyledStageGrid, StyledStatusGrid } from "./styles";

export function GridStatisticView(props: GridStatisticViewProps) {
  const { processStatisticList } = props;

  const renderStatusGrid = (
    item: RecruitmentProcessStatisticItem,
    index: number,
  ) => {
    const gridData = transformToGridData(item);
    const data = gridData[index];
    return (
      <Col>
        <StyledStatusGrid
          gap={4}
          vertical
          key={index}
          align="center"
          justify="center"
        >
          <div className="status">{data?.label}</div>
          <div className="number">{data?.value}</div>
        </StyledStatusGrid>
      </Col>
    );
  };
  return (
    <Flex gap={8} vertical>
      {processStatisticList?.map((item) => {
        return (
          <Row>
            <Col>
              <StyledStageGrid align="center" justify="center">
                <div className="label">{getStageLabel(item.stage)}</div>
              </StyledStageGrid>
            </Col>
            {Array.from({ length: 4 }).map((_, index) => (
              <Fragment key={`col-${index}`}>
                {renderStatusGrid(item, index)}
              </Fragment>
            ))}
          </Row>
        );
      })}
    </Flex>
  );
}
