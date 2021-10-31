import Search from "./search/Search"
import Discover from "./discover/Discover"
import Library from "./library/Library"

const RightSide = () => {
    return (
        <div>
            <h1>Right Side</h1>
            <Search />
            <Discover />
            <Library />
        </div>
    )
}

export default RightSide