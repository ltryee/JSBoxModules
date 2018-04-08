'use strict'

const Config = require('scripts/Core/GlobalConfig.js')

let panels = {}
panels[String(Config.env.quickPanel)] = () => require('scripts/UI/QuickPanel.js')
panels[String(Config.env.settingsPanel)] = () => require('scripts/UI/SettingsPanel.js')

$app.validEnv = Config.env.valid
$app.autoKeyboardEnabled = true
$ui.render(panels[String($app.env)]())