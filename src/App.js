import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CovidDataList from './components/covid-data-list.component';
import AddData from './components/add-data.component';
import EditData from './components/edit-data.component';
import DeleteData from './components/delete-data.component';
import StatewiseData from './components/statewise-data.component';
import ShowData from './components/show-data.component';
import DisplayStates from './components/display-states.component';
import logo from './logo.PNG';


  function App(){
  const[searchTermCount,setSearchTermCount]=useState(0); 
  const[searchTermState,setSearchTermState]=useState('');
  return (  
    <Router>
     
     <div class="container">
       <center><h2> COVID-19 Data Application</h2></center>
       <nav className="navbar navbar-expand-md navbar-light nav-custom">
         <a className="navbar-brand"> 
          <img src={logo} width="30" height="30" alt="Covid-19 Cases"></img>
         </a>
         <Link to="/" className="navbar-brand">COVID-19 Data Application</Link>
         <div className="collapse navbar-collapse">
           <ul className="navbar-nav mr-auto mt-lg-0 ">
             <li className="navbar-item "> 
                <Link to="/add" className="nav-link  nav-item-custom">Add New Record</Link>
             </li>
             <li className="navbar-item"> 
                <Link to={"/edit/:id"} className="nav-link">Update Data</Link>
             </li>
             <li className="navbar-item"> 
                <Link to="/display/records" className="nav-link">Show Specific Records</Link>
             </li>
           </ul>
           <form className="form-inline my-2 my-lg-0 ">
            <input className="form-control" type="search" placeholder="state-name" onChange={event=>{setSearchTermState(event.target.value)}}/>
            <Link to={"/show/count/"+searchTermState} className="nav-link">
            <button className="btn btn-outline-success my-sm-0" type="submit">Show</button>
            </Link>
            </form>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="more cases than " onChange={event=>{setSearchTermCount(event.target.value)}} />
            <Link to={'/show/states/'+searchTermCount} className="nav-link">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
            </Link>
            </form>
        </div>
       </nav>
       <Route path="/" exact component={CovidDataList}></Route>
        <Route path={"/edit/:id"} component={EditData}/>
        <Route path="/add" component={AddData}/>
        <Route path={"/show/count/:state"} component={StatewiseData}/>
        <Route path="/display/records" component={ShowData}/>
        <Route path={"/delete/:id"} component={DeleteData}/>
        <Route path={"/show/states/:number"} component={DisplayStates}/>
        
    </div>
   
   </Router>
  );
  }


export default App;
