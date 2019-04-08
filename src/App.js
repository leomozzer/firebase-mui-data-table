import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Dashboard}  from './Components/Dashboard/Dashboard'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import './index.css';
import NewUser from './Components/Data/NewUser';
import ShowData from './Components/Data/ShowData';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/new+data" component={NewData} />
        <Route path="/data" component={Data} />
      </div>
    </Router>
  );
}
function Home() {
  return <Dashboard/>
}

function NewData() {
  return <NewUser/>
}

function Data() {
  return <ShowData/>
}

function Header() {  
  return (
    <div className='home'>
      <BottomNavigation showLabels>
        <BottomNavigationAction className='home_icon' label="Home" href='/' icon={<HomeIcon />}/>
        <BottomNavigationAction label="Add user" href='/new+data' value="favorites" icon={<AddIcon />} />
        <BottomNavigationAction label="List users" href='/data' value="nearby" icon={<ListIcon />} />
      </BottomNavigation>
    </div>
  );
}
export default App;