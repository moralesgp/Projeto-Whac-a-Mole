/** quantidade de acertos */
var acertos;
acertos = 0;

/** quantidade de toupeiras perdidas */
var perdidos = 0;

/** quantidade de marteladas erradas */
var errados = 0;

/** tempo entre cada toupeira sair do buraco */
var intervalo = 5000;

/** tempo que a toupeira fica fora do buraco */
var janela = 2000;

/** timer que controla o tempo da toupeira fora do buraco */
var timer = null;

// Helped by AI: controla a duração total da partida.
/** timer que controla a duração total da partida */
var timerPartida = null;

/** indica se a partida está em andamento */
var jogoAtivo = false;

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
};

function start() {
    var botao = document.getElementById('start');

    botao.removeEventListener('click', start);
    botao.disabled = true;
    jogoAtivo = true;
    // Helped by AI: encerra a partida automaticamente após 45 segundos.
    timerPartida = setTimeout(finalizaJogo, 45000);
    sobeToupeira();
}

function sobeToupeira() {
    // Helped by AI: impede novos ciclos depois do fim da partida.
    if (!jogoAtivo) {
        return;
    }

    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'imagens/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

function finalizaJogo() {
    jogoAtivo = false;
    clearTimeout(timer);
    alert('Fim de jogo!');
}

function tiraToupeira(buraco) {
    if (!jogoAtivo) {
        return;
    }

    var objBuraco = document.getElementById('buraco' + buraco);

    // Helped by AI: evita contar duas vezes uma toupeira já removida.
    if (!objBuraco.src.includes('hole-mole')) {
        return;
    }

    objBuraco.src = 'imagens/hole.png';
    perdidos++;
    mostraPontuacao();
}

function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('saldo', Math.max(acertos - errados - perdidos, 0));  
}

function mostraPontuacaoDe(display, valor) {
    // calcula o valor de cada algarismo
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor/10)%10)
    let unidade = (valor % 10)

    // pega as imagens
    // Helped by AI: seleciona somente elementos img, ignorando espaços do HTML.
    let objCentena = document.getElementById(display).firstElementChild;
    let objDezena = objCentena.nextElementSibling;
    let objUnidade = objDezena.nextElementSibling;

    // muda a imagem e o valor do atributo para ledor de tela
    objCentena.src = 'imagens/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'imagens/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'imagens/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammerDown.png), default';
}

function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammer.png), default';
}

function martelada(evento) {
    // Helped by AI: ignora cliques após o término da partida.
    if (!jogoAtivo) {
        return;
    }

    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos++;
        evento.target.src = 'imagens/hole.png';
        clearTimeout(timer);
    }
    else {
        // errou
        errados++;
    }

    mostraPontuacao();
}