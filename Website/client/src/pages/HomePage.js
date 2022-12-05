import React from "react";
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider,
  Slider,
  Rate
} from 'antd'

import { getArtistsFrom, getTopArtistsInRegion } from "../fetcher";
import MenuBar from "../components/MenuBar";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      countryQuery: "",
      dateQuery: "",
      top5InResults: [],
      artistsFromResults: [],
    };
    this.updateTop5InResults = this.updateTop5InResults.bind(this);
    this.handleDateQueryChange = this.handleDateQueryChange.bind(this);
    this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this);
  }
  
  handleDateQueryChange(event) {
    this.setState({ dateQuery: event.target.value });
  }
  
  handleCountryQueryChange(event) {
    this.setState({ countryQuery: event.target.value });
  }

  updateTop5InResults() {
    getTopArtistsInRegion(this.state.countryQuery, this.state.dateQuery).then((res) => {
      this.setState({ top5InResults: res.results });
    });
  }

  componentDidMount() {
    getTopArtistsInRegion(this.state.countryQuery, this.state.dateQuery).then((res) => {
      this.setState({ top5InResults: res.results });
    });
    getArtistsFrom(null, null, null, null).then((res) => {
      this.setState({ artistsFromResults: res.results });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>

          <h3>Most popular artists</h3>
          
          <Table
            // return {
            //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
            // };
            dataSource={this.state.artistsFromResults}
            pagination={{
              pageSizeOptions: [5, 10],
              defaultPageSize: 5,
              showQuickJumper: true,
            }}
          >
            <Column
              title="Country"
              dataIndex="country_mb"
              key="country_mb"
              sorter={(a, b) => a.country_mb.localeCompare(b.country_mb)}
            />
            <Column title="Artist" dataIndex="artist_mb" key="artist_mb" sorter={(a, b) => a.artist_mb.localeCompare(b.artist_mb)} />
            <Column
              title="Listeners"
              dataIndex="num_listeners"
              key="num_listeners"
              sorter={(a, b) => a.num_listeners - b.num_listeners}
            />
          </Table>

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Country</label>
                  <FormInput
                    placeholder="United States"
                    value={this.state.countryQuery}
                    onChange={this.handleCountryQueryChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Year</label>
                  <FormInput
                    placeholder="2020"
                    value={this.state.dateQuery}
                    onChange={this.handleDateQueryChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                  <Button style={{ marginTop: '4vh' }} onClick={this.updateTop5InResults}>Search</Button>
                </FormGroup></Col>
              </Col>
            </Row>
          </Form>
          <h3>Top 5 Most popular artists</h3>

          <Table
            // return {
            //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
            // };
            dataSource={this.state.top5InResults}
            pagination={{
              pageSizeOptions: [5, 10],
              defaultPageSize: 5,
              showQuickJumper: true,
            }}
          >
            <Column
              title="Artist"
              dataIndex="artist"
              key="artist"
              sorter={(a, b) => a.artist.localeCompare(b.artist)}
            />
            <Column
              title="Chart Appearances"
              dataIndex="artist_freq"
              key="artist_freq"
              sorter={(a, b) => a.artist_freq - b.artist_freq}
            />
          </Table>

          
        </div>
      </div>
    );
  }
}

export default HomePage;
