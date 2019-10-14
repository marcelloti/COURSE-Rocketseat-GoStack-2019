// Exercício 1.1

// ANTES
// Função delay aciona o .then após 1s
/*
const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

function umPorSegundo() {
  delay().then(() => {
    console.log('1s');
    delay().then(() => {
      console.log('2s');
      delay().then(() => {
        console.log('3s');
      });
    })
  });
}

umPorSegundo();
*/

// DEPOIS
/*
const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

async function umPorSegundo () {
  await delay();
  console.log('1s');
  await delay();
  console.log('2s');
  await delay();
  console.log('3s');
}

umPorSegundo();
*/

/***************************************************************/

// Exercício 1.2

// ANTES
/*
import axios from 'axios';
function getUserFromGithub(user) {
  axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log('Usuário não existe');
    })
}
getUserFromGithub('diego3g');
getUserFromGithub('diego3g124123');
*/

// DEPOIS
/*
import axios from 'axios';
async function getUserFromGithub(user) {
  try{
    var response = await axios.get(`https://api.github.com/users/${user}`);
    console.log(response.data);
  }
  catch (err) {
    console.log('Usuário não existe');
  }
}

getUserFromGithub('diego3g');
*/

/***************************************************************/

// Exercício 1.3
// ANTES
/*
import axios from 'axios';
class Github {
  static getRepositories(repo) {
    axios.get(`https://api.github.com/repos/${repo}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log('Repositório não existe');
      })
  }
}
Github.getRepositories('rocketseat/rocketseat.com.br');
Github.getRepositories('rocketseat/dslkvmskv');
*/

// DEPOIS
/*
import axios from 'axios';
class Github {
  static async getRepositories(repo) {
    try{
      var response = await axios.get(`https://api.github.com/repos/${repo}`);
      console.log(response.data);
    }
    catch(err){
      console.log(err);
      console.log('Repositório não existe');
    }
  }
}

Github.getRepositories('rocketseat/bootcamp-gostack-desafio-03');
Github.getRepositories('rocketseat/dslkvmskv');
*/

/***************************************************************/

// Exercício 1.4
// ANTES
/*
import axios from 'axios';
const buscaUsuario = usuario => {
  axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log('Usuário não existe');
    });
}
buscaUsuario('diego3g');
*/

// DEPOIS
import axios from 'axios';
const buscaUsuario = async (user) => {
  try{
    var response = await axios.get(`https://api.github.com/users/${user}`);
    console.log(response.data);
  }
  catch(err){
    console.log('Usuário não existe');
  }
}
buscaUsuario('diego3g');