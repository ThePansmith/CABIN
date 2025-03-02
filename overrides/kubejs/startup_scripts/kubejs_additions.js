const CLIENT_GUI_EVENTS = Platform.isClientEnvironment() ? java('dev.architectury.event.events.client.ClientGuiEvent') : undefined;
if (Platform.isClientEnvironment()) {
	onEvent('arch.event.register', event => {
		event.register('ClientGuiEvent.post_init', CLIENT_GUI_EVENTS, 'INIT_POST');
	});
}