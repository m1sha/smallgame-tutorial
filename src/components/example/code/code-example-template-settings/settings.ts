import { ref } from "vue";

type PanelsVisible = {
  showScriptPanel: boolean
  showTelemetryPanel: boolean
  showParametersPanel: boolean
  showViewerSettingsPanel: boolean
  showObjectsPanel: boolean
}

export class Settings {
  private _showScriptPanel = ref(false)
  private _showTelemetryPanel = ref(false)
  private _showParametersPanel = ref(false)
  private _showViewerSettingsPanel = ref(false)
  private _showObjectsPanel = ref(false)

  constructor () {
    const visibles = JSON.parse(localStorage.getItem('code-example-template-settings.panels-visible')) as PanelsVisible ?? { 
      showScriptPanel: false,
      showTelemetryPanel: true,
      showParametersPanel: true,
      showViewerSettingsPanel: false,
      showObjectsPanel: false
    }

    this._showScriptPanel.value = visibles.showScriptPanel
    this._showTelemetryPanel.value = visibles.showTelemetryPanel
    this._showParametersPanel.value = visibles.showParametersPanel
    this._showViewerSettingsPanel.value = visibles.showViewerSettingsPanel
    this._showObjectsPanel.value = visibles.showObjectsPanel
  }

  get showScriptPanel () {
    return this._showScriptPanel.value
  }

  set showScriptPanel (value: boolean) {
    this._showScriptPanel.value = value
    this.save()
  }

  get showTelemetryPanel () {
    return this._showTelemetryPanel.value
  }

  set showTelemetryPanel (value: boolean) {
    this._showTelemetryPanel.value = value
    this.save()
  }

  get showParametersPanel () {
    return this._showParametersPanel.value
  }

  set showParametersPanel (value: boolean) {
    this._showParametersPanel.value = value
    this.save()
  }

  get showViewerSettingsPanel () {
    return this._showViewerSettingsPanel.value
  }

  set showViewerSettingsPanel (value: boolean) {
    this._showViewerSettingsPanel.value = value
    this.save()
  }

  get showObjectsPanel () {
    return this._showObjectsPanel.value
  }

  set showObjectsPanel (value: boolean) {
    this._showObjectsPanel.value = value
    this.save()
  }


  private save () {
    const visibles: PanelsVisible = {
      showScriptPanel: this._showScriptPanel.value,
      showTelemetryPanel: this._showTelemetryPanel.value,
      showParametersPanel: this._showParametersPanel.value,
      showViewerSettingsPanel: this._showViewerSettingsPanel.value,
      showObjectsPanel: this._showObjectsPanel.value,
    }

    localStorage.setItem('code-example-template-settings.panels-visible', JSON.stringify(visibles))
  }
}