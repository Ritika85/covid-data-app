import React, {Component} from 'react';
import axios from 'axios';



export default class EditData extends Component{
    constructor(props){
       super(props);
       this.onChangeCases=this.onChangeCases.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeDeaths=this.onChangeDeaths.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
       this.state ={
        date:'',
        stateName:'',
        cases:'',
        deaths:''
       }
    }

    onChangeDate(e){
        this.setState({
            date: new Date(e.target.value)
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

        const newCovid ={
            date: this.state.date,
            state:this.state.stateName,
            cases:this.state.cases,
            deaths:this.state.deaths
        }
        axios.post('http://localhost:4000/covid/edit/'+this.props.match.params.id, newCovid)
        .then(res => console.log(res.data));
        alert('Data Updated Successfully')
        console.log('Data Updated Successfully ');
        this.setState({
                date:'',
                stateName:'',
                cases:'',
                deaths:''
        });
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
                <h3>Update Record for Id: {this.props.match.params.id}</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label >State </label>
                        <input className="form-control"type="text" value={this.state.stateName}readonly/>
                    </div>
                    <div className="form-group">
                        <label >Date </label>
                        <input className="form-control"type="date" value={this.state.date} onChange={this.onChangeDate} />
                    </div>

                    <div className="form-group">
                        <label >Cases </label>
                        <input className="form-control"type="number" value={this.state.cases} onChange={this.onChangeCases}/>
                    </div>
                    <div className="form-group">
                        <label >Deaths (on day)</label>
                        <input className="form-control"type="number" value={this.state.deaths} onChange={this.onChangeDeaths}/>
                    </div>
                    <div className="form-group" marginTop="20px">
                        <center>
                            <input type="submit" value="Update Record" className="btn btn-outline-success" />
                        </center>                   
                    </div>
                </form>
            </div>
        );
    }
}