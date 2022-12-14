import React from "react";
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {
  Table,
  Row,
  Col,
} from 'antd'

import { getArtistsFrom, getTopArtistsInRegion, tagsByRegion, tagsByRegion2, artistSongTypePopularity } from "../fetcher";
import MenuBar from "../components/MenuBar";
const { Column } = Table;

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
      selectedCountry: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
    };
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleSimilarityChange = this.handleSimilarityChange.bind(this);
    this.updateTop5InResults = this.updateTop5InResults.bind(this);
    this.updateArtistSongTypeResults = this.updateArtistSongTypeResults.bind(this);
    this.handleDateQueryChange = this.handleDateQueryChange.bind(this);
    this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this);
    this.goToArtist = this.goToArtist.bind(this)
  }

  goToArtist(artist) {
    window.location = `/artists?artist_mb=${artist}&page=${null}&pagesize=${null}`
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
    tagsByRegion2(this.state.selectedCountry).then((res) => {
      this.setState({ tagsResults: res.results });
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
        
        {/* User input for most popular artists in a country */}
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>

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
                  <Button style={{ marginTop: '3vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateTop5InResults}>Search</Button>
                </FormGroup></Col>
              </Col>
            </Row>
          </Form>
          <h3>Top 5 most popular artists in the given country</h3>

          <Table onRow={(record) => {
            return {
              onClick: event => {this.goToArtist(record.artist)}, 
            };}}
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
          
          {/* User input for the average number of appearances of similar songs */}
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
                  <Button style={{ marginTop: '3vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateArtistSongTypeResults}>Search</Button>
                </FormGroup></Col>
              </Col>
            </Row>
          </Form>
          <h3>Average number of chart appearances for similar styles of music </h3>

          <Table
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
