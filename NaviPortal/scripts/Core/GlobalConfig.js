'use strict'

const quickPanelEnv = $env.today
const settingsPanelEnv = $env.app

const config = {
  env: {
    valid: quickPanelEnv | settingsPanelEnv,
    quickPanel: quickPanelEnv,
    settingsPanel: settingsPanelEnv
  },
  debugging: true,
  cache: {
    pathKey: 'Path',
    locationKey: 'Location'
  },
  ui: {
    margin: 5,
    height: 44,
  }
}

module.exports = config