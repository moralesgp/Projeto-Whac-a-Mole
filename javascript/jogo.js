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
    botao.disable = true;
    sobeToupeira();
}

function sobeToupeira() {
    var buraco = Math.floor(Math.random() * 5);
    var objetoBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'imagens/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

function tiraToupeira(buraco) {
    var objetoBuraco = document.getElementById('buraco' + buraco);
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
    // pega as imagens
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = centena.nextSibling;
    let objUnidade = dezena.nextSibling;

    // calcula o valor de cada algarismo
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor/10)%10)
    let unidade = (valor % 10)

    // muda a imagem e o valor do atributo para ledor de tela
    objCentena.src = 'images/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'images/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'images/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammer-down.png), default';
}

function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammer.png), default';
}

function martelada(evento) {
    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos++;
        evento.target.src = 'images/hole.png';
        clearTimeout(timer);
    }
    else {
        // errou
        errados++;
    }

    mostraPontuacao();
}