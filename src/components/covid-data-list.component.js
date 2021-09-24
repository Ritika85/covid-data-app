import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

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

export default class CovidDataList extends Component{

    constructor(props){
        super(props);
        this.state ={covid_list:[]};

    }

    componentDidMount(){
        axios.get('http://localhost:4000/covid/')
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
            
            <div className="container">
                <div>
                    <p> Welcome to Covid Data list Component</p>
                </div>
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
        );
    }
}