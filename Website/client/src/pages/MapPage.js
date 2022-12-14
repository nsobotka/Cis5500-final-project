import React from "react";
import {
    Table,
} from 'antd'

import { getArtistsFrom, tagsByRegion, tagsByRegion2, getArtistsFrom2 } from "../fetcher";
import MenuBar from "../components/MenuBar";
const { Column } = Table;

class MapPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistsFromResults: [],
            tagsResults: [],
            selectedCountry: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
        };
        this.goToArtist = this.goToArtist.bind(this)
    }

    goToArtist(artist) {
        window.location = `/artists?artist_mb=${artist}&page=${null}&pagesize=${null}`
    }

    componentDidMount() {
        tagsByRegion2(this.state.selectedCountry).then((res) => {
            this.setState({ tagsResults: res.results });
        });
        
        if (!this.state.selectedCountry) {
            getArtistsFrom().then((res) => {
                this.setState({ artistsFromResults: res.results });
            });
        } else {
            getArtistsFrom2(this.state.selectedCountry).then((res) => {
                this.setState({ artistsFromResults: res.results });
            });
        }   
        if (!this.state.selectedCountry) {
            tagsByRegion().then((res) => {
                this.setState({ tagsResults: res.results });
            });
        }
        
    }

    render() {

        return (
            <div>
                <MenuBar />
                {/* Map with defined click points */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/World_map_green.png" width="1200" marginLef="auto" alt="Map" usemap="#world" class="center"></img>
                <map name="world">
                    <area shape="circle" coords="100,110,80" href="/?country=United States" alt="United States"></area>
                    <area shape="circle" coords="400,100,50" href="/?country=Italy" alt="Italy"></area>
                    <area shape="circle" coords="230,300,60" href="/?country=Brazil" alt="Brazil"></area>
                    <area shape="circle" coords="760,350,80" href="/?country=Australia" alt="Australia"></area>
                    <area shape="circle" coords="450,350,40" href="/?country=South Africa" alt="South Africa"></area>
                    <area shape="circle" coords="680,150,40" href="/?country=China" alt="China"></area>
                    <area shape="circle" coords="550,80,50" href="/?country=Russia" alt="Russia"></area>
                </map>

                <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>

                    <h3>Most popular artists from chosen country</h3>

                    <Table onRow={(record) => {
                        return {
                            onClick: event => { this.goToArtist(record.artist_mb) },
                        };
                    }}
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

                    <h3>Most popular tags from chosen country</h3>

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
                </div>
            </div>
        );
    }
}

export default MapPage;
