import { useState } from "react";
import Nome from "./components/Nome";

function App(){
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState([
   'Pagar a conta de luz', 
   'Estudar React JS'
  ]);

  const [user, setUser] = useState({});

  function handleRegister(e){
    e.preventDefault();

    setTarefas([...tarefas, input]);
    setInput('');
  }

  return(
    <div>
      <h1>Cadastrando usuário</h1>

      <form onSubmit={handleRegister}>
        <label>Nome da tarefa: </label>
        <br/>
        <input placeholder="Digite uma tarefa"
        value={input}
        onChange={(e) => setInput(e.target.value)}></input>

        <br/><br/>
        <button type="submit">Registar</button>
      </form>

      <br/><br/>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;