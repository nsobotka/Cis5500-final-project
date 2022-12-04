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

import { getSimilarArtists } from "../fetcher";
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
      artistQuery: "",
      topArtistResults: [],
    };
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this);
  }

  handleArtistQueryChange(event) {
    this.setState({ artistQuery: event.target.value });
  }

  updateSearchResults() {
    getSimilarArtists(this.state.artistQuery, null, null).then((res) => {
      this.setState({ topArtistResults: res.results });
    });
  }

  componentDidMount() {
    getSimilarArtists(null, null, null).then((res) => {
      this.setState({ topArtistResults: res.results });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
          <h3>Explore Artists and Songs</h3>
          {/* <Table dataSource={this.state.topArtistResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/> */}

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Artist</label>
                  <FormInput
                    placeholder="Name"
                    value={this.state.artistQuery}
                    onChange={this.handleArtistQueryChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "10vw" }}>
                  <Button
                    style={{ marginTop: "4vh" }}
                    onClick={this.updateSearchResults}
                  >
                    Search
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <Table
            // return {
            //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
            // };
            dataSource={this.state.topArtistResults}
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
