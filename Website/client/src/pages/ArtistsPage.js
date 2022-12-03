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
import { getSimilarArtists } from '../fetcher'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


const artistColumns = [
    {
        title: 'Artist',
        dataIndex: 'artist_mb',
        key: 'artist_mb',
        sorter: (a, b) => a.artist_mb.localeCompare(b.artist_mb)
    },
    {
        title: 'Tags',
        dataIndex: 'tags_lastfm',
        key: 'tags_lastfm',
    },
    {
        title: 'Listeners',
        dataIndex: 'listeners_lastfm',
        key: 'listeners_lastfm',
        sorter: (a, b) => a.listeners_lastfm - b.listeners_lastfm,
    },
];

class ArtistsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artistQuery: '',
            topArtistResults: []
        }
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
    }

    handleArtistQueryChange(event) {
        this.setState({ artistQuery: event.target.value })
    }

    updateSearchResults() {
        getSimilarArtists(this.state.artistQuery, null, null).then(res => {
            this.setState({ topArtistResults: res.results })
        })
    }


    componentDidMount() {
        getSimilarArtists(this.state.artistQuery, null, null).then(res => {
            this.setState({ topArtistResults: res.results })
        })

    }


    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist</label>
                            <FormInput placeholder="Name" value={this.state.artistQuery} onChange={this.handleArtistQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    
                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Similar Artists</h3>
                    {/* <Table dataSource={this.state.topArtistResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/> */}

                    <Table
                        // return {
                        //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        // };
                        dataSource={this.state.topArtistResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                        <Column title="Artist" dataIndex="artist_mb" key="artist_mb" sorter={(a, b) => a.artist_mb.localeCompare(b.artist_mb)} />
                        <Column title="Tags" dataIndex="tags_lastfm" key="Tags" />
                        <Column title="Listeners" dataIndex="listeners_lastfm" key="listeners_lastfm" sorter={(a, b) => a.listeners_lastfm - b.listeners_lastfm} />

                    </Table>
                </div>
            </div>
        )
    }

}

export default ArtistsPage

