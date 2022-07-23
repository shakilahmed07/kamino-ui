import { Col, Row, Card, Spinner } from "react-bootstrap";
function Mynfs(props) {
    const getSelNftStyle = (obj) => {
      let objStyle = 'imageGrid';
      if(props.selNfts) {
        for(const selobj of props.selNfts) {
          if(selobj.mint === obj.mint) {
            objStyle = 'selImageGrid';
          }
        }
      }
      if(props.stakedNfts) {
        for(const selobj of props.stakedNfts) {
          if(selobj.mint === obj.mint) {
            objStyle = 'stakedImageGrid';
          }
        }
      }
      if(props.unstakedNfts) {
        for(const selobj of props.unstakedNfts) {
          if(selobj.mint === obj.mint) {
            objStyle = 'selImageGrid';
          }
        }
      }
      return objStyle;
    }
    return (
      <div className='h-64 bg-black rounded-b-xl rounded-tr-xl myscroll overflow-y-auto overflow-x-hidden'>
        {props.loading && (
          <div className="loading h-full">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Row className='px-3'>
          {/* {!props.loading && props.stakedNfts &&
            props.stakedNfts.map((metadata, index) => (
              <Col xs="6" md="4" lg="4" key={index} className='mt-3' >
                <Card
                  onClick={() => {
                    props.selStakedNfts(metadata);
                  }}
                  className={getSelNftStyle(metadata)}
                  lg="3"
                  style={{
                    width: "100%",
                    backgroundColor: "#2B3964",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={metadata?.image}
                    alt={metadata?.data.name}
                  />
                  
                </Card>
              </Col>
            ))} */}
          {!props.loading &&
            props.nfts.map((metadata, index) => (
              <Col xs="6" md="4" lg="4" key={index} className='mt-3' >
                <Card
                  onClick={() => {
                    props.addRemainings(metadata);
                  }}
                  className={getSelNftStyle(metadata)}
                  lg="3"
                  style={{
                    width: "100%",
                    backgroundColor: "#2B3964",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={metadata?.image}
                    alt={metadata?.data.name}
                  />
                  
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
}

export default Mynfs;