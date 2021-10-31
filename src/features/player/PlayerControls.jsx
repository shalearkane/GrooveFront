import React from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import './rhap.css';
import { useDispatch, useSelector } from "react-redux";
import { nextTrack, prevTrack, selectCurrentlyPlayingIndex, selectQueue } from "../../app/music_api/musicSlice";
import styles from './PlayerControls.module.css'

const RhapEmpty = (src) => {
    return (
        <div className={styles.player}>
            <AudioPlayer
                autoPlay={false}
                src={src}
                showJumpControls={false}
                showSkipControls={true}
                customAdditionalControls={
                    [
                        RHAP_UI.CURRENT_TIME
                    ]
                }
                customVolumeControls={
                    [
                        RHAP_UI.DURATION
                    ]
                }
                customProgressBarSection={
                    [
                        RHAP_UI.PROGRESS_BAR,
                    ]
                }
            />
        </div>
    )
}

function PlayerControls() {
    const index = useSelector(selectCurrentlyPlayingIndex)
    const tracks = useSelector(selectQueue)
    const dispatch = useDispatch()

    if (typeof tracks === 'undefined' || typeof tracks[index] === 'undefined') {
        return (
            <RhapEmpty src={null} />
        )
    }
    return (
        <div className={styles.player}>
            <AudioPlayer
                autoPlay={false}
                src={tracks[index].audio_file}
                showJumpControls={false}
                showSkipControls={true}
                customAdditionalControls={
                    [
                        RHAP_UI.CURRENT_TIME
                    ]
                }
                customVolumeControls={
                    [
                        RHAP_UI.DURATION
                    ]
                }
                customProgressBarSection={
                    [
                        RHAP_UI.PROGRESS_BAR,
                    ]
                }
                onClickPrevious={() => { dispatch(prevTrack()) }}
                onClickNext={() => { dispatch(nextTrack()) }}
                onEnded={() => { dispatch(nextTrack()) }}
            />
        </div>
    )
}

export default PlayerControls