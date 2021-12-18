/* eslint-disable sonarjs/cognitive-complexity */
const listaTarefa = [];
let itensTodosSalvos = [];
const idElementoPaiLista = 'lista-tarefas';
const tarefa = document.getElementById('texto-tarefa');
const btInserirTarefa = document.getElementById('criar-tarefa');
const inputTexto = document.getElementById('texto-tarefa');
const btApagaTudo = document.getElementById('apaga-tudo');
const btApagaFinalizados = document.getElementById('remover-finalizados');
const classBasicaItemLista = 'item-tarefas';
const btSalvarTarefas = document.getElementById('salvar-tarefas');
const btMoverCima = document.getElementById('mover-cima');
// const btMoverBaixo = document.getElementById('mover-baixo');
const btRemoverSelecionado = document.getElementById('remover-selecionado');

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

function verificaExistencia(itensTodos, itensRemover) {
  let cont = 0;
  const itens = [];
  for (let i = 0; i < itensTodos.length; i += 1) {
    for (let x = 0; x < itensRemover.length; x += 1) {
      if (itensTodos[i].id === itensRemover[x].id) {
        cont += 1;
      }
    }
    if (cont === 0) {
      itens.push(itensTodos[i]);
    }
    cont = 0;
  }
  return itens;
}

function recuperaLista(itensRemover, itensTodos) {
  const lista = document.getElementById(idElementoPaiLista);
  const itensLista = verificaExistencia(itensTodos, itensRemover);
  if (itensLista.length > 0) {
    for (let i = 0; i < itensLista.length; i += 1) {
      itensLista[i].setAttribute('id', `${i}`);
      itensLista[i].style.order = `${i}`;
      lista.appendChild(itensLista[i]);
      listaTarefa.push(itensLista[i].innerText);
    }
    acaoTarefas();
  }
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
    itemLista.style.order = `${i}`;
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

function removeTerefas(tipoTarefa, mensagem) {
  if (listaTarefa.length === 0) {
    alert('Lista vazia!');
    return;
  }
  const itensRemover = document.querySelectorAll(tipoTarefa);
  const itensTodos = document.querySelectorAll('.item-tarefas');
  if (itensRemover.length === 0) {
    alert(mensagem);
    return;
  }
  const lista = document.getElementById(idElementoPaiLista);
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  listaTarefa.splice(0, listaTarefa.length);
  recuperaLista(itensRemover, itensTodos);
}

function removeFinalizados() {
  const tpTarefa = '.completed';
  const mensagem = 'Não existem tarefas finalizadas!';
  removeTerefas(tpTarefa, mensagem);
}

function removeSelecionado() {
  const tpTarefa = '.selecionado';
  const mensagem = 'Não existe tarefa selecionada!';
  removeTerefas(tpTarefa, mensagem);
}

function verificaEnter(evento) {
  const tecla = evento.keyCode;
  if (tecla === 13) {
    insereTarefa();
  }
}

function insereTarefas() {
  const lista = document.getElementById(idElementoPaiLista);
  for (let i = 0; i < listaTarefa.length; i += 1) {
    const itemLista = document.createElement('li');
    itemLista.innerText = listaTarefa[i];
    itemLista.setAttribute('class', itensTodosSalvos[i][2]);
    itemLista.setAttribute('id', `${itensTodosSalvos[i][0]}`);
    lista.appendChild(itemLista);
  }
  acaoTarefas();
}

function recuperaTarefas() {
  if (window.localStorage.getItem('itensTodosSalvos') === null) {
    window.localStorage.setItem('itensTodosSalvos', JSON.stringify(itensTodosSalvos));
  }
  itensTodosSalvos = JSON.parse(window.localStorage.getItem('itensTodosSalvos'));
  if (itensTodosSalvos.length > 0) {
    for (let i = 0; i < itensTodosSalvos.length; i += 1) {
      listaTarefa.push(itensTodosSalvos[i][1]);
    }
    insereTarefas();
  }
}

recuperaTarefas();

function salvaListaTarefas() {
  const itensTodos = document.querySelectorAll('.item-tarefas');
  if (itensTodos.length === 0) {
    alert('Lista de terefas vazia!');
    return;
  }
  itensTodosSalvos = [];
  for (let i = 0; i < itensTodos.length; i += 1) {
    itensTodosSalvos.push(
      [
        `${itensTodos[i].id}`,
        `${itensTodos[i].textContent}`,
        `${itensTodos[i].className}`,
      ],
    );
  }
  localStorage.setItem('itensTodosSalvos', JSON.stringify(itensTodosSalvos));
  alert('Lista de Tarefas salvas!');
}

function moverCima(evento) {
  const ordem = document.getElementById(evento.target.id);
  console.log(ordem.id);
}

btInserirTarefa.addEventListener('click', insereTarefa);
inputTexto.addEventListener('keyup', verificaEnter);
btApagaTudo.addEventListener('click', apagaTudo);
btApagaFinalizados.addEventListener('click', removeFinalizados);
btRemoverSelecionado.addEventListener('click', removeSelecionado);
btSalvarTarefas.addEventListener('click', salvaListaTarefas);
btMoverCima.addEventListener('click', moverCima);
