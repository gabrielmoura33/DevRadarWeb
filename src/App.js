import React, { useState,useEffect } from 'react';
import api from './services/api';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import './components/DevItem/Style.css'

function App() {
  const [ devs, setDevs ] = useState([]);
  

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data);
    }

    loadDevs()
  }, []);


  async function handleAddDev (data){
    let apiError = false;
    const response = await api.post('/devs', data)
    .catch(error => {
      toast.error('Usuário do GitHub Não Encontrado');
      apiError = true;
    });
    if(!apiError)
      setDevs([...devs, response.data]);
  }
  return (
      <div id="app">
        <ToastContainer />
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={ handleAddDev }/>
        </aside>
        <main>
          <ul>
              {devs.map(dev => (<DevItem key={dev._id} dev={dev} />))}         
        </ul>
              
        </main>
      </div>
  );
}

export default App;
