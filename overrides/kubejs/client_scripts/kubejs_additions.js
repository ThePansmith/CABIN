const CLIENT_GUI_EVENTS = java('dev.architectury.event.events.client.ClientGuiEvent');
onEvent('arch.event.register', event => {
	event.register('ClientGuiEvent.post_init', CLIENT_GUI_EVENTS, 'INIT_POST');
});