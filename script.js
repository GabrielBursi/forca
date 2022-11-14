const palavraSecreta = document.getElementById("palavra")
const btnComecar = document.getElementById("comecar");
const btnChutarLetra = document.getElementById("chutar")

const divJogo = document.querySelector(".jogo")
const divPalavra = document.querySelector(".palavra-inicial")

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
    const spanNumeroLetras = document.querySelector("#numLetras");
    spanNumeroLetras.innerHTML = `Numero de letras: ${numLetras}`

    const spanNumeroVidas = document.querySelector("#vidas")
    spanNumeroVidas.innerHTML = `Número de vidas: ${numeroVidas}`

    const letras = palavra.split("")

    const palavraCompletaElemento = document.querySelector(".palavra-completa");
    
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
    const letraChutadaInp = document.getElementById("letra");
    const letraChutada = letraChutadaInp.value.toUpperCase();

    if(letraChutada == ''){
        alert("Escreva uma letra!")
    }else{
        
        const palavraCompletaElemento = document.querySelector(".palavra-completa");
        const arrayDiv = Array.from(palavraCompletaElemento.childNodes);
        arrayDiv.shift();

        const arrDasLetras = arrayDiv.map(element => element.textContent)

        if(arrDasLetras.includes(letraChutada)){

            Array.from(
                document.querySelectorAll(".item > span")
            )
            .forEach(element => {
                    
                    if(element.textContent == letraChutada){
                        const letraAcertada = element.style.visibility = "visible"
                        arrayDeLetrasAcertadas.push(letraAcertada);
                    }
                    if(arrayDeLetrasAcertadas.length === arrDasLetras.length){
                        const spanNumeroVidas = document.querySelector("#vidas");
                        spanNumeroVidas.textContent = "VOCE ACERTOU!!"

                        btnChutarLetra.disabled = true
                        const letraChutadaInp = document.getElementById("letra");
                        letraChutadaInp.disabled = true

                        const btnReiniciar = document.createElement("button");
                        btnReiniciar.textContent = "Reiniciar";
                        btnReiniciar.addEventListener("click", iniciarJogo);
                        spanNumeroVidas.appendChild(btnReiniciar);
                    }
                });
        }else{
            numeroVidas--

            const spanNumeroVidas = document.querySelector("#vidas");
            spanNumeroVidas.innerHTML = `Número de vidas: ${ numeroVidas>0 ?  numeroVidas : "Acabou suas vidas :/"}`;

            if(numeroVidas == 0){
                btnChutarLetra.disabled = true
    
                const letraChutadaInp = document.getElementById("letra");
                letraChutadaInp.disabled = true

                Array.from(
                    document.querySelectorAll(".item > span")
                )
                .map(
                    (element) => (element.style.visibility = "visible")
                );

                const spanNumeroLetras = document.querySelector("#numLetras");
                const palavraRevelada = arrDasLetras.join('');
                spanNumeroLetras.innerHTML = `A palavra era: ${palavraRevelada}`;

                const btnReiniciar = document.createElement("button")
                btnReiniciar.textContent = 'Reiniciar'
                btnReiniciar.addEventListener("click",iniciarJogo)
                spanNumeroVidas.appendChild(btnReiniciar)
            }
        }

        letraChutadaInp.value = ''
    }
}

btnComecar.addEventListener("click",iniciarJogo)
btnChutarLetra.addEventListener("click", verificarPalavra)