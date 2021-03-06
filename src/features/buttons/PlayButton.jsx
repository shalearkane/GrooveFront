import { useGetSpecificTrackQuery } from "../../app/music_api/musicApi";
import { selectIsPlaying, addPlayTrack, selectCurrentTrackData } from "../../app/music_api/musicSlice";
import IconButton from '@mui/material/IconButton';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const PlayButton = (props) => {
    var trackid = props.trackid
    console.log(trackid)
    const dispatch = useDispatch()
    const isPlaying = useSelector(selectIsPlaying)
    const currentTrack = useSelector(selectCurrentTrackData)
    const currentTrackId = (currentTrack !== undefined) ? currentTrack.id : -1
    const { data, isLoading, error } = useGetSpecificTrackQuery(trackid)

    function playHandler() {
        console.log(currentTrackId)
        console.log("Clicked play")
        dispatch(addPlayTrack(data))
    }

    if (isLoading) {
        return (
            <HourglassEmptyIcon />
        )
    }

    if (error) {
        console.log(error)
        return (
            <ErrorRoundedIcon />
        )
    }

    return (
        <IconButton aria-label="play" onClick={playHandler}>
            {(isPlaying && trackid === currentTrackId) ? <PauseCircleRoundedIcon /> : <PlayCircleRoundedIcon />}
        </IconButton>
    )
}

export default PlayButton