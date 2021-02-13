/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

var banderaOcultar = false
var idTimeoutOcultarControls = -10
const player = document.getElementById('player')
const video = document.getElementById('movie')
const botonPlayInicio = document.getElementById('btn-play-inicio')

const controlsVideo = document.getElementById('controls-video')

const playPause = document.getElementById('buttonPlay')
const muteUnmuted = document.getElementById('buttonMute')
const iconMute = document.getElementById('icon-mute')
const iconUnmute = document.getElementById('icon-unmute')
muteUnmuted.append(iconMute)

const barDurationVideo = document.getElementById('bar-duration')
const currentTimeText = document.getElementById('texto-duracion')

const barVolume = document.getElementById('bar-volume')
const selectorVolume = document.getElementById('selector-volume') 
const selectorVolumeValue = document.getElementById('selector-volume-value') 

const skipLess = document.getElementById('buttonSkipLess') 
const skipPlus = document.getElementById('buttonSkipPlus') 

const fullNormalScreen = document.getElementById('buttonScreen')
const iconFullScreen = document.getElementById('icon-full-screen')
const iconNormalScreen = document.getElementById('icon-normal-screen')
fullNormalScreen.append(iconFullScreen)


const initializePlayer = () => {
    barVolume.value = video.volume * 100
    barVolume.title = barVolume.value + "%"
    deslizaVolumen()
    /*usados para auto-play
    toggleMute()
    togglePlay()
    */
    console.log(`Bienvenido a Video Player... bar-volume: ${barVolume.value}, video-volume: ${video.volume}`)
}

window.onload = initializePlayer

const banderaOcultarControls = () => {
    banderaOcultar = true
    idTimeoutOcultarControls = setTimeout(ocultarControls, 3000)
    //---console.log(`banderaOcultarControls - banderaOcultar: ${banderaOcultar}`) 
}

const banderaNoOcultarControls = () => {
    banderaOcultar = false
    if (idTimeoutOcultarControls !== -10) {
        clearTimeout(idTimeoutOcultarControls)  //limpia el evento de setTimeout
    }
    //---console.log(`banderaNoOcultarControls - banderaOcultar: ${banderaOcultar}`) 
}
const ocultarControls = () => {
    controlsVideo.style.opacity = "10%"
    //para hacer la transicion entre visible y oculto
    controlsVideo.style.filter = "alpha(opacity=0)";
    controlsVideo.style.visibility = "hidden"
}

const mostrarControlsWithTimer = (event) => {
    //console.log(`event.target: ${event.target.id} event.currentTarget: ${event.currentTarget.id} `) 
    if(controlsVideo.style.visibility !== "visible") {
        controlsVideo.style.visibility = "visible"
        //para hacer la transicion entre oculto y visible
        controlsVideo.style.opacity = "100%"
        controlsVideo.style.filter = "alpha(opacity=100)";
    
        banderaOcultarControls()
    }
}

controlsVideo.addEventListener('mouseleave', banderaOcultarControls)
controlsVideo.addEventListener('mouseenter', banderaNoOcultarControls)
player.addEventListener('mouseenter', mostrarControlsWithTimer)
video.addEventListener('mousemove', mostrarControlsWithTimer)

const togglePlay = () => {
    if(botonPlayInicio.style.visibility !== "hidden") {
        botonPlayInicio.style.visibility = "hidden"
    }
    //console.log(`visibilidad: ${botonPlayInicio.style.visibility}`)
    if (video.paused) {
        video.play()
        playPause.textContent = "||"
        playPause.title ="Pausar"
    } else {
        video.pause()
        playPause.textContent = "▷"
        playPause.title ="Reproducir"
    }
}

botonPlayInicio.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
playPause.addEventListener('click', togglePlay)
//togglePlay(video)

const noSound = () => {
    video.muted = true
    muteUnmuted.title ="Escuchar"
    muteUnmuted.firstElementChild.remove()
    muteUnmuted.append(iconUnmute)
}

const toggleMute = () => {
    if (video.muted) {
        video.muted = false
        muteUnmuted.title ="Silenciar"
        muteUnmuted.firstElementChild.remove()
        muteUnmuted.append(iconMute)
    } else {
        noSound()
    }
}

muteUnmuted.addEventListener('click', toggleMute)

const durationVideo = () => {
    const seekTo = video.duration * ( barDurationVideo.value / 100 )
    video.currentTime = seekTo
}

const actualPositionVideo = () => {
    const newTime = video.currentTime * ( 100 / video.duration )
    barDurationVideo.value = newTime
    
    let currentMins = Math.floor(video.currentTime / 60)
    let currentSecs = Math.floor(video.currentTime  - currentMins * 60)
    let durationMins = Math.floor(video.duration / 60)
    let durationSecs = Math.floor(video.duration  - durationMins * 60)

    if(currentMins < 10) {
        currentMins = "0" + currentMins
    }
    if(currentSecs < 10) {
        currentSecs = "0" + currentSecs
    }
    if(durationMins < 10) {
        durationMins = "0" + durationMins
    }
    if(durationSecs < 10) {
        durationSecs = "0" + durationSecs
    }

    barDurationVideo.title = currentMins + ":" + currentSecs
    currentTimeText.textContent = barDurationVideo.title + "/" + durationMins + ":" + durationSecs
}

const mousePosition = (elemento, evt) => {
    const ClientRect = elemento.getBoundingClientRect();
    return { //objeto
        x: ((evt.clientX - ClientRect.left) > 0) ? Math.round(evt.clientX - ClientRect.left) + 1 : 0,
        y: ((evt.clientY - ClientRect.top) > 0) ? Math.round(evt.clientY - ClientRect.top) + 1 : 0
    }
}
const sizeElement = (elemento) => {
    const ClientRect = elemento.getBoundingClientRect();
    return Math.round(ClientRect.width)
}

const actualizaPosition = (event) => {
    if (video.currentTime === 0) {
        return
    }
    
    const mousePos = mousePosition(barDurationVideo, event)
    const tam = sizeElement(barDurationVideo)
    const seekTo = video.duration * ( mousePos.x / tam )
    //---console.log(`seekTo = video.duration * ( mousePos.x / tam ): ${seekTo} = ${video.duration} * ( ${mousePos.x} / ${tam} )`)

    let currentMins = Math.floor(seekTo / 60)
    let currentSecs = Math.floor(seekTo  - currentMins * 60)

    if(currentMins < 10) {
        currentMins = "0" + currentMins
    }
    if(currentSecs < 10) {
        currentSecs = "0" + currentSecs
    }
    tiempo.style.left = ( 100 * (mousePos.x /tam) ) + "%"
    //---console.log(`tiempo.style.left = ${tiempo.style.left}`)
    tiempo.textContent = currentMins + ":" + currentSecs
    //---console.log(`PosicionVideo ${currentMins}:${currentSecs}`)

    const color = `linear-gradient(90deg, rgb(243, 158, 78) ${barDurationVideo.value}%, rgb(253, 253, 253) ${barDurationVideo.value}% )`
    barDurationVideo.style.background = color;
    
}

barDurationVideo.addEventListener('change', durationVideo)
barDurationVideo.addEventListener('mousemove', actualizaPosition)

video.addEventListener('timeupdate', actualPositionVideo)


const setVolume = () => {
    video.volume = barVolume.value / 100
    barVolume.title = barVolume.value + "%"
    deslizaVolumen()
}

const deslizaVolumen = () => {
    selectorVolume.style.left = (barVolume.value * (85/100 )) + "%"
    selectorVolumeValue.textContent = barVolume.value + "%"
   if (barVolume.value <= 1) {
    noSound()
   }
}

//Refernecia para cambiar los colores de la scrollBar:
//https://ed.team/blog/personaliza-el-scroll-de-tu-web-solo-con-css
//https://videojs
//medidas para hacer que los textos y demas sean responsive:
//https://marabelia.com/css-font-size-responsive/

barVolume.addEventListener('change', setVolume)
barVolume.addEventListener('input', deslizaVolumen)
selectorVolume.addEventListener('mousemove', deslizaVolumen)


const toggleFullScreen = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen()
        fullNormalScreen.firstElementChild.remove()
        fullNormalScreen.append(iconNormalScreen)
    } else {
        video.requestPointerLock()
        fullNormalScreen.firstElementChild.remove()
        fullNormalScreen.append(iconFullScreen)
    }
    
}

fullNormalScreen.addEventListener('click', toggleFullScreen, false)

const toggleSkip = (skipValue) => {
    const newPosition = video.currentTime + (skipValue)
    if(newPosition < 1) {
        video.currentTime = 0
    } else if(newPosition > video.duration) { 
        video.currentTime = video.duration
    } else {
        video.currentTime = newPosition
    }
}

const toggleSkipLess = (event) => {
    const skipValue = -10
    toggleSkip(skipValue)
}

const toggleSkipPlus = (event) => {
    const skipValue = 25
    toggleSkip(skipValue)
}

skipLess.addEventListener('click', toggleSkipLess)
skipPlus.addEventListener('click', toggleSkipPlus)


