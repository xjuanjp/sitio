const SLIDER_TRANSFORM_DELAY = 200 // 1s

const BULLET_ACTIVE_CLASSNAME = 'bullet-button--active'

const SLIDE_IN_CLASSNAME = 'cases-slider__slide--in'
const SLIDE_OUT_CLASSNAME = 'cases-slider__slide--out'

export const initCasesSlider = () => {
  const slider = document.querySelector('.cases-slider .cases-slider__list')
  if(!slider) return

  let currentActiveIndex = 0;

  const slides = document.querySelectorAll('.cases-slider .cases-slider__slide')
  const slidesCount = slides.length

  const createBullet = ({ addActiveClass, index }) => {
    const bullet = document.createElement('button')
    bullet.classList.add('bullet-button')
    bullet.setAttribute('data-index', index)
    bullet.addEventListener('click', (e) => handleOnClick(e))
    
    addActiveClass && bullet.classList.add(BULLET_ACTIVE_CLASSNAME)

    return bullet
  }

  const appendBullets = (slidesCount) => {
    let n = 0
    const allBullets = document.querySelectorAll('.cases-slider .cases-slider__bullets');
    
    while(n < slidesCount) {
      allBullets.forEach((bullets) => {
        const isFirstBullet = n === 0
        const bullet = createBullet({ addActiveClass: isFirstBullet, index: n })
        bullets.appendChild(bullet)
      })
      n++
    }
  }

  const addSlidesClasses = () => {
    slides.forEach((slide, index) => {
      const isFirstSlide = index === 0
      isFirstSlide ? slide.classList.add(SLIDE_IN_CLASSNAME) : slide.classList.add(SLIDE_OUT_CLASSNAME)
      slide.setAttribute('data-index', index)
    })
  }

  const removeActiveClass = () => {
    const bullets = document.querySelectorAll('.cases-slider .cases-slider__bullets > .bullet-button')

    bullets.forEach(bullet => {
      bullet.classList.remove(BULLET_ACTIVE_CLASSNAME)
    })

    slides.forEach(slide => {
      slide.classList.remove(SLIDE_IN_CLASSNAME)
    })
  }

  const handleOnClick = (e) => {
    const clickedButton = e.target
    currentActiveIndex = clickedButton.getAttribute('data-index')

    const allBullets = document.querySelectorAll('.cases-slider .cases-slider__bullets .bullet-button')
    
    removeActiveClass()

    allBullets.forEach(bullet => {
      const hasSameIndex = bullet.getAttribute('data-index') === currentActiveIndex

      if (hasSameIndex) {
        bullet.classList.add(BULLET_ACTIVE_CLASSNAME)
      }
    })

    slides.forEach(slide => {
      const slideIndex = slide.getAttribute('data-index')
      
      if (slideIndex === currentActiveIndex) {
        setTimeout(() => { 
          slide.classList.remove(SLIDE_OUT_CLASSNAME)
          slide.classList.add(SLIDE_IN_CLASSNAME)
        }, SLIDER_TRANSFORM_DELAY)
      } else {
        slide.classList.add(SLIDE_OUT_CLASSNAME)
      }
    })

    setTimeout(() => {
      slider.style.transform = currentActiveIndex === 0 ? 'translateX(0)' : `translateX(-${currentActiveIndex * 100}%)`
    }, SLIDER_TRANSFORM_DELAY)
  }

  // add every bullet on all bullets
  // depending on their slides count
  appendBullets(slidesCount)
  addSlidesClasses()

}
