import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,
    Slider,
} from 'antd'
import MenuBar from '../components/MenuBar';
import { getSongKeyTime, getSongAttributeRange, getRelatedSongs } from '../fetcher'

const { Column } = Table;


class SongsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            songQuery: 'Bohemian Rhapsody',
            artistQuery: 'Queen',
            similarSongKeyTime: [],
            songAttributeRange: [],
            relatedSongs: [],
            minDanceability: 0,
            maxDanceability: 1,
            minEnergy: 0,
            maxEnergy: 1,
            minLoudness: 0,
            maxLoudness: 1,
            minSpeechiness: 0,
            maxSpeechiness: 1,
        }
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.updateRangeSearchResults = this.updateRangeSearchResults.bind(this)
        this.handleSongQueryChange = this.handleSongQueryChange.bind(this)
        this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
        this.handleDanceabilityChange = this.handleDanceabilityChange.bind(this)
        this.handleEnergyChange = this.handleEnergyChange.bind(this)
        this.handleLoudnessChange = this.handleLoudnessChange.bind(this)
        this.handleSpeechinessChange = this.handleSpeechinessChange.bind(this)
        this.goToArtist = this.goToArtist.bind(this)
    }

    goToArtist(artist) {
        window.location = `/artists?artist_mb=${artist}&page=${null}&pagesize=${null}`
    }

    handleSongQueryChange(event) {
        this.setState({ songQuery: event.target.value })
    }
    handleArtistQueryChange(event) {
        this.setState({ artistQuery: event.target.value })
    }

    updateSearchResults() {
        getSongKeyTime(this.state.songQuery, this.state.artistQuery).then(res => {
            this.setState({ similarSongKeyTime: res.results });
        });
        getRelatedSongs(this.state.songQuery, this.state.artistQuery).then(res => {
            this.setState({ relatedSongs : res.results});
        });
    }

    updateRangeSearchResults() {
        getSongAttributeRange(this.state.minDanceability, this.state.maxDanceability, this.state.minEnergy, this.state.maxEnergy,
            this.state.minLoudness, this.state.maxLoudness, this.state.minSpeechiness, this.state.maxSpeechiness).then(res => {
                this.setState({songAttributeRange: res.results });
            });
    }

    handleDanceabilityChange(value) {
        this.setState({ minDanceability: value[0]})
        this.setState({ maxDanceability: value[1]})
    }

    handleEnergyChange(value) {
        this.setState({ minEnergy: value[0]})
        this.setState({ maxEnergy: value[1]})
    }

    handleLoudnessChange(value) {
        this.setState({ minLoudness: value[0]})
        this.setState({ maxLoudness: value[1]})
    }

    handleSpeechinessChange(value) {
        this.setState({ minSpeechiness: value[0]})
        this.setState({ maxSpeechiness: value[1]})
    }

    componentDidMount() {
        getSongKeyTime(this.state.songQuery, this.state.artistQuery).then(res => {
            this.setState({ similarSongKeyTime: res.results })
        });
        getRelatedSongs(this.state.songQuery, this.state.artistQuery).then(res => {
            this.setState({ relatedSongs : res.results});
        });
        getSongAttributeRange(this.state.minDanceability, this.state.maxDanceability, this.state.minEnergy, this.state.maxEnergy,
            this.state.minLoudness, this.state.maxLoudness, this.state.minSpeechiness, this.state.maxSpeechiness).then(res => {
                this.setState({songAttributeRange: res.results });
            });
    }


    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Song</label>
                            <FormInput placeholder="Bohemian Rhapsody" value={this.state.songQuery} onChange={this.handleSongQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist (optional)</label>
                            <FormInput placeholder="Queen" value={this.state.artistQuery} onChange={this.handleArtistQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '3vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>

                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Songs with the same key and time signature as {this.state.songQuery}</h3>
                    <Table
                        dataSource={this.state.similarSongKeyTime} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Name" dataIndex="name_" key="name_" sorter={(a, b) => a.name_.localeCompare(b.name_)} />
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />

                    </Table>
                </div>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Related Songs to {this.state.songQuery}</h3>
                    <Table onRow={(record) => {
                            return {
                                onClick: event => { this.goToArtist(record.artist) },
                            };
                        }}
                        dataSource={this.state.relatedSongs} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Title" dataIndex="title" key="title" sorter={(a, b) => a.name_.localeCompare(b.name_)} />
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                        <Column title="Chart Frequency" dataIndex="chart_freq" key="chart_freq" sortOrder={(a,b) => a.chart_freq - b.chart_freq} />
                    </Table>
                </div>
                <Divider />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Danceability</label>
                            <Slider range defaultValue={[0.2, 0.8]} min={0} max={1} step={0.01} onChange={this.handleDanceabilityChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Energy</label>
                            <Slider range defaultValue={[0.2, 0.9]} min={0} max={1} step={0.01} onChange={this.handleEnergyChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        </FormGroup></Col>
                    </Row>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Loudness</label>
                            <Slider range defaultValue={[0.2, 0.8]} min={0} max={1} step={0.01} color='#15C671' onChange={this.handleLoudnessChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Speechiness</label>
                            <Slider range defaultValue={[0.1, 0.8]} min={0} max={1} step={0.01} onChange={this.handleSpeechinessChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '-0.5vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateRangeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <Divider />
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                        <h3>Songs within specified attribute ranges</h3>
                        <Table
                            dataSource={this.state.songAttributeRange} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                            <Column title="Name" dataIndex="name_" key="name_" sorter={(a, b) => a.name_.localeCompare(b.name_)} />
                            <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                            <Column title="Danceability" dataIndex="danceability" key="danceability" sorter={(a, b) => a.danceability - b.danceability} />
                            <Column title="Energy" dataIndex="energy" key="energy" sorter={(a, b) => a.energy - b.energy} />
                            <Column title="Speechiness" dataIndex="speechiness" key="speechiness" sorter={(a, b) => a.speechiness - b.speechiness} />
                            <Column title="Loudness" dataIndex="loudness" key="loudness" sorter={(a, b) => a.loudness - b.loudness} />
                        </Table>
                    </div>
                </Form>
            </div>
        )
    }

}

export default SongsPage

