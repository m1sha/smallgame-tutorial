
import './style.css'
import { GameStation } from './old-tv/index.ts'
import { GameStationSettings } from './old-tv/game-station-settings.ts'

const settings: GameStationSettings = {
  container: document.querySelector<HTMLDivElement>('#app')!,
  fps: document.querySelector<HTMLDivElement>('#fps')!,
  useShaders: true,
  showTV: true
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

  await new GameStation(settings, 768, 768).create()
}


main()


