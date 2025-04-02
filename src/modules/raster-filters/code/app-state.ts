
import { AllFiltersSettings, createDefaultFiltersSettings } from './filters'
import { EyeDroppperTool, Tool } from './tools'

export class AppState {
  filtersSettings = createDefaultFiltersSettings()
  currentTool: Tool = new EyeDroppperTool()

  getFilterSettings<T> (type: string): T {
    return this.filtersSettings.find(p => p.type === type) as T
  }
}
