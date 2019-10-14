const arr = [1, 3, 4, 5, 8, 9];
console.log('Array inicial: ', arr);
/* 
  Percorre o array, modificando o mesmo de acordo
  com as operações dentro da function
*/

const newArr = arr.map(function (item, index) {
  return item + index;
});
console.log('Novo array feito pela função map: ', newArr);
/*
  Reduz o array a um único valor - percorre os
  itens do array e vai fazendo as operações
  dentro da function
*/

const sum = arr.reduce(function (total, next) {
  return total + next;
});
console.log('Soma (redução) feita pela função reduce: ', sum);
/*
  Modifica o array 'arr', mantendo nele apenas os itens
  pares (como informado dentro da function)
 */

const filter = arr.filter(function (item) {
  return item % 2 === 0;
});
console.log(filter);
/*
  Busca dentro do array o item que é igual a 4
 */

const find = arr.find(function (item) {
  return item === 4;
});
console.log(find);
