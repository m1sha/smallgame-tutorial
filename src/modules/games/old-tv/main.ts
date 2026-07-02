
import './style.css'
import { GameStation } from './old-tv/index.ts'
import { GameStationSettings } from './old-tv/game-station-settings.ts'
import { Size } from 'smallgame'

const settings: GameStationSettings = {
  container: document.querySelector<HTMLDivElement>('#app')!,
  fps: document.querySelector<HTMLDivElement>('#fps')!,
  useShaders: true,
  showTV: true,
  containerSize: Size.zero
}

async function main () {
  document.getElementById('useEffects')?.addEventListener('click', e => {
    const input = e.target as HTMLInputElement
    settings.useShaders = input.checked
  })

  document.getElementById('showTV')?.addEventListener('click', e => {
    const input = e.target as HTMLInputElement
    settings.showTV = input.checked
  })

  const width = settings.container.clientWidth 
  const height =settings.container.clientHeight
  settings.containerSize = new Size(width, height)

  await new GameStation(settings).create()
}


main()


