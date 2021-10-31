import Player from '../player/Player';
import RightSide from '../rightSide/RightSide';
import { Drawer, Box } from '@mui/material';
import { bgcolor } from '@mui/system';

const drawerWidth = 300;

function AuthenticatedApp() {
    return (
        <Box
            sx={{
                display: 'flex',
                background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
            }}
        >
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Player />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <RightSide />
            </Box>
        </Box>
    )
}

export default AuthenticatedApp