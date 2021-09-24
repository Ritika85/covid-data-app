import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const CovidData =props=>(
    <tr>
        <td>{props.data.date}</td>
        <td>{props.data.state}</td>
        <td>{props.data.cases}</td>
        <td>{props.data.deaths}</td>
        <td>
            <Link to={"/edit/"+props.data._id} > Edit</Link>
        </td>
        <td>
            <Link to={"/delete/"+props.data._id} > Delete</Link>
        </td>

    </tr>
)

export default class ShowData extends Component{
    constructor(props){
        super(props);
        this.state ={
            date:'',
            stateName:'',
            covid_list:[]
        };
        this.onChangeStateName=this.onChangeStateName.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
            this.onSubmit=this.onSubmit.bind(this);
     }

     onChangeStateName(e){
        this.setState({
            stateName:e.target.value
        });
    }
    onChangeDate(e){
        this.setState({
            date:e.target.value
        });
    }

     onSubmit(e){
        axios.get('http://localhost:4000/covid/display/'+this.state.stateName)
        .then(response => {
            this.setState({
                covid_list: response.data
            }); })
            .catch(function(error){
                console.log(error);
        });
     }

     covidList(){
        return this.state.covid_list.map(function(currentRecord, i){
            return <CovidData data={currentRecord} key={i}/>;
        });
    }
    render(){
        return(
            <div style={{marginTop:20}} className="show-bar-custom">
            <form onSubmit={this.onSubmit}>
                    <div className="form-inline my-2 my-lg-0 ">
                        <label ><b>State </b></label>
                        <select id="state_name"className="form-control"  value={this.state.stateName} onChange={this.onChangeStateName}>
                            <option value="" selected="selected">Select a State</option>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District of Columbia">District Of Columbia</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New Yourt">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ojio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>

                    <div className="form-inline my-2 my-lg-0 ">
                        <label ><b>Date </b> </label>
                        <input className="form-control"type="date" value={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                </form>
                <div className="form-group" marginTop="20px">
                        <center>
                            <input type="submit" value="Show Records" className="btn btn-outline-success" onClick={this.onSubmit}/>
                        </center>                   
                    </div>
                <div>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead >
                        <tr>
                            <th>Date</th>
                            <th>State</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.covidList() }
                    </tbody>
                    </table>
                </div>
           </div>
        );
    }
}