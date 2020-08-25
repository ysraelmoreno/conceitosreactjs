import React, { useState, useEffect }  from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title : 'Desafio Node Rocket',
      url: 'https://github.com/ysraelmoreno/desafionoderocket',
      techs: ['NodeJS', 'JavaScript'],
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    // Estamos chamando a função para o nosso "backend" para deletar o nosso repositório
    await api.delete(`/repositories/${id}`);

    /* Precisamos atualizar no nosso front-end, 
    *  com as novas informações contidas dentro da API, tendo em vista que deletamos um projeto.
    */
    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}> 
          {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
