import { Col, Row, Card } from "react-bootstrap";

function Stakenft(props) {
    return (
      <Row className='h-64 border-2 rounded-xl border-black overflow-x-auto'>
        {!props.loading &&
            props.stakedNfts.map((metadata, index) => (
              <Col xs="6" md="6" lg="4" key={index}>
                <Card
                  
                  className="imageGrid"
                  lg="3"
                  style={{
                    width: "100%",
                    backgroundColor: "#5B3964",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={metadata?.image}
                    alt={metadata?.data.name}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "#fff" }}>
                      {metadata?.data.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
        ))}
        {!props.loading &&
            props.remainings.map((metadata, index) => (
              <Col xs="6" md="6" lg="4" key={index}>
                <Card
                  onClick={() => {
                    props.unStake(metadata);
                  }}
                  className="imageGrid"
                  lg="3"
                  style={{
                    width: "100%",
                    backgroundColor: "#2b3964",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={metadata?.image}
                    alt={metadata?.data.name}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "#fff" }}>
                      {metadata?.data.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
        ))}          
      </Row>
    );
}

export default Stakenft;