function Notify(type, title, message, time, playSound)
	SendNUIMessage({
		action = 'open',
		type = type,
		title = title,
		message = message,
		time = time,
		playSound = playSound
	})
end

RegisterNetEvent('pc_notifications:Notify')
AddEventHandler('pc_notifications:Notify', function(type, title, message, time, playSound)
    Notify(type, title, message, time, playSound)
end)