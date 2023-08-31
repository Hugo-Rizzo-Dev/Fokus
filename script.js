const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFoco = document.querySelector('#alternar-musica')
const iniciarPausar = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

//const imgPlay = new Image(imagens / play_arrow.png)
//const imgPause = new Image(imagens / pause.png)
const musica = new Audio('sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('sons/play.wav')
const audioPause = new Audio('sons/pause.mp3')
const audioBeep = new Audio('sons/beep.mp3')

let tempoDecorridoemSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFoco.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()

    } else {
        musica.pause()
    }

})

focoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
        Otimize sua produtividade, <br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">faça uma pausa curta!</strong>

            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
        Hora de voltara superficie. <strong class="app__title-strong">faça uma pausa longa!</strong>
        `
        default:
            break;
    }

}


const contagemRegressiva = () => {
    if (tempoDecorridoemSegundos <= 0) {
        audioBeep.play()
        alert('TEMPO FINALIZADO')
        zerar()
        return
    }
    tempoDecorridoemSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    //imgPause.play()
    iniciarPausar.textContent = "Pausar"

}

function zerar() {
    clearInterval(intervaloId)
    //imgPause.play()
    iniciarPausar.textContent = "Começar"
    intervaloId = null

}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()
