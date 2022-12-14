import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {
    Table,
    Select,
    Row,
    Col,
    Divider,
    Slider,
} from 'antd'
import MenuBar from '../components/MenuBar';
import { getAlbumsRegionChart, getTopYearAlbums } from '../fetcher'

const { Column } = Table;

class AlbumPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2020,
            region1: 'United States',
            topYearAlbums: [],
            regionChartAlbums: [],
            region: 'United States',
            chart: 'viral50',
            year2: 2017,
        }

        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleYear2Change = this.handleYear2Change.bind(this)
        this.handleRegion1Change = this.handleRegion1Change.bind(this)
        this.updateYearResults = this.updateYearResults.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.updateRegionChartResults = this.updateRegionChartResults.bind(this)
        this.handleChartChange = this.handleChartChange.bind(this)
        this.goToArtist = this.goToArtist.bind(this)
    } 
    
    goToArtist(artist) {
        window.location = `/artists?artist_mb=${artist}&page=${null}&pagesize=${null}`
    }

    handleYearChange(value) {
        this.setState({year: value[0]});
    }
    handleYear2Change(value) {
        this.setState({ year2: value[0] });
    }
    handleRegion1Change(event) {
        this.setState({ region1: event.target.value })
    }

    updateYearResults() {
        getTopYearAlbums(this.state.year, this.state.region1).then(res => {
            this.setState({topYearAlbums: res.results});
        });
    }

    updateRegionChartResults() {
        getAlbumsRegionChart(this.state.region, this.state.chart, this.state.year2).then(res => {
            this.setState({regionChartAlbums: res.results});
        });
    }

    componentDidMount() {
        getTopYearAlbums(this.state.year, this.state.region1).then(res => {
            this.setState({topYearAlbums: res.results});
        });
        getAlbumsRegionChart(this.state.region, this.state.chart, this.state.year2).then(res => {
            this.setState({regionChartAlbums: res.results});
        });
    }

    handleRegionChange(event) {
        this.setState({ region: event.target.value })
    }

    handleChartChange(value) {
        this.setState({ chart: value })
    }

    render() {
        return (
            <div>
                <MenuBar />
                {/* User input for albums by popular artist */}
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <Slider range defaultValue={[2020]} min={1970} max={2020} step={1} onChange={this.handleYearChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Country</label>
                            <FormInput placeholder="Country" value={this.state.region1} onChange={this.handleRegion1Change} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '3vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateYearResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Albums from the most popular artists of the year</h3>
                    <Table onRow={(record) => {
                                return {
                                    onClick: event => { this.goToArtist(record.artist) },
                                };
                            }}
                        dataSource={this.state.topYearAlbums} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                        <Column title="Album" dataIndex="album" key="album" sorter={(a, b) => a.album.localeCompare(b.album)} />
                        <Column title="Release Date" dataIndex="release_date" key="release_date" sorter={(a, b) => a.release_date.localeCompare(b.release_date)} />
                    </Table>
                </div>
                <Divider />
                {/* User input for most popular albums */}
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto', marginLeft: '10vw' }}>
                            <label>Year</label>
                            <Slider theme='success' range defaultValue={[2017]} min={1970} max={2020} step={1} onChange={this.handleYear2Change} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto', marginLeft: '10vw'  }}>
                            <label>Country</label>
                            <FormInput placeholder="Country" value={this.state.region} onChange={this.handleRegionChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto', marginLeft: '10vw' }}>
                            <label>Chart</label>
                            <br></br>
                            <Select options={[{value:'top200', label:'Top 200'}, {value:'viral50', label:'Viral 50'}]} value={this.state.chart} onChange={this.handleChartChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw'}}>
                            <Button style={{ marginTop: '3vh', backgroundColor: '#15C671', border: '1px' }} onClick={this.updateRegionChartResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Top Albums in Region and Chart</h3>
                    <Table onRow={(record) => {
                                return {
                                    onClick: event => { this.goToArtist(record.artist) },
                                };
                            }}
                        dataSource={this.state.regionChartAlbums} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Album" dataIndex="album" key="album" sorter={(a, b) => a.album.localeCompare(b.album)} />
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                        <Column title="Release Date" dataIndex="release_date" key="release_date" sorter={(a, b) => a.release_date.localeCompare(b.release_date)} />
                        <Column title="Album Chart Appearances" dataIndex="album_chart_appearances" key="album_chart_appearances" sorter={(a, b) => a.album_chart_appearances - b.album_chart_appearances} />
                    </Table>
                </div>
            </div>
        )
    }
}

export default AlbumPage
