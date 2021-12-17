const listaTarefa = [];

const tarefa = document.getElementById('texto-tarefa');
const btInserirTarefa = document.getElementById('criar-tarefa');

function selecionarTarefa(evento) {
  const selecionado = document.getElementById(evento.target.id);
  if (selecionado.className !== 'item-tarefas selecionado') {
    selecionado.classList.add('selecionado');
  }
}

function acaoTarefas() {
  const tarefas = document.getElementsByClassName('item-tarefas');
  console.log(tarefas);
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].addEventListener('click', selecionarTarefa);
    // tarefas[i].addEventListener('dbclick', riscarTarefa);
  }
}

function insereTarefa() {
  if (tarefa.value === '') {
    alert('Texto em branco, valor inválido!');
    return;
  }
  listaTarefa.push(tarefa.value);
  const lista = document.getElementById('lista-tarefas');
  const itemLista = document.createElement('li');
  for (let i = 0; i < listaTarefa.length; i += 1) {
    itemLista.innerText = listaTarefa[i];
    itemLista.setAttribute('class', 'item-tarefas');
    itemLista.setAttribute('id', `${i}`);
    lista.appendChild(itemLista);
  }
  tarefa.value = '';
  acaoTarefas();
}

btInserirTarefa.addEventListener('click', insereTarefa);
