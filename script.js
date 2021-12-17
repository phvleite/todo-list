const listaTarefa = [];

const tarefa = document.getElementById('texto-tarefa');
const btInserirTarefa = document.getElementById('criar-tarefa');
const inputTexto = document.getElementById('texto-tarefa')

function selecionarTarefa(evento) {
  const selecionado = document.getElementById(evento.target.id);
  if (selecionado.className !== 'item-tarefas selecionado') {
    const selecionadoAtual = document.querySelector('.selecionado');
    if (selecionadoAtual) {
      selecionadoAtual.classList.remove('selecionado');
    }
    selecionado.classList.add('selecionado');
  } else {
    selecionado.classList.remove('selecionado');
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

function verificaEnter(evento) {
  const tecla = evento.keyCode;
  if (tecla === 13) {
    insereTarefa();
  }
}

btInserirTarefa.addEventListener('click', insereTarefa);
inputTexto.addEventListener('keyup', verificaEnter);
