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

let arrayDeLetrasAcertadas = [];

function iniciarJogo(){
    let palavra = palavraSecreta.value;
    
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
        alert("Escreva uma letra!")
        console.log(arrayDeLetrasAcertadas);
    }else{
        
        const arrayDeDiv = Array.from(palavraCompletaElemento.childNodes);
        arrayDeDiv.shift();

        const arrayDasLetras = arrayDeDiv
            .map(element => element.textContent)
            .filter(element => element != '')
        
        if(arrayDasLetras.includes(letraChutada)){

            Array.from(
                document.querySelectorAll(".item > span")
            )
            .forEach(element => {
                    if(element.textContent == letraChutada){
                        element.style.visibility = "visible"

                        const letraAcertada = element.textContent
                        
                        const letrasRepetidas = []
                        
                        const palavraSemRepeticao = arrayDasLetras.filter((e,i)=>{
                            if(arrayDasLetras.indexOf(e) !== i) letrasRepetidas.push(e)
                            return arrayDasLetras.indexOf(e) == i
                        })

                        const palavraCompleta = palavraSemRepeticao.length + letrasRepetidas.length
                        arrayDeLetrasAcertadas.push(letraAcertada)

                        if( arrayDeLetrasAcertadas.length === palavraCompleta){
                            spanNumeroVidas.textContent = "VOCE ACERTOU!!"
                            desabilitarBotoes()
                            reiniciar()
                        }
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
                const palavraRevelada = palavraSecreta.value.toUpperCase();
                spanNumeroLetras.innerHTML = `A palavra era: ${palavraRevelada}`;

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
    btnReiniciar.textContent = "Reiniciar";
    btnReiniciar.addEventListener("click", ()=> window.location.reload(true));
    spanNumeroVidas.appendChild(btnReiniciar);
}

function desabilitarBotoes(){
    btnChutarLetra.disabled = true;
    const letraChutadaInp = document.getElementById("letra");
    letraChutadaInp.disabled = true;
}

btnComecar.addEventListener("click",iniciarJogo)
btnChutarLetra.addEventListener("click", verificarPalavra)