import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useGetAlbumListQuery, useGetSpecificAlbumQuery } from '../../../../app/music_api/musicApi';
import AlbumDetails from './AlbumDetails'

export default function TitlebarImageList() {
    const { data, isLoading, error } = useGetAlbumListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
 
  return (
    <>
    <ImageList variant="standard" style={{
        maxWidth: 600,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#30393d",
        columns: 4
      }}>
        <ImageListItem key="Subheader" cols={2} rows={2}>
          <ListSubheader component="div"></ListSubheader>
        </ImageListItem>

        {data.map((album) => (
          <ImageListItem style={{ height: "300px" }}  key={album.album_logo}>
            <img
              src={`http://127.0.0.1:8000${album.album_logo}`}
              srcSet={`http://127.0.0.1:8000${album.album_logo}`}
              alt={album.album_title}
              loading="lazy" />
            <ImageListItemBar
              title={album.album_title}
              subtitle={album.artist.name}
              actionIcon={<AlbumDetails albumid={album.id} />} />
          </ImageListItem>
        ))}
      </ImageList></>
    
  );
}
