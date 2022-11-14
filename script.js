const palavraSecreta = document.getElementById("palavra")
const btnComecar = document.getElementById("comecar");
const btnChutarLetra = document.getElementById("chutar")
const letraChutadaInp = document.getElementById("letra");

const divJogo = document.querySelector(".jogo")
const divPalavra = document.querySelector(".palavra-inicial")

const spanNumeroLetras = document.querySelector("#numLetras");
const spanNumeroVidas = document.querySelector("#vidas");
const btnReiniciar = document.createElement("button");
const palavraCompletaElemento = document.querySelector(".palavra-completa");

let numeroVidas = 3

const arrayDeLetrasAcertadas = [];

function iniciarJogo(){
    btnChutarLetra.disabled = false;

    const palavra = palavraSecreta.value;
    if(palavra === ''){
        alert("Insira a palavra")
    }else{
        divPalavra.style.display = "none";
        divJogo.style.display = "flex";
        criarPalavra(palavra)
    }
}

function criarPalavra(palavra) {

    const numLetras = palavra.length;

    spanNumeroLetras.innerHTML = `Numero de letras: ${numLetras}`
    spanNumeroVidas.innerHTML = `Número de vidas: ${numeroVidas}`

    const letras = palavra.split("")

    letras.forEach(element => {
        const divLetraElemento = document.createElement("div")
        divLetraElemento.classList.add("item")
        palavraCompletaElemento.appendChild(divLetraElemento);

        const letraElemento = document.createElement("span")
        letraElemento.innerText = element.toUpperCase();
        divLetraElemento.appendChild(letraElemento)
    });
}

function verificarPalavra(){
    const letraChutada = letraChutadaInp.value.toUpperCase();

    if(letraChutada == ''){
        alert("Escreva uma letra!")
    }else{
        
        const arrayDeDiv = Array.from(palavraCompletaElemento.childNodes);
        arrayDeDiv.shift();

        const arrayDasLetras = arrayDeDiv.map(element => element.textContent)

        if(arrayDasLetras.includes(letraChutada)){

            Array.from(
                document.querySelectorAll(".item > span")
            )
            .forEach(element => {
                    
                    if(element.textContent == letraChutada){
                        const letraAcertada = element.style.visibility = "visible"
                        arrayDeLetrasAcertadas.push(letraAcertada);
                    }
                    if(arrayDeLetrasAcertadas.length === arrayDasLetras.length){
                        spanNumeroVidas.textContent = "VOCE ACERTOU!!"

                        desabilitarBotoes()
                        reiniciar()
                    }
                });
        }else{
            numeroVidas--

            spanNumeroVidas.innerHTML = `Número de vidas: ${ numeroVidas>0 ?  numeroVidas : "Acabou suas vidas :/"}`;

            if(numeroVidas == 0){
                desabilitarBotoes()

                Array.from(
                    document.querySelectorAll(".item > span")
                )
                .map(
                    (element) => (element.style.visibility = "visible")
                );

                const palavraRevelada = arrayDasLetras.join('');
                spanNumeroLetras.innerHTML = `A palavra era: ${palavraRevelada}`;

                reiniciar()
            }
        }

        letraChutadaInp.value = ''
    }
}

function reiniciar(){
    btnReiniciar.textContent = "Reiniciar";
    btnReiniciar.addEventListener("click", iniciarJogo);
    spanNumeroVidas.appendChild(btnReiniciar);
}

function desabilitarBotoes(){
    tnChutarLetra.disabled = true;
    const letraChutadaInp = document.getElementById("letra");
    letraChutadaInp.disabled = true;
}

btnComecar.addEventListener("click",iniciarJogo)
btnChutarLetra.addEventListener("click", verificarPalavra)