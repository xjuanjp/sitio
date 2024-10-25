export const initProgressSlider = () => {
  const progressSlider = document.querySelector('.progress-slider')
  if (!progressSlider) return

  let currentActiveIndex = 0;
  let bullets = []
  const slidesWrapper = document.querySelector('.progress-slider .progress-slider__slides')
  const slides = document.querySelectorAll('.progress-slider .progress-slider__slide')
  const stepsWrapper = document.querySelector('.progress-slider .progress-slider__steps')
  const steps = document.querySelectorAll('.progress-slider .progress-slider__step')
  const bulletsWrapper = document.querySelector('.progress-slider .progress-slider__bullets')

  const SLIDE_IN_CLASSNAME = 'in'
  const SLIDE_OUT_CLASSNAME = 'out'
  const SLIDER_TRANSFORM_DELAY = 300 // ms

  const removeActiveClass = () => {
    slides.forEach(slide => slide.classList.remove(SLIDE_IN_CLASSNAME))
    steps.forEach(step => step.classList.remove(SLIDE_IN_CLASSNAME))
    bullets.forEach(bullet => bullet.classList.remove(SLIDE_IN_CLASSNAME))
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    const target = e.target
    
    // Logic for desktop progress 
    if(target.classList.contains('bottom__dot')) {
      currentActiveIndex = target.closest('.progress-slider__step').getAttribute('data-index')
      removeActiveClass()

      slides.forEach(slide => {      
        if (slide.getAttribute('data-index') === currentActiveIndex) {
          setTimeout(() => { 
            slide.classList.remove(SLIDE_OUT_CLASSNAME)
            slide.classList.add(SLIDE_IN_CLASSNAME)
          }, SLIDER_TRANSFORM_DELAY)
        } else {
          slide.classList.add(SLIDE_OUT_CLASSNAME)
        }
      })

      steps.forEach(step => {
        currentActiveIndex === step.getAttribute('data-index') && step.classList.add(SLIDE_IN_CLASSNAME)
      })
    }

    // Logic for mobile bullets
    if(target.classList.contains('progress-slider__bullet-button')) {
      currentActiveIndex = target.closest('.progress-slider__bullet').getAttribute('data-index')
      removeActiveClass()

      slides.forEach(slide => {      
        if (slide.getAttribute('data-index') === currentActiveIndex) {
          setTimeout(() => { 
            slide.classList.remove(SLIDE_OUT_CLASSNAME)
            slide.classList.add(SLIDE_IN_CLASSNAME)
          }, SLIDER_TRANSFORM_DELAY)
        } else {
          slide.classList.add(SLIDE_OUT_CLASSNAME)
        }
      })

      bullets.forEach(bullet => {
        currentActiveIndex === bullet.getAttribute('data-index') && bullet.classList.add(SLIDE_IN_CLASSNAME)
      })
    }

    setTimeout(() => {
      slidesWrapper.style.transform = currentActiveIndex === 0 ? 'translateX(0)' : `translateX(-${currentActiveIndex * 100}%)`
    }, SLIDER_TRANSFORM_DELAY)
  }

  const createBullets = () => {
    slides.forEach(() => {
      const li = document.createElement('li')
      const button = document.createElement('button')

      li.classList.add('progress-slider__bullet')
      button.classList.add('progress-slider__bullet-button')

      li.append(button)
      bulletsWrapper.append(li)
    })

    bullets = document.querySelectorAll('.progress-slider .progress-slider__bullet')
  }

  const addEventListeners = () => {
    stepsWrapper.addEventListener('click', (e) => handleButtonClick(e))
    bulletsWrapper.addEventListener('click', (e) => handleButtonClick(e))
  }
  
  const setDataIndexClasses = () => {
    slides.forEach((slide, index) => {
      slide.setAttribute('data-index', index)
    })

    steps.forEach((step, index) => {
      step.setAttribute('data-index', index)
    })

    bullets.forEach((bullet, index) => {
      bullet.setAttribute('data-index', index)
    })
  }

  const initActiveIndex = () => {
    slides[currentActiveIndex].classList.add(SLIDE_IN_CLASSNAME)
    steps[currentActiveIndex].classList.add(SLIDE_IN_CLASSNAME)
    bullets[currentActiveIndex].classList.add(SLIDE_IN_CLASSNAME)
  }

  createBullets()
  addEventListeners()
  setDataIndexClasses()
  initActiveIndex()
}