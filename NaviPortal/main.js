const Config = require('scripts/GlobalConfig.js')

let panels = {}
panels[String(Config.env.quickPanel)] = require('scripts/QuickPanel.js')
panels[String(Config.env.settingsPanel)] = require('scripts/SettingsPanel.js')

$app.validEnv = Config.env.valid
$ui.render(panels[String($app.env)])