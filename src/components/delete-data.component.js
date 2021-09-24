import React, {Component} from 'react';
import axios from 'axios';
export default class DeleteData extends Component{
    constructor(props){
        super(props);
        this.state ={
            date:'',
            stateName:'',
            cases:'',
            deaths:''
           }
        this.onSubmit=this.onSubmit.bind(this);
     }

     onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:4000/covid/delete/'+this.props.match.params.id)
        .then(res => console.log(res.data));
        alert('Record Deleted');
        console.log('Form updated ');
        this.props.history.push('/')

    }

     componentDidMount(){
        axios.get('http://localhost:4000/covid/'+ this.props.match.params.id)
        .then(response =>{
            this.setState({
                date:new Date(response.data.date),
                stateName:response.data.state,
                cases:response.data.cases,
                deaths:response.data.deaths
            })
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        return(
            <div style={{marginTop:20}} className="add-bar-custom">
            <h3>Delete Record for Id: {this.props.match.params.id}</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label >State </label>
                    <input className="form-control"type="text" value={this.state.stateName}readonly/>
                </div>
                <div className="form-group">
                    <label >Date </label>
                    <input className="form-control"type="date" value={this.state.date} readonly/>
                </div>

                <div className="form-group">
                    <label >Cases </label>
                    <input className="form-control"type="number" value={this.state.cases} readonly/>
                </div>
                <div className="form-group">
                    <label >Deaths (on day)</label>
                    <input className="form-control"type="number" value={this.state.deaths} readonly/>
                </div>
                <div className="form-group" marginTop="20px">
                    <center>
                        <label >Are you sure you want to Delete? </label><br/>
                        <input type="submit" value="Delete Record" className="btn btn-outline-danger" />
                    </center>                   
                </div>
            </form>
        </div>
    )
        }
}