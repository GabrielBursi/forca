import palavrasAleatorias from "./palavras.js";

const palavraSecreta = document.getElementById("palavra")
const btnComecar = document.getElementById("comecar");
const btnChutarLetra = document.getElementById("chutar")
const btnPalavraAleatoria = document.getElementById("palavra-aleatoria");
const letraChutadaInp = document.getElementById("letra");

const divJogo = document.querySelector(".jogo")
const divPalavra = document.querySelector(".palavra-inicial")

const spanNumeroLetras = document.querySelector("#numLetras");
const spanNumeroVidas = document.querySelector("#vidas");
const palavraCompletaElemento = document.querySelector(".palavra-completa");
const btnReiniciar = document.createElement("button");

let numeroVidas = 7

let arrayDeLetrasAcertadas = [];

const regexLetras = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;
const regexAcentos = /[\u0300-\u036f]/g

function iniciarJogo(palavra){
    btnChutarLetra.disabled = false;
    if(palavra === ''){
        alert("Insira a palavra")
    }else{
        divPalavra.style.display = "none";
        divJogo.style.display = "flex";
        criarPalavra(palavra)
    }
}

function criarPalavra(palavra) {

    let numLetras = palavra.length;
    calcularNumeroDeVidas(numLetras)
    const indiceDoEspaco = [];

    spanNumeroLetras.innerHTML = `Numero de letras: ${numLetras}`
    spanNumeroVidas.innerHTML = `Número de vidas: ${numeroVidas}`

    const letras = palavra.split("")

    letras.forEach(element => {
        if(element==" "){
            indiceDoEspaco.push(element)
            
            const divLetraElemento = document.createElement("div");
            divLetraElemento.classList.add("espaco");
            palavraCompletaElemento.appendChild(divLetraElemento);
            
            spanNumeroLetras.innerHTML = `Numero de letras: ${numLetras - indiceDoEspaco.length}`;
        }else{
            criarLetra(element)
        }
    });
}

function verificarPalavra(){
    const letraChutada = letraChutadaInp.value.toUpperCase().substring(0,1);

    if(letraChutada == '' || arrayDeLetrasAcertadas.includes(letraChutada)){
        letraChutadaInp.value = ''
    }else{
        
        const arrayDeDiv = Array.from(palavraCompletaElemento.childNodes);
        arrayDeDiv.shift();

        const arrayDasLetras = arrayDeDiv
            .map(element => element.textContent)
            .filter(element => element != '')
            .map(element => element.normalize('NFD').replace(/[\u0300-\u036f]/g,''))
            
            if(arrayDasLetras.includes(letraChutada)){

                    Array.from(
                        document.querySelectorAll(".item > span")
                    )
                    .forEach(element => {
                        const letraSemAcento = element.textContent.normalize('NFD').replace(regexAcentos,'')

                        if(letraSemAcento == letraChutada){

                            element.style.visibility = "visible";

                            const letraAcertada = letraSemAcento;

                            const letrasRepetidas = [];

                            const palavraSemRepeticao = arrayDasLetras.filter(
                                (e, i) => {
                                    if (arrayDasLetras.indexOf(e) !== i)
                                    letrasRepetidas.push(e);
                                    return arrayDasLetras.indexOf(e) == i;
                                }
                            );

                            const palavraCompleta =
                                palavraSemRepeticao.length +
                                letrasRepetidas.length;
                                arrayDeLetrasAcertadas.push(letraAcertada);

                            if (arrayDeLetrasAcertadas.length === palavraCompleta) {
                                spanNumeroVidas.classList.remove("animacao");
                                spanNumeroVidas.classList.toggle("text-green")
                                spanNumeroVidas.textContent = "VOCE ACERTOU!!";
                                desabilitarBotoes();
                                reiniciar();
                            }
                        }
                    });
            }else{
                numeroVidas--

                if(numeroVidas == 3){
                    spanNumeroVidas.classList.add("animacao");
                }

                if(numeroVidas > 0){
                    spanNumeroVidas.innerHTML = `Numero de vidas: ${numeroVidas}`;
                }

                if(numeroVidas === 0){
                    desabilitarBotoes()
                    spanNumeroVidas.classList.remove("animacao");
                    spanNumeroVidas.classList.toggle("text-red");
                    spanNumeroVidas.innerHTML = "ACABOU SUAS VIDAS";

                    Array.from(
                        document.querySelectorAll(".item > span")
                    )
                    .map(
                        (element) => (element.style.visibility = "visible")
                    );
                    spanNumeroLetras.innerHTML = `A palavra era: `;

                    reiniciar()
                }
            }
        letraChutadaInp.value = ''
    }
}

function criarLetra(element){
    const divLetraElemento = document.createElement("div");
    divLetraElemento.classList.add("item");
    palavraCompletaElemento.appendChild(divLetraElemento);

    const letraElemento = document.createElement("span");
    letraElemento.innerText = element.toUpperCase();
    divLetraElemento.appendChild(letraElemento);
}

function reiniciar(){
    btnReiniciar.classList.add('btn-reiniciar')
    btnReiniciar.textContent = "Jogar Novamente";
    btnReiniciar.addEventListener("click", ()=> window.location.reload(true));
    spanNumeroVidas.appendChild(btnReiniciar);
}

function desabilitarBotoes(){
    btnChutarLetra.disabled = true;
    const letraChutadaInp = document.getElementById("letra");
    letraChutadaInp.disabled = true;
}

function sortearPalavra(){
    const palavraAleatoria = Math.floor(Math.random() * palavrasAleatorias.length)
    const tamanho = palavrasAleatorias[palavraAleatoria].length;
    calcularNumeroDeVidas(tamanho)
    iniciarJogo(palavrasAleatorias[palavraAleatoria]);
}

function calcularNumeroDeVidas(tamanhoPalavra){
    switch (tamanhoPalavra) {
        case 4:
            numeroVidas = 5;
            break;
        case 5:
            numeroVidas = 5;
            break;
        case 6:
            numeroVidas = 5;
            break;
        case 7:
            numeroVidas = 7;
            break;
        case 8:
            numeroVidas = 7;
            break;
        case 9:
            numeroVidas = 9;
            break;
        case 10:
            numeroVidas = 9;
            break;
        case 11:
            numeroVidas = 9;
            break;
        case 12:
            numeroVidas = 10;
            break;
        case 13:
            numeroVidas = 10;
            break;
        case 14:
            numeroVidas = 10;
            break;
        default:
            numeroVidas = 5;
    }
}

function desabilitaNumero(e){
    let palavra = e.target.value
    if(!(palavra).match(regexLetras)) e.target.value = ''
    
}

btnComecar.addEventListener("click",()=>{
    const palavra = palavraSecreta.value
    iniciarJogo(palavra)
})

palavraSecreta.addEventListener("keyup",(e)=> desabilitaNumero(e))
letraChutadaInp.addEventListener('keyup',(e)=> desabilitaNumero(e))

btnChutarLetra.addEventListener("click", verificarPalavra)
btnPalavraAleatoria.addEventListener("click", sortearPalavra)