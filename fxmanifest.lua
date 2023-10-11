fx_version "cerulean"
game "gta5"
lua54 'yes'

author 'PoisonCode https://discord.gg/rNJ8cHXCsN'
description 'Notifications system'
version '1.0'

ui_page 'html/ui.html'

files {
	'html/*.*',
	'html/audio/*.*'
}

client_scripts {
	'client.lua',
}


export 'Notify'