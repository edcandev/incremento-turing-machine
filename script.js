const input = document.querySelector(".main__cont__input");
const botonComenzar = document.querySelector(".main__cont__button--com");
const botonReiniciar = document.querySelector(".main__cont--2__button--rei");
const botonSiguiente = document.querySelector(".main__cont--2__button--sig");    const cabezal = document.querySelector(".main__maquina__cabezal");
const estado = document.querySelector(".main__cont--2__div__q");
const resultadoFinalDiv = document.querySelector(".main__maquina__resultado");

let resultadoFinal = "";
let estadoActual = 0;
let posicion = 0;

// Cinta, se trata de un objeto con los especios donde irán los números
const cinta = { 
    espacio0 : document.querySelector(".main__maquina__espacio0"),
    espacio1 : document.querySelector(".main__maquina__espacio1"),
    espacio2 : document.querySelector(".main__maquina__espacio2"),
    espacio3 : document.querySelector(".main__maquina__espacio3")
};

// Escucha el evento de "click" en el botón
botonComenzar.addEventListener("click", ()=>{ 
    const valor = input.value;
    let esBinario = false;

    if(valor == '') {
        alert("Ingrese un número");
    }else{
        let numeroBinario;
        for(let i = 0; i < valor.length; i++ ) {
            if(valor.charAt(i) != '0' && valor.charAt(i) != '1') {
                alert("Ingrese un número binario");
                esBinario = false;
                break;
            } else {
                esBinario = true;
                numeroBinario = valor;
            }
        }
        esBinario ? colocarNumero(numeroBinario) : input.value = null;
    }
});

// Coloca el número binario en la cinta
function colocarNumero(numBin) {
    Object.values(cinta)[3].innerHTML = numBin.charAt(numBin.length - 1);
    Object.values(cinta)[2].innerHTML = numBin.charAt(numBin.length - 2);
    Object.values(cinta)[1].innerHTML = numBin.charAt(numBin.length - 3);
    Object.values(cinta)[0].innerHTML = numBin.charAt(numBin.length - 4);
    botonSiguiente.disabled = false;
    botonReiniciar.disabled = false;
}

// Escucha al botón "siguiente"
botonSiguiente.addEventListener("click", ()=>{

    switch(estadoActual) {
        case 0:
            cabezal.style.animationName = "de0-a1";
            cabezal.style.animationPlayState = "running";
            estadoActual = 1;
            estado.innerHTML = `q${estadoActual}`;
            break;   

        case 1:
            cabezal.style.animationName = "de1-a2";
            cabezal.style.animationPlayState = "running";
            estadoActual = 2;
            estado.innerHTML = `q${estadoActual}`;
            break;
        
        case 2:
            cabezal.style.animationName = "de2-a3";
            cabezal.style.animationPlayState = "running";
            estadoActual = 3;
            estado.innerHTML = `q${estadoActual}`;
            break;

        // A partir de aquí, si encuentra un 0, lo sustituye por 1, hasta terminar de recorrer la cadena de regreso
        case 3:
            if(Object.values(cinta)[3].innerHTML == '0'){ // Encontró un 0
                //alert("encontré un 0");
                //cinta.espacio3.innerHTML = '1';
                Object.values(cinta)[3].innerHTML = '1';
                cabezal.style.animationName = "de3-a2";
                cabezal.style.animationPlayState = "running";
                estadoActual = 7; // O bien, final...
                posicion = 3;
                estado.innerHTML = `q${estadoActual}`;
            }else
            if(Object.values(cinta)[3].innerHTML == '1') { // Encontró un 1
                //alert("encontré un 1");
                Object.values(cinta)[3].innerHTML = '0';
                cabezal.style.animationName = "de3-a2";
                cabezal.style.animationPlayState = "running";
                estadoActual = 4;
                estado.innerHTML = `q${estadoActual}`;
            }
            break;

        case 4:             
            if(Object.values(cinta)[2].innerHTML == '0' || Object.values(cinta)[2].innerHTML === ''){ 
                //alert("encontré un 0");
                Object.values(cinta)[2].innerHTML = '1';
                estadoActual = 7; // O bien, final...
                posicion = 2;
                estado.innerHTML = `q${estadoActual}`;
                cabezal.style.animationName = "de2-a1";
                cabezal.style.animationPlayState = "running";
            }else
            if(Object.values(cinta)[2].innerHTML == '1') {
                //alert("encontré un 1");
                Object.values(cinta)[2].innerHTML = '0'; 
                cabezal.style.animationName = "de2-a1";
                cabezal.style.animationPlayState = "running";
                estadoActual = 5;
                estado.innerHTML = `q${estadoActual}`;
            }
            break;

        case 5:             
            if(Object.values(cinta)[1].innerHTML == '0' || Object.values(cinta)[1].innerHTML === ""){ 
                //alert("encontré un 0");
                Object.values(cinta)[1].innerHTML = '1';
                estadoActual = 7; // O bien, final...
                posicion = 1;
                estado.innerHTML = `q${estadoActual}`;
                cabezal.style.animationName = "de1-a0";
                cabezal.style.animationPlayState = "running";
            }else
            if(Object.values(cinta)[1].innerHTML == '1') {
                //alert("encontré un 1");
                Object.values(cinta)[1].innerHTML = '0';
                cabezal.style.animationName = "de1-a0";
                cabezal.style.animationPlayState = "running";
                estadoActual = 6;
                estado.innerHTML = `q${estadoActual}`;
            }
            break;
        
        case 6:
            if(Object.values(cinta)[0].innerHTML == '0' || Object.values(cinta)[0].innerHTML === "") {
                Object.values(cinta)[0].innerHTML = '1';
                estadoActual = 7; // O bien, final...
                posicion = 0;
                estado.innerHTML = `q${estadoActual}`;

            }else
            if(Object.values(cinta)[0].innerHTML == '1') {
                Object.values(cinta)[0].innerHTML = '0';
                estadoActual = 7; // O bien, final...
                estado.innerHTML = `q${estadoActual}`;
                posicion = 1;
            }
            break;

        case 7:
            if(posicion == 3) {
                cabezal.style.animationName = "de2-a1";
                cabezal.style.animationPlayState = "running";
                posicion = 2;
            }else
            if(posicion == 2) {
                cabezal.style.animationName = "de1-a0";
                cabezal.style.animationPlayState = "running";
                posicion = 1;
            }else
            if(posicion == 1) {

                for(let i = 0; i < 4; i++ ){
                    resultadoFinal += Object.values(cinta)[i].innerHTML;
                }
                mostrarResultado(resultadoFinal);
            }

            break;
    }
});

botonReiniciar.addEventListener("click", ()=>{
    input.value = null;
    for(let i = 0; i < 4; i++ ){
        Object.values(cinta)[i].innerHTML = "";
    }
    estadoActual = 0;
    posicion = 0;
    cabezal.style.animationName = "de0-a0";
    cabezal.style.animationPlayState = "running";
    estado.innerHTML = `q${estadoActual}`;
});

function mostrarResultado(resFin) {
    resultadoFinalDiv.innerHTML = `Resultado = ${resFin}`;
}




