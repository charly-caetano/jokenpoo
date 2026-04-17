// ========================
// Estado do Jogo
// ========================
const estado = {
    escolhaJogador: null,
    pontosJogador: 0,
    pontosMaquina: 0,
};

const opcoes = ['pedra', 'papel', 'tesoura'];

// ========================
// Elementos do DOM
// ========================
const pontosJogadorEl = document.getElementById('pontos-jogador');
const pontosMaquinaEl = document.getElementById('pontos-maquina');
const mensagemEl = document.getElementById('mensagem-resultado');
const btnJogar = document.getElementById('btn-jogar');

const opcoesJogador = document.querySelectorAll('.opcao');
const opcoesPc = document.querySelectorAll('.opcao-pc');

// ========================
// Seleção do Jogador
// ========================
opcoesJogador.forEach((img) => {
    img.addEventListener('click', () => {
        // Remove seleção anterior
        opcoesJogador.forEach((el) => el.classList.remove('selecionado'));

        // Marca a nova seleção
        img.classList.add('selecionado');
        estado.escolhaJogador = img.id;

        // Habilita o botão
        btnJogar.disabled = false;
        mensagemEl.textContent = '';
        mensagemEl.className = '';
    });
});

// ========================
// Escolha Aleatória da Máquina
// ========================
function escolherMaquina() {
    const indice = Math.floor(Math.random() * opcoes.length);
    return opcoes[indice];
}

// ========================
// Determinar Vencedor
// ========================
function determinarVencedor(jogador, maquina) {
    if (jogador === maquina) return 'empate';

    if (
        (jogador === 'pedra' && maquina === 'tesoura') ||
        (jogador === 'papel' && maquina === 'pedra') ||
        (jogador === 'tesoura' && maquina === 'papel')
    ) {
        return 'vitoria';
    }

    return 'derrota';
}

// ========================
// Atualizar Escolha da Máquina na Tela
// ========================
function mostrarEscolhaPc(escolha) {
    opcoesPc.forEach((img) => {
        img.classList.remove('selecionado-pc');
        img.style.opacity = '0.3';
    });

    const pcSelecionado = document.getElementById(`${escolha}-pc`);
    if (pcSelecionado) {
        pcSelecionado.classList.add('selecionado-pc');
    }
}

// ========================
// Exibir Resultado
// ========================
function exibirResultado(resultado) {
    mensagemEl.className = '';

    if (resultado === 'vitoria') {
        mensagemEl.textContent = '🏆 Você venceu!';
        mensagemEl.classList.add('vitoria');
        estado.pontosJogador++;
        pontosJogadorEl.textContent = estado.pontosJogador;
    } else if (resultado === 'derrota') {
        mensagemEl.textContent = '💀 Você perdeu!';
        mensagemEl.classList.add('derrota');
        estado.pontosMaquina++;
        pontosMaquinaEl.textContent = estado.pontosMaquina;
    } else {
        mensagemEl.textContent = '🤝 Empate!';
        mensagemEl.classList.add('empate');
    }
}

// ========================
// Ação do Botão Jogar
// ========================
btnJogar.addEventListener('click', () => {
    if (!estado.escolhaJogador) return;

    const escolhaMaquina = escolherMaquina();
    const resultado = determinarVencedor(estado.escolhaJogador, escolhaMaquina);

    mostrarEscolhaPc(escolhaMaquina);
    exibirResultado(resultado);

    // Reseta seleção do jogador após jogar
    opcoesJogador.forEach((el) => el.classList.remove('selecionado'));
    estado.escolhaJogador = null;
    btnJogar.disabled = true;
});

// ========================
// Estado inicial: botão desabilitado até o jogador escolher
// ========================
btnJogar.disabled = true;
