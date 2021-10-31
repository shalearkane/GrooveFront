import History from "./history/History"
import LikedSongs from "./likedSongs/LikedSongs"


function Library() {
    return (
        <div>
            <h2>Library</h2>
            <History />
            <LikedSongs />
        </div>
    )
}

export default Library