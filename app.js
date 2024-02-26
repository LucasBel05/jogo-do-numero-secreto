//let titulo = document.querySelector ("h1");
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector ("p");
//paragrafo.innerHTML = "Escolha um número de 1 a 10";

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);

    if (listaDeNumerosSorteados == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();

    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

function limpaCampo(){
    chute = document.querySelector ("input");
    chute.value = "";
}

function exibeTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2}); //comando para que haja uma voz falando no jogo 
    //Primeiro se passa o texto que quer que seja falado, depois a voz e por último a velocidade
}

function verificarChute() {
    let chute = document.querySelector("input").value;

    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let numeroTentativas = `Você encontrou o número secreto com ${tentativas} ${palavraTentativa}.`;

    if (chute == numeroSecreto) {

        exibeTextoNaTela("h1", "Você acertou!!");
        exibeTextoNaTela("p", numeroTentativas);
        document.getElementById ("reiniciar").removeAttribute("disabled"); //reativar o botão de novo jogo

    } else {

        if (chute > numeroSecreto) {

            exibeTextoNaTela("h1", "Você errou!!");
            exibeTextoNaTela("p", "O número secreto é menor do que " + chute);

        } else {

            exibeTextoNaTela("h1", "Você errou!!");
            exibeTextoNaTela("p", "O número secreto é maior do que " + chute);
        }
        tentativas++
        limpaCampo();


    }

}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);

}

function exibirMensagemInicial(){
    exibeTextoNaTela("h1", "Jogo do número secreto");
    exibeTextoNaTela("p", "Escolha um número de 1 a 10");
}
