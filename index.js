import style from 'dom-style'
import throttle from 'lodash.throttle'

export class ADOComp {

  static opt = {
    container: document.body,
  }

  index = 0

  constructor(images, opt) {
    this.o = { ...ADOComp.opt, ...opt }
    this.images = images
    this.setup()
    this.showImage()
  }

  setup() {
    this.addContainerEl()
    this.addImgEl()

    // Events
    this.el.addEventListener('click', this.showNextImage.bind(this))
    window.addEventListener('hashchange', this.showImage.bind(this))
    window.addEventListener('keydown', throttle(this.handleKeyDown.bind(this), 250))
  }

  addContainerEl() {
    var el = this.el = document.createElement('div')
    el.id = 'ADOComp'
    style(el, {
      display: 'block',
      position: 'relative',
      minHeight: '100vh',
      margin: '0 auto',
      cursor: 'pointer',
    })
    this.o.container.appendChild(el)
  }

  addImgEl() {
    var img = this.img = document.createElement('img')
    style(img, {
      display: 'block',
      margin: '0 auto',
      maxWidth: '100%',
      height: 'auto',
    })
    this.el.appendChild(img)
  }

  handleKeyDown(e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
      return
    }

    switch (e.which) {
      case 39:
        this.showNextImage()
        break
      case 37:
        this.showPrevImage()
        break
      default:
        break
    }
  }

  _wrap(i) {
    return (i + this.images.length) % this.images.length
  }

  showNextImage() {
    this.showImage(this.index + 1)
  }

  showPrevImage() {
    this.showImage(this.index - 1)
  }

  showImage(i) {
    // Get the image index from url hash
    if (typeof(i) !== 'number') {
      i = (parseInt(window.location.hash.replace('#', ''), 10) || 1) - 1
    }

    // Get
    this.index = this._wrap(i)
    var nextUrl = this.images[this.index]
    this.img.src = nextUrl
    this.updateHash()

    // pre-cache images
    setTimeout(() => {
      this.cacheImage(this.index + 1)
      this.cacheImage(this.index + 2)
    })
  }

  updateHash() {
    window.location.hash = this.index + 1
  }

  cacheImage(i) {
    var nextUrl = this.images[this._wrap(i)]
    var image = new Image()
    image.src = nextUrl
  }
}

window.ADOComp = function(...args) {
  return new ADOComp(...args)
}

export default ADOComp
