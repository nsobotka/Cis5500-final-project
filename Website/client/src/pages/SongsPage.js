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
import { getSongKeyTime } from '../fetcher'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


const songColumns = [
    {
        title: 'Name',
        dataIndex: 'name_',
        key: 'name_',
        sorter: (a, b) => a.name_.localeCompare(b.name_)
    },
    {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
        sorter: (a, b) => a.artist_.localeCompare(b.artist)
    },
    {
        title: 'Key',
        dataIndex: 'key_',
        key: 'key_',
    },
    {
        title: 'Time Signature',
        dataIndex: 'time_signature',
        key: 'time_signature',
    },
];

class SongsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            songQuery: '',
            similarSongKeyTime: []
        }
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleSongQueryChange = this.handleSongQueryChange.bind(this)
    }

    handleSongQueryChange(event) {
        this.setState({ songQuery: event.target.value })
    }

    updateSearchResults() {
        getSongKeyTime(this.state.songQuery, null, null).then(res => {
            this.setState({ similarSongKeyTime: res.results })
        })
    }


    componentDidMount() {
        getSongKeyTime(this.state.songQuery, null, null).then(res => {
            this.setState({ similarSongKeyTime: res.results })
        })

    }


    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Song</label>
                            <FormInput placeholder="Song" value={this.state.songQuery} onChange={this.handleSongQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>

                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Similar Songs</h3>
                    {/* <Table dataSource={this.state.topArtistResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/> */}

                    <Table
                        // return {
                        //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        // };
                        dataSource={this.state.similarSongKeyTime} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Name" dataIndex="name_" key="name_" sorter={(a, b) => a.name_.localeCompare(b.name_)} />
                        <Column title="Artist" dataIndex="artist" key="artist" sorter={(a, b) => a.artist.localeCompare(b.artist)} />
                        <Column title="Key" dataIndex="key_" key="key_" />
                        <Column title="Time Signature" dataIndex="time_signature" key="time_signature" />

                    </Table>
                </div>
            </div>
        )
    }

}

export default SongsPage

