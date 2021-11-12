import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import ArtistDetails from './ArtistDetails'
import { useGetArtistListQuery } from '../../../../app/music_api/musicApi';

export default function TitlebarImageList() {
    const { data, isLoading, error } = useGetArtistListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
  return (
    <ImageList variant="standard" style={{
      maxWidth: 600,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#30393d",
      columns: 4
    }}>
      <ImageListItem key="Subheader" cols={2} rows={2}>
        <ListSubheader component="div"></ListSubheader>
      </ImageListItem>
      {data.map((artist) => (
        <ImageListItem style={{ height: "300px" }} key={artist.thumbnail}>
          <img
            src={`http://127.0.0.1:8000${artist.thumbnail}`}
            srcSet={`http://127.0.0.1:8000${artist.thumbnail}`}
            alt={artist.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={artist.name}
            // subtitle={artist.bio}
            actionIcon={<ArtistDetails artistid = {artist.id} />}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}