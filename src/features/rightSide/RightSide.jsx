import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Searchicon from '@mui/icons-material/Search';
import Libraryicon from '@mui/icons-material/LibraryAdd';
import Discovericon from '@mui/icons-material/MusicNote';
import Discover from './discover/Discover';
import Search from './search/Search';
import Library from './library/Library';
import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
import styles from './RightSide.module.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
  }
  
export default function RightSide() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.myDIV}>
        <AppBar position="static" >
            <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example"
            >
            <Tab style={{fontWeight: "bold" , color:'black' , edge:"start"}}  icon={<Searchicon />} iconPosition="start" label="SEARCH"/>
            <Tab style={{fontWeight: "bold" , color:'black' , edge:"middle" }}  icon={<Discovericon />} iconPosition="start" label="Discover" />
            <Tab style={{fontWeight: "bold" , color:'black' , edge:"end" }} edge="end" icon={<Libraryicon />} iconPosition="start" label="Library" />
            </Tabs>
        </AppBar>
    <TabPanel value={value} index={0}>
    <Search />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <Discover />
    </TabPanel>
    <TabPanel value={value} index={2}>
    <Library />
    </TabPanel>
    </div>
  );
}