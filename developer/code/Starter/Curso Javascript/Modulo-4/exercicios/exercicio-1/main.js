/**
 * Função que verifica se o usuário é maior de 18 anos
 */
function checaIdade(idade){
  return new Promise(function(resolve, reject){
    console.log('aguarde 2 segundos...');
    setInterval(function(){
      if (idade > 18){
        resolve('sim');
      } else {
        reject('não');
      }
    }, 2000)
  });
}

checaIdade(17)
  .then(function() {
    console.log("Maior que 18");
  })
  .catch(function() {
    console.log("Menor que 18");
  })