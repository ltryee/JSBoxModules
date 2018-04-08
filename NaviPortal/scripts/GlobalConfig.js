const quickPanelEnv = $env.today
const settingsPanelEnv = $env.app

const config = {
  env: {
    valid: quickPanelEnv | settingsPanelEnv,
    quickPanel: quickPanelEnv,
    settingsPanel: settingsPanelEnv
  },
  debugging: true,
}

module.exports = config