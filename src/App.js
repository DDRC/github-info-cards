import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { render } from '@testing-library/react';
import axios from "axios"


// lista de perfiles de github
const testData=[{name:'fercho2798',avatar_url:'https://avatars.githubusercontent.com/u/47802477?v=4',company:''},
{name:'alexanderdeoz',avatar_url:'https://avatars.githubusercontent.com/u/52291881?v=4',company:''},
{name:'Henrry6',avatar_url:'https://avatars.githubusercontent.com/u/67518799?v=4',company:''},
{name:'bryanPEREZ1497',avatar_url:'https://avatars.githubusercontent.com/u/59462642?v=4',company:''},
{name:'khabLexander',avatar_url:'https://avatars.githubusercontent.com/u/33032880?v=4',company:''}];

//DDRC-comment componente formulario

function Formulario (props){
  //establece una propiedad(userName),un setter(setName) y un getter generico(useState)
  const [userName, setName] = useState('');
//establece un metodo que maneja el comportamiento del boton Añadir tarjetas
  const handleSubmit= (async (event)=>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setName('');
  });
  //devuelve un elemento(formulario)jsx 
    return(
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={userName}
        onChange={event=>setName(event.target.value)}
        placeholder="Usuario de gihub"
        required
        /> 
        <button>Añadir tarjetas</button>
      </form>
    );
}
//DDRC-comment  obtine y enumera la lista de cartas
function CardList(props){
  return(<div className='listaCartas'>
    {props.profiles.map(profile=><Card {...profile}/>)}
  </div>);
}

// DDRC-comment carta de información de un perfil de github
function Card(props) {
  	const profile = props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} width='100vw' height='100vw'/>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
}

//DDRC-comment componente que recopila tanto el formulario como la lista de tarjetas para que sean renderizadas
function App (props) {
 const [profiles,setProfile]=useState(testData);
 
  const addNewProfile = (profileData) => {
  	setProfile([...profiles, profileData],);
  };

  	return (
    	<div>
    	  <div className="header">{props.title}</div>
        <Formulario onSubmit={addNewProfile} />
        <CardList profiles={profiles} />
    	</div>
    );
  
}
// exporta app para ser usado donde sea
export default App;



/* 
parte de la  app de tarjetas
 state={
    profiles:testData,
  }
  render(){
    return(
      <div>
        <div className="header"> {this.props.title}</div>
        <Formulario />
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }


return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <p>Enter your name here☺☻♥♠♣♦</p>
      <input placeholder="tu nombre aqui!!!" />
    </header>
  </div>
); */