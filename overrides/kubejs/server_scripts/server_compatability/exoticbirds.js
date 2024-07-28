if(Platform.isLoaded("exoticbirds")) {
	onEvent('item.tags', event => {
		//these tags are used by farmers delight.
		event.add('forge:raw_chicken', 'exoticbirds:raw_birdmeat')
		event.add('forge:cooked_chicken', 'exoticbirds:cooked_birdmeat')

		//These tags don't do anything in the base pack but some mod outside the base pack might use them
		event.add('forge:foods/meat/raw', 'exoticbirds:raw_birdmeat')
		event.add('forge:foods/meat/cooked', 'exoticbirds:cooked_birdmeat')
	})
}