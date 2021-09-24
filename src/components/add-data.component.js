import React, {Component , useEffect, useState} from 'react';
import axios from 'axios';
import "../App.css";
export default class AddData extends Component{
   constructor(props){
        super(props);
       
        this.onChangeCases=this.onChangeCases.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeDeaths=this.onChangeDeaths.bind(this);
        this.onChangeStateName=this.onChangeStateName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            stateName:'',
            date:'',
            cases:'',
            deaths:''
        }
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

    onChangeCases(e){
        this.setState({
            cases:e.target.value
        });
    }

    onChangeDeaths(e){
        this.setState({
            deaths:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        alert('Record Added');

        const newCovid ={
            date: new Date(this.state.date),
            state:this.state.stateName,
            cases:this.state.cases,
            deaths:this.state.deaths
        }

        axios.post('http://localhost:4000/covid/add',newCovid)
        .then(res=> console.log(res.data))
        .catch(err=>{
            console.log("error adding record");
        });

        this.setState({
                stateName:'',
                date:'',
                cases:'',
                deaths:''
        });

        this.props.history.push('/');
    }

    render(){
        return(
            <div style={{marginTop:20}} className="add-bar-custom">
                <h3>Add New Covid-19 Record</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label >State </label>
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

                    <div className="form-group">
                        <label >Date </label>
                        <input className="form-control"type="date" value={this.state.date} onChange={this.onChangeDate}/>
                    </div>

                    <div className="form-group">
                        <label >Cases </label>
                        <input className="form-control"type="number" value={this.state.cases} onChange={this.onChangeCases}/>
                    </div>
                    <div className="form-group">
                        <label >Deaths (per day) </label>
                        <input className="form-control"type="number" value={this.state.deaths} onChange={this.onChangeDeaths}/>
                    </div>
                    <div className="form-group" marginTop="20px">
                        <center>
                            <input type="submit" value="Add this record" className="btn btn-outline-success" />
                        </center>                   
                    </div>
                </form>
            </div>
        );
    }
}