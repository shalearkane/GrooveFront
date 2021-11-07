import { useState, useEffect, skipToken } from "react";
import { useSelector } from "react-redux";
import { selectCurrentlyPlayingIndex, selectQueue } from "../../app/music_api/musicSlice";
import { useIsLikedQuery, useLikeSongMutation, useUnlikeSongMutation } from "../../app/music_api/musicApi";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import styles from './PlayerDetails.module.css'

const LikeBtn = (props) => {
    var trackid = props.trackid
    const [like, setLike] = useState(skipToken)

    const [triggerLike, resultLike] = useLikeSongMutation()
    const [triggerUnlike, resultUnlike] = useUnlikeSongMutation()
    const { data: likeStatus, isLoading, isError } = useIsLikedQuery(trackid)

    useEffect(() => {
        if (likeStatus) {
            setLike(likeStatus["isLiked"])
        }
    }, [likeStatus])

    function likeHandler() {
        if (like === false) {
            triggerLike(trackid)
            setLike(true)
        } else {
            triggerUnlike(trackid)
            setLike(false)
        }
    }

    return (
        <IconButton aria-label="like" onClick={likeHandler}>
            {like ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
    )
}

function PlayerDetails() {
    const index = useSelector(selectCurrentlyPlayingIndex)
    const tracks = useSelector(selectQueue)

    if (typeof tracks === 'undefined' || typeof tracks[index] === 'undefined') {
        return (
            <div className={styles.details}>
                <div className={styles.left}>
                    <div className={styles.verticalcenter}>
                        <HourglassEmptyIcon fontSize="large" />
                    </div>
                </div>
                <div>
                    <div className={styles.right}>
                        <div className={styles.verticalcenter}>
                            {"No Track in Queue"}
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.details}>
            <div className={styles.left}>
                <div className={styles.verticalcenter}>
                    <img src={tracks[index].album.album_logo} alt="album-art" className={styles.img} />
                </div>
            </div>
            <div>
                <div className={styles.right}>
                    <div className={styles.verticalcenter}>
                        {tracks[index].track_title} <br />
                        {tracks[index].album.artist.name}
                        <hr />
                        <Stack direction="row" spacing={1}>
                            <LikeBtn trackid={tracks[index].id} />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails