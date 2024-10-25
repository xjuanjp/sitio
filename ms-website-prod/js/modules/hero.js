export const responsiveVideo = () => {
    const windowWidth = window.innerWidth
    if(windowWidth <= 720) {
        document.getElementById('video-small').play()
        document.getElementById('video-large').pause()
    } else {
        document.getElementById('video-small').pause()
        document.getElementById('video-large').play()
    }
}