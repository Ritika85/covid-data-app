import React, {Component} from 'react';
import axios from 'axios';
const CovidData =props=>(
    <tr>
        <td>{props.data}</td>
    </tr>
)
export default class DisplayStates extends Component{
    constructor(props){
        super(props);
        this.state ={covid_list:[]};
        this.onSubmit=this.onSubmit.bind(this);

    }
    onSubmit(e){
        e.preventDefault();
        this.props.history.push('/');
    }

    componentDidMount(){
        axios.get('http://localhost:4000/covid/show/states/'+this.props.match.params.number)
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
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead >
                        <tr>
                            <th>States</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.covidList() }
                    </tbody>
                    </table>
                    <div className="form-group" marginTop="20px">
                    <center>
                        <label style={{color:"wheat"}} >These states are updated as per registered cases! </label><br/>
                        <input type="submit" value="OK " className="btn btn-light" onClick={this.onSubmit} />
                    </center>
            </div>
            </div>
        );
    }
}