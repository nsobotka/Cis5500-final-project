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

import { getArtistsFrom, getTopArtistsInRegion, tagsByRegion, artistSongTypePopularity } from "../fetcher";
import MenuBar from "../components/MenuBar";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      countryQuery: "",
      dateQuery: "",
      artist: "",
      similarity: 0.1,
      top5InResults: [],
      artistsFromResults: [],
      tagsResults: [],
      artistSongTypeResults: [],
    };
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleSimilarityChange = this.handleSimilarityChange.bind(this);
    this.updateTop5InResults = this.updateTop5InResults.bind(this);
    this.updateArtistSongTypeResults = this.updateArtistSongTypeResults.bind(this);
    this.handleDateQueryChange = this.handleDateQueryChange.bind(this);
    this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this);
  }
  
  handleDateQueryChange(event) {
    this.setState({ dateQuery: event.target.value });
  }

  handleArtistChange(event) {
    this.setState({ artist: event.target.value });
  }
  handleSimilarityChange(event) {
    this.setState({ similarity: event.target.value });
  }
  
  handleCountryQueryChange(event) {
    this.setState({ countryQuery: event.target.value });
  }

  updateTop5InResults() {
    getTopArtistsInRegion(this.state.countryQuery, this.state.dateQuery).then((res) => {
      this.setState({ top5InResults: res.results });
    });
  }

  updateArtistSongTypeResults() {
    artistSongTypePopularity(this.state.artist, this.state.similarity).then((res) => {
      this.setState({ artistSongTypeResults: res.results });
    });
  }

  componentDidMount() {
    getTopArtistsInRegion(this.state.countryQuery, this.state.dateQuery).then((res) => {
      this.setState({ top5InResults: res.results });
    });
    getArtistsFrom(null, null, null, null).then((res) => {
      this.setState({ artistsFromResults: res.results });
    });
    tagsByRegion().then((res) => {
      this.setState({ tagsResults: res.results });
    });
    artistSongTypePopularity(this.state.artist, this.state.similarity).then((res) => {
      this.setState({ artistSongTypeResults: res.results });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>

          <h3>Most popular artists from each country</h3>
          
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

          <h3>Most popular tags from each country</h3>

          <Table
            dataSource={this.state.tagsResults}
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
            <Column title="Tags" dataIndex="tags_lastfm" key="tags_lastfm" />
            <Column
              title="Popularity"
              dataIndex="popularity"
              key="popularity"
              sorter={(a, b) => a.popularity - b.popularity}
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
          <h3>Top 5 most popular artists in the given country</h3>

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

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Artist</label>
                  <FormInput
                    placeholder="Eminem"
                    value={this.state.artist}
                    onChange={this.handleArtistChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Similarity</label>
                  <FormInput
                    placeholder="0.1"
                    value={this.state.similarity}
                    onChange={this.handleSimilarityChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                  <Button style={{ marginTop: '4vh' }} onClick={this.updateArtistSongTypeResults}>Search</Button>
                </FormGroup></Col>
              </Col>
            </Row>
          </Form>
          <h3>Average number of chart appearances from artists from the same country with similar songs</h3>

          <Table
            // return {
            //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
            // };
            dataSource={this.state.artistSongTypeResults}
            pagination={{
              pageSizeOptions: [5, 10],
              defaultPageSize: 5,
              showQuickJumper: true,
            }}
          >
            <Column
              title="Chart"
              dataIndex="chart"
              key="chart"
            />
            <Column
              title="Region"
              dataIndex="region"
              key="region"
              sorter={(a, b) => a.region.localeCompare(b.region)}
            />
            <Column
              title="Average Appearances"
              dataIndex="avg_appearances"
              key="avg_appearances"
              sorter={(a, b) => a.avg_appearances - b.avg_appearances}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default HomePage;
