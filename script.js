const listaTarefa = [];

const tarefa = document.getElementById('texto-tarefa');
const btInserirTarefa = document.getElementById('criar-tarefa');
const inputTexto = document.getElementById('texto-tarefa');

function selecionarTarefa(evento) {
  const classeEvento = 'selecionado';
  const selecionado = document.getElementById(evento.target.id);
  if (selecionado.className === `item-tarefas ${classeEvento}`) {
    selecionado.classList.remove(classeEvento);
  // eslint-disable-next-line max-len
  } else if (selecionado.className !== `item-tarefas ${classeEvento}` && selecionado.className !== 'item-tarefas completed') {
    const selecionadoAtual = document.querySelector(`.${classeEvento}`);
    if (selecionadoAtual) {
      selecionadoAtual.classList.remove(classeEvento);
    }
    console.log(selecionado.classList);
    selecionado.classList.add(classeEvento);
    console.log(selecionado.classList);
  }
}

function riscarTarefa(evento) {
  const classeEvento = 'completed';
  const selecionado = document.getElementById(evento.target.id);
  if (selecionado.className === `item-tarefas ${classeEvento}`) {
    selecionado.classList.remove(classeEvento);
    selecionado.classList.remove('selecionado');
  } else {
    selecionado.classList.add(classeEvento);
    selecionado.classList.remove('selecionado');
  }
}

function acaoTarefas() {
  const tarefas = document.getElementsByClassName('item-tarefas');
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].addEventListener('click', selecionarTarefa);
    tarefas[i].addEventListener('dblclick', riscarTarefa);
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

function verificaEnter(evento) {
  const tecla = evento.keyCode;
  if (tecla === 13) {
    insereTarefa();
  }
}

btInserirTarefa.addEventListener('click', insereTarefa);
inputTexto.addEventListener('keyup', verificaEnter);
