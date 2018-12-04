import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import { MODEL } from './model';
import { FORMDATA } from './data';
import './App.css';

class App extends Component {
  state = {
    data: [],
    current: {}
  }

  componentDidMount() {
    this.setState({
      data: [...FORMDATA]
    })
  }

  onSubmit = (model) => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter((d) => {
        return d.id !== model.id
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }
    this.setState({
      data: [model, ...data]
    });
  }

  onEdit = (id) => {
    let record = this.state.data.find((d) => {
      return d.id === id;
    });
    // alert(JSON.stringify(record));
    this.setState({
      current: record
    })
  }

  render() {
    let data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.age}</td>
          <td>{d.qualification}</td>
          <td>{d.gender}</td>
          <td>{d.rating}</td>
          <td>{d.city}</td>
          {d.skills?<td>{d.skills.join(",")}</td>:''}
          <td><button className="btn btn-default" onClick={() => { this.onEdit(d.id) }}>edit</button></td>
        </tr>
      );
    });

    return (
      <div className="App">
        <div className="col-xs-2"></div>
        <div className="col-xs-3 mar-t-50">
          <DynamicForm 
            className="card"
            formTitle="Health & Behaviour"
            defaultValues={this.state.current}
            model={MODEL}
            onSubmit={(model) => { this.onSubmit(model) }}
          />
        </div>
        <div className="col-xs-5">
          <h3>Form data</h3>
          <div className="card">
            <table className="table table-bordered table-hover">
              <tbody>{data}</tbody>
            </table>
          </div>
          <h3 className="mar-t-50">From data</h3>
          <div className="card">
            {JSON.stringify(this.state.data)}
          </div>
          <h3 className="mar-t-50">From metadata</h3>
          <div className="card">
            {JSON.stringify(MODEL)}
          </div>
        </div>
        <div className="col-xs-1"></div>
      </div>
    );
  }
}

export default App;
