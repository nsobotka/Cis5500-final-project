import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import { getTopArtistCount } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const playerColumns = [
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
    sorter: (a, b) => a.region.localeCompare(b.region),
  },
  {
    title: 'Count',
    dataIndex: 'top_artist_count',
    key: 'top_artist_count',
    sorter: (a, b) => a.top_artist_count - b.top_artist_count
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
    getTopArtistCount(null, null).then(res => {
      this.setState({ topArtistResults: res.results })
    })
 
  }


  render() {
    return (
      <div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Top Artists</h3>
          <Table dataSource={this.state.topArtistResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }

}

export default HomePage

