/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

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

const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player-slider')

const fullNormalScreen = document.getElementById('buttonScreen')
const iconFullScreen = document.getElementById('icon-full-screen')
const iconNormalScreen = document.getElementById('icon-normal-screen')
fullNormalScreen.append(iconFullScreen)


const initializePlayer = () => {
    barVolume.value = video.volume * 100
    barVolume.title = barVolume.value + "%"
    selectorVolume.style.left = barVolume.value + "%"
    console.log(`Bienvenido...bar-volume: ${barVolume.value}, video-vloume: ${video.volume}`)
}

window.onload = initializePlayer

const ocultarControls = () => {
    controlsVideo.style.visibility = "hidden"
}

const mostrarControls = () => {
    controlsVideo.style.visibility = "visible"
}

video.addEventListener('mouseout', mostrarControls)
video.addEventListener('mouseover', ocultarControls)
 
const togglePlay = () => {
    if(botonPlayInicio.style.visibility !== 'hidden') {
        botonPlayInicio.style.visibility = 'hidden'
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

playPause.addEventListener('click', togglePlay)
//togglePlay(video)

const toggleMute = () => {
    if (video.muted) {
        video.muted = false
        muteUnmuted.title ="Silenciar"
        muteUnmuted.firstElementChild.remove()
        muteUnmuted.append(iconMute)
    } else {
        video.muted = true
        muteUnmuted.title ="Escuchar"
        muteUnmuted.firstElementChild.remove()
        muteUnmuted.append(iconUnmute)
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

    currentTimeText.textContent = currentMins + ":" + currentSecs + "/" + durationMins + ":" + durationSecs
    
}

const actualizaPosition = () => {
    console.log(`barDurationVideo.value: ${barDurationVideo.value}`)
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
}

//Refernecia para cambiar los colores de la scrollBar:
//https://ed.team/blog/personaliza-el-scroll-de-tu-web-solo-con-css
//https://videojs

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