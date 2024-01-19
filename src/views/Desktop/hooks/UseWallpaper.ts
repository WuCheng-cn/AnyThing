import { AnyHttp } from '@/http'

export const UseWallpaper = () => {
  let wallpaper = ''

  async function getWallpaper() {
    const { rawSrc } = await new AnyHttp().get('https://api.wetab.link/api/wallpaper/next?type=random')
    wallpaper = rawSrc
    const image = new Image()
    image.src = rawSrc
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(wallpaper)
      }
      image.onerror = () => {
        reject()
      }
    }
    )

  }

  async function setWallpaper(dom: HTMLElement) {
    await getWallpaper()
    // dom.style.backgroundImage = `url(${wallpaper})`
    const cssText = `
      background-image: url(${wallpaper});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `
    dom.style.cssText = cssText
  }

  return {
    getWallpaper,
    setWallpaper
  }
}