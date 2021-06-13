const getBanco = () => JSON.parse(localStorage.getItem('BancoTODO')) ?? [];
const setBanco = (banco) =>
  localStorage.setItem('BancoTODO', JSON.stringify(banco));

const criarItem = (text, status, indice) => {
  const item = document.createElement('label');
  item.classList.add('todo__item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div> ${text} </div>
    <input 
      type="button" 
      value="X"
      data-indice=${indice}>
  `;
  document.getElementById('todoList').appendChild(item);
};

function textLabel() {
  var text = document.getElementById('textInput').value;
  if (event.key === 'Enter') {
    const banco = getBanco();
    banco.push({ text: text, status: '' });
    setBanco(banco);
    atualizarTela();
    document.getElementById('textInput').value = '';
  }
}

const limparTela = () => {
  const todoList = document.getElementById('todoList');
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const atualizarTela = () => {
  limparTela();
  const banco = getBanco();
  banco.forEach((element, indice) => {
    criarItem(element.text, element.status, indice);
  });
};

const setStatus = (index) => {
  const banco = getBanco();
  banco[index].status = banco[index].status === '' ? 'checked' : '';
  setBanco(banco);
};

const removerItem = (index) => {
  const banco = getBanco();
  banco.splice(index, 1);
  setBanco(banco);
  atualizarTela();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === 'button') {
    removerItem(element.dataset.indice);
  } else if (element.type === 'checkbox') {
    setStatus(element.dataset.indice);
  }
};

const clicked = document
  .getElementById('todoList')
  .addEventListener('click', clickItem);

atualizarTela();

//Outra forma de fazer:
// const inserirItem = (event) => {
//   const tecla = event.key;
//   const texto = event.target.value;
//   if(tecla === 'Enter'){
//     banco.push(texto);
//     atualizarTela();
//     event.target.value = '';
//   }
// };

// document.getElementById('textInput').addEventListener('keypress', inserirItem);
