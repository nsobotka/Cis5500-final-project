import React from 'react';
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
import MenuBar from '../components/MenuBar';
import { getAlbumsRegionChart, getTopYearAlbums } from '../fetcher'

const { Column, ColumnGroup } = Table;
const { Option } = Select;

class AlbumPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2020,
            topYearAlbums: [],
            regionChartAlbums: [],
            region: 'United States',
            chart: 'top200'
        }

        this.handleYearChange = this.handleYearChange.bind(this)
        this.updateYearResults = this.updateYearResults.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.updateRegionChartResults = this.updateRegionChartResults.bind(this)
        this.handleChartChange = this.handleChartChange.bind(this)
    }

    handleYearChange(value) {
        this.setState({year: value[0]});
    }

    updateYearResults() {
        getTopYearAlbums(this.state.year).then(res => {
            this.setState({topYearAlbums: res.results});
        });
    }

    updateRegionChartResults() {
        getAlbumsRegionChart(this.state.region, this.state.chart).then(res => {
            this.setState({regionChartAlbums: res.results});
        });
    }

    componentDidMount() {
        getTopYearAlbums(this.state.year).then(res => {
            this.setState({topYearAlbums: res.results});
        });
        getAlbumsRegionChart(this.state.region, this.state.chart).then(res => {
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
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <Slider range defaultValue={[2020]} min={1970} max={2020} step={1} onChange={this.handleYearChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateYearResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Top Artist Albums of the Year</h3>
                    <Table
                        dataSource={this.state.topYearAlbums} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                        <Column title="Album" dataIndex="album" key="album" sorter={(a, b) => a.album.localeCompare(b.album)} />
                        <Column title="Release Date" dataIndex="release_date" key="release_date" sorter={(a, b) => a.release_date.localeCompare(b.release_date)} />
                    </Table>
                </div>
                <Divider />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Region</label>
                            <FormInput placeholder="Region" value={this.state.region} onChange={this.handleRegionChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Chart</label>
                            <br></br>
                            <Select options={[{value:'top200', label:'Top 200'}, {value:'viral50', label:'Viral 50'}]} value={this.state.chart} onChange={this.handleChartChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateRegionChartResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Top Albums in Region and Chart</h3>
                    <Table
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
