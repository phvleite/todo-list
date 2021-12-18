const listaTarefa = [];
const idElementoPaiLista = 'lista-tarefas';
const tarefa = document.getElementById('texto-tarefa');
const btInserirTarefa = document.getElementById('criar-tarefa');
const inputTexto = document.getElementById('texto-tarefa');
const btApagaTudo = document.getElementById('apaga-tudo');
const btApagaFinalizados = document.getElementById('remover-finalizados');
const classBasicaItemLista = 'item-tarefas';
// const btSalvarTarefas = document.getElementById('salvar-tarefas');
// const btMoverCima = document.getElementById('mover-cima');
// const btMoverBaixo = document.getElementById('mover-baixo');
// const btRemoverSelecionado = document.getElementById('remover-selecionados');

function selecionarTarefa(evento) {
  const classeEvento = 'selecionado';
  const selecionado = document.getElementById(evento.target.id);
  const slClNm = selecionado.className;
  if (slClNm === `item-tarefas ${classeEvento}`) {
    selecionado.classList.remove(classeEvento);
  } else if (slClNm !== `item-tarefas ${classeEvento}` && slClNm !== 'item-tarefas completed') {
    const selecionadoAtual = document.querySelector(`.${classeEvento}`);
    if (selecionadoAtual) {
      selecionadoAtual.classList.remove(classeEvento);
    }
    selecionado.classList.add(classeEvento);
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
  const tarefas = document.getElementsByClassName(classBasicaItemLista);
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].addEventListener('click', selecionarTarefa);
    tarefas[i].addEventListener('dblclick', riscarTarefa);
  }
}

function recuperaLista() {
  if (listaTarefa.length === 0) {
    return;
  }
  const lista = document.getElementById(idElementoPaiLista);
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  const itemLista = document.createElement('li');
  for (let i = 0; i < listaTarefa.length; i += 1) {
    itemLista.innerText = listaTarefa[i];
    itemLista.setAttribute('class', classBasicaItemLista);
    itemLista.setAttribute('id', `${i}`);
    lista.appendChild(itemLista);
  }
  acaoTarefas();
}

function insereTarefa() {
  if (tarefa.value === '') {
    alert('Texto em branco, valor inválido!');
    return;
  }
  listaTarefa.push(tarefa.value);
  const lista = document.getElementById(idElementoPaiLista);
  const itemLista = document.createElement('li');
  for (let i = 0; i < listaTarefa.length; i += 1) {
    itemLista.innerText = listaTarefa[i];
    itemLista.setAttribute('class', classBasicaItemLista);
    itemLista.setAttribute('id', `${i}`);
    lista.appendChild(itemLista);
  }
  tarefa.value = '';
  acaoTarefas();
}

function apagaTudo() {
  if (listaTarefa.length === 0) {
    alert('Lista vazia!');
    return;
  }
  const lista = document.getElementById(idElementoPaiLista);
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  listaTarefa.splice(0, listaTarefa.length);
}

function apagaFinalizados() {
  if (listaTarefa.length === 0) {
    alert('Lista vazia!');
    return;
  }
  let lista = document.querySelectorAll('.completed');
  if (lista.length === 0) {
    alert('Não existem tarefas finalizadas!');
    return;
  }
  for (let i = 0; i < lista.length; i += 1) {
    lista[i].parentElement.remove(lista[i]);
  }
  listaTarefa.splice(0, listaTarefa.length);
  lista = document.getElementById(idElementoPaiLista);
  console.log(lista);
/*   for (let i = 0; i < lista.length; i += 1) {
    listaTarefa.push(lista[i].innerText);
  } */
  // recuperaLista();
}

function verificaEnter(evento) {
  const tecla = evento.keyCode;
  if (tecla === 13) {
    insereTarefa();
  }
}

btInserirTarefa.addEventListener('click', insereTarefa);
inputTexto.addEventListener('keyup', verificaEnter);
btApagaTudo.addEventListener('click', apagaTudo);
btApagaFinalizados.addEventListener('click', apagaFinalizados);
