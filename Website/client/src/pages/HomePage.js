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

import { getSimilarArtists, getArtistsFrom } from "../fetcher";
import MenuBar from "../components/MenuBar";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const artistColumns = [
  {
    title: "Artist",
    dataIndex: "artist_mb",
    key: "artist_mb",
    sorter: (a, b) => a.region.localeCompare(b.region),
  },
  {
    title: "Tags",
    dataIndex: "tags_lastfm",
    key: "tags_lastfm",
  },
  {
    title: "Listeners",
    dataIndex: "listeners_lastfm",
    key: "listeners_lastfm",
    sorter: (a, b) => a.get_similar_artists - b.get_similar_artists,
  },
];

class HomePage extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     topArtistResults: [],
  //     matchesPageNumber: 1,
  //     matchesPageSize: 10,
  //     pagination: null
  //   }
  // }

  constructor(props) {
    super(props);

    this.state = {
      countryQuery: "",
      dateQuery: "",
      artistsFromResults: [],
    };
    this.updateArtistsFromResults = this.updateArtistsFromResults.bind(this);
    this.handleDateQueryChange = this.handleDateQueryChange.bind(this);
    this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this);
  }
  
  handleDateQueryChange(event) {
    this.setState({ dateQuery: event.target.value });
  }
  
  handleCountryQueryChange(event) {
    this.setState({ countryQuery: event.target.value });
  }

  updateArtistsFromResults() {
    // getArtistsFrom(this.state.countryQuery, this.state.dateQuery, null, null).then((res) => {
    getArtistsFrom(null, null, null, null).then((res) => {
      this.setState({ artistsFromResults: res.results });
    });
  }

  componentDidMount() {
    getArtistsFrom(null, null, null, null).then((res) => {
      this.setState({ artistsFromResults: res.results });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Country</label>
                  <FormInput
                    placeholder="Country"
                    value={this.state.countryQuery}
                    onChange={this.handleCountryQueryChange}
                    />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Year</label>
                  <FormInput
                    placeholder="Year"
                    value={this.state.dateQuery}
                    onChange={this.handleDateQueryChange}
                    />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "10vw" }}>
                  <Button
                    style={{ marginTop: "4vh" }}
                    onClick={this.updateArtistsFromResults}
                    >
                    Search
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <h3>Most popular artists from selected country</h3>
          
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
              title="Artist"
              dataIndex="artist_mb"
              key="artist_mb"
              sorter={(a, b) => a.Artist.localeCompare(b.Artist)}
            />
            <Column title="Tags" dataIndex="tags_lastfm" key="Tags" />
            <Column
              title="Listeners"
              dataIndex="listeners_lastfm"
              key="listeners_lastfm"
              sorter={(a, b) => a.Listeners - b.Listeners}
            />
          </Table>

          <h3>Most popular artists in selected country</h3>

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
              title="Artist"
              dataIndex="artist_mb"
              key="artist_mb"
              sorter={(a, b) => a.Artist.localeCompare(b.Artist)}
            />
            <Column title="Tags" dataIndex="tags_lastfm" key="Tags" />
            <Column
              title="Listeners"
              dataIndex="listeners_lastfm"
              key="listeners_lastfm"
              sorter={(a, b) => a.Listeners - b.Listeners}
            />
          </Table>

          
        </div>
      </div>
    );
  }
}

export default HomePage;
