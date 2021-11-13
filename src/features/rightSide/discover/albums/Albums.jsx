import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useGetAlbumListQuery } from '../../../../app/music_api/musicApi';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
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
        <ImageList
            cols={3}
            sx={{
                width: "60vw",
                height: "84vh",
                // backgroundColor: 'rgba(53, 48, 61, 0.3)',
                // boxShadow:
                //     `2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
                // 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
                // 12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
                // 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
                // 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
                // 100px 100px 80px rgba(0, 0, 0, 0.07)`,
                padding: "10px"
            }}>
            {data.map((album) => (
                <ImageListItem key={album.album_logo}
                    sx={{
                        padding: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: "20px",
                    }}>
                    <img
                        src={`http://127.0.0.1:8000${album.album_logo}`}
                        srcSet={`http://127.0.0.1:8000${album.album_logo}`}
                        alt={album.album_title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            borderRadius: "20px",
                        }}
                        title={album.album_title}
                        subtitle={album.artist.name}
                        actionIcon={<AlbumDetails albumid={album.id} />}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
