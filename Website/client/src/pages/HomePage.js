import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import { getSimilarArtists } from '../fetcher'
import MenuBar from '../components/MenuBar';
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const artistColumns = [
  {
    title: 'Artist',
    dataIndex: 'artist_mb',
    key: 'artist_mb',
    sorter: (a, b) => a.region.localeCompare(b.region)
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
    sorter: (a, b) => a.get_similar_artists - b.get_similar_artists,
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      topArtistResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      pagination: null  
    }
  }

  componentDidMount() {
    getSimilarArtists(null, null).then(res => {
      this.setState({ topArtistResults: res.results })
    })
 
  }


  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Splash</h3>
          {/* <Table dataSource={this.state.topArtistResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/> */}
          
          {/* <Table 
            // return {
            //   onClick: event => { this.goToMatch(record.MatchId) }, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
            // };
            dataSource={this.state.topArtistResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
            <Column title="Artist" dataIndex="artist_mb" key="artist_mb" sorter={(a, b) => a.Artist.localeCompare(b.Artist)} />
            <Column title="Tags" dataIndex="tags_lastfm" key="Tags" />
            <Column title="Listeners" dataIndex="listeners_lastfm" key="listeners_lastfm" sorter={(a, b) => a.Listeners - b.Listeners} />
            
          </Table> */}
        </div>
      </div>
    )
  }

}

export default HomePage

