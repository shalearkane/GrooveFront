import React, { useState } from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import './rhap.css';
import { useDispatch, useSelector } from "react-redux";
import { nextTrack, prevTrack, playTrack, pauseTrack, selectCurrentTrackData } from "../../app/music_api/musicSlice";
import { useAddToHistoryMutation } from "../../app/music_api/musicApi";
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
    const [lastHistory, setLastHistory] = useState(-1)
    const currentTrack = useSelector(selectCurrentTrackData)
    const dispatch = useDispatch()
    const [triggerHistory, resultHistory] = useAddToHistoryMutation()

    if (typeof currentTrack === 'undefined') {
        return (
            <RhapEmpty src={null} />
        )
    }
    const listenHandler = () => {
        if (currentTrack.id !== lastHistory) {
            triggerHistory(currentTrack.id)
            setLastHistory(currentTrack.id)
        }
    }
    return (
        <div className={styles.player}>
            <AudioPlayer
                autoPlay={false}
                src={currentTrack.audio_file}
                showJumpControls={false}
                showSkipControls={true}
                listenInterval={60000}
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
                onPlay={() => dispatch(playTrack())}
                onPause={() => dispatch(pauseTrack())}
                onClickPrevious={() => dispatch(prevTrack())}
                onClickNext={() => dispatch(nextTrack())}
                onEnded={() => dispatch(nextTrack())}
                onListen={listenHandler}
            />
        </div>
    )
}

export default PlayerControls