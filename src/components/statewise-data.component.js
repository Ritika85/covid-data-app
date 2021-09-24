import React, {Component} from 'react';
import axios from 'axios';
export default class StatewiseData extends Component{
    constructor(props){
        super(props);

        this.state={
            cases:'',
            deaths:''
        }
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.props.history.push('/');

    }

    componentDidMount(){
        axios.get('http://localhost:4000/covid/show/counts/'+ this.props.match.params.state)
        .then(response =>{
            this.setState({
                cases: response.data[0].totalCases,
                deaths: response.data[0].totalDeaths
            })
        })
        .catch(function(error){
            console.log(error)
        })
        
    }

    
    render(){
        return(
            <div style={{marginTop:20}} className="add-bar-custom">
            <h3>Count for State: {this.props.match.params.state}</h3>
           
            <br/>
            <div className="form-group">
            <label > Total Cases </label>
            <input className="form-control"type="number" value={this.state.cases} />
            </div><br/>
            <div className="form-group">
            <label > Total Deaths </label>
            <input className="form-control"type="number" value={this.state.deaths} />
            </div>
            <div className="form-group" marginTop="20px">
                    <center>
                        <label style={{color:"slategrey"}} >These cases are updated as per states registered data! </label><br/>
                        <input type="submit" value="OK " className="btn btn-outline-success" onClick={this.onSubmit} />
                    </center>
            </div>
            </div>
        );
    }
}