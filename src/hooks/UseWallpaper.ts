import { AnyHttp } from '@/http'

export const UseWallpaper = () => {

  /**
   * 获取随机壁纸
   * @returns 壁纸地址
   */
  async function getRandomWallpaper() {
    const { rawSrc } = await new AnyHttp().get('https://api.wetab.link/api/wallpaper/next?type=random')
    return rawSrc
  }

  /**
   * 设置随机壁纸到dom
   * @param dom ``` HTMLElement ```
   */
  async function setRandomWallpaperToDom(dom: HTMLElement):Promise<void> {
    const wallpaper = await getRandomWallpaper()
    const image = new Image()
    image.src = wallpaper
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const cssText = `
        background-image: url(${wallpaper});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
        dom.style.cssText = cssText
        resolve()
      }
      image.onerror = () => {
        reject()
      }
    })

  }

  return {
    getRandomWallpaper,
    setRandomWallpaperToDom
  }
}