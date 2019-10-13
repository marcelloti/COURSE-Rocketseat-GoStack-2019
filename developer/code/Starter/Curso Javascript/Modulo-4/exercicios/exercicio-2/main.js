var listElement = document.querySelector('#app ul');

/**
 * Função que adiciona um item à lista de repositórios
 **/
function addRepo(item){
  var repoElement = document.createElement('li');
  var repoText = document.createTextNode(item);
  repoElement.appendChild(repoText);
  listElement.appendChild(repoElement);
}

/**
 * Função que popula a lista de repositórios do usuário
 */
function popular(){
  // Zerando a lista atual
  listElement.innerHTML = '';

  // Apagando possíveis erros anteriores
  var errorElement = document.querySelector('.error');
  if (errorElement !== null){
    errorElement.remove();
  }

  // Gravando na variável o input
  var inputElement = document.querySelector('#app input');
  var nomeUsuario = inputElement.value;
  
  // Apagando o input
  inputElement.value = '';

  // Exibindo "carregando"
  addRepo('Carregando...');

  buscar(nomeUsuario).then(function(response){
    // Zerando a lista atual
    listElement.innerHTML = '';

    for (repo of response.data){
      addRepo(repo.name);
    }
  }).catch(function(error){
    // Zerando a lista atual
    listElement.innerHTML = '';

    var errorElement = document.createElement('span');
    errorElement.className = 'error';
    errorElement.innerHTML = 'Erro! Usuário não existe ou erro na requisição'
    document.body.append(errorElement);
  });
}

/**
 * Função que busca a lista de repositórios do usuário no github
 * 
 * @param {string} nomeUsuario 
 */
function buscar(nomeUsuario){
  return axios.get('https://api.github.com/users/'+nomeUsuario+'/repos');
}