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
import { getTopYearAlbums } from '../fetcher'

const { Column, ColumnGroup } = Table;
const { Option } = Select;

class AlbumPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2020,
            topYearAlbums: []
        }

        this.handleYearChange = this.handleYearChange.bind(this)
        this.updateYearResults = this.updateYearResults.bind(this)
    }

    handleYearChange(value) {
        this.setState({year: value[0]});
    }

    updateYearResults() {
        getTopYearAlbums(this.state.year).then(res => {
            this.setState({topYearAlbums: res.results});
        });
    }

    componentDidMount() {
        getTopYearAlbums(this.state.year).then(res => {
            this.setState({topYearAlbums: res.results});
        });
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
            </div>
        )
    }
}

export default AlbumPage
