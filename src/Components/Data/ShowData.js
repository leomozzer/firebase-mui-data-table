import React from "react";
import MUIDataTable from "mui-datatables";
import { ReadFromDb } from "../Firebase/firestore";
import firebase from '../Firebase/firestore';

const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

const users = db.collection("Users")


class ShowData extends React.Component{

  state = {
    name : [],
    age: [],
    city: [],
    state: [],
    e_mail: [],
    size: 0,
  }

  componentWillMount(){
    let i = 0;
    ReadFromDb().then(doc => {
      this.setState({size : doc.size});
      console.log(doc.size)
      while(i !== doc.size){
        users.doc(doc.ids[i].id).get().then(resposta => {
          this.setState({ 
            name : this.state.name.concat([resposta.id]),
            age : this.state.age.concat([resposta.data().Idade]),
            city : this.state.city.concat([resposta.data().Cidade]),
            state : this.state.state.concat([resposta.data().Estado]),
            e_mail: this.state.e_mail.concat([resposta.data().Mail]),
            })
        })
        i++;
      }
    })
  }
  CreateData(name, age, city, state, mail){
    return {name, age, city, state, mail}
  }
  render(){
    const { name, age, city, state, e_mail, size } = this.state;
    let i = 0;
    let data = []
    while(i !== size){
      data[i] = this.CreateData(name[i], age[i], city[i], state[i], e_mail[i]);
      i++;
    }
    const columns = [
      {
       name: "name",
       label: "Name",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "age",
       label: "Age",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "city",
       label: "City",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "state",
       label: "State",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
        name: "mail",
        label: "E-mail",
        options: {
         filter: true,
         sort: false,
        }
       },
     ];
    const options = {
      filterType: 'checkbox',
      onRowsDelete(rowsDeleted){
        const data_size = rowsDeleted.data.length
        if(data_size > 1){
          let index = []
          let i = 0;
          while(data_size !== i){
            index = index.concat([rowsDeleted.data[i].index])
            db.collection("Usuários").doc(data[index[i]].name).delete();
            i++;
          }
        }else{
          const index = rowsDeleted.data[0].index;
          db.collection("Usuários").doc(data[index].name).delete();
        }
      }
    };
    return(
      <MUIDataTable
        title={"Firestore data"}
        data={data}
        columns={columns}
        options={options}
      />
    )
  }
}

export default ShowData;