import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useGetTrackListQuery } from '../../../../app/music_api/musicApi';
import LikeButton from '../../../buttons/LikeButton';
import PlayButton from '../../../buttons/PlayButton';
import styles from './Tracks.module.css'

export default function TrackList() {
    const { data, isLoading, error } = useGetTrackListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
    return (
        <List sx={{ width: 600, bgcolor: '#35303d' }}>
          {data.map((track) => {
            return (
              <ListItem>
                <ListItemButton role={undefined} dense>
                <PlayButton trackid = {track.id} edge="start" aria-label="play" />
                  <ListItemText 
                  className={styles.list}
                    primary={track.track_title}
                    secondary={<div color='white'>{track.album.album_title}</div>}/>
                  <ListItemIcon>
                    <LikeButton
                      trackid = {track.id}
                      edge="end"
                    />
                    {/* <TrackActions/> */}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
  );
}