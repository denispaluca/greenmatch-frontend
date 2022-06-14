import { Col, Row } from "antd";

export function ContractDetails(props: any) {
  return (
    <>
      <Row>
        <Col span={props.labelWidth}>
          <p>Supplier:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.supplier}</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Buyer:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.buyer}</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Type:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.type}</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Plant:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.plant}</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Duration:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.duration} Years</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Amount:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.amount} kWh/year</p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Price:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.price} cents/kWh </p>
        </Col>
      </Row>
      <Row>
        <Col span={props.labelWidth}>
          <p>Starting Date:</p>
        </Col>
        <Col span={props.contentWidth}>
          <p>{props.ppaData.start.toString()}</p>
        </Col>
      </Row>
    </>
  );
}
