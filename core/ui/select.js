Coffeemaker.core.ui.select = function ( type, name, position, cbk ) {

    var utils = Coffeemaker.core.utilities;

    var element;
	if ( type === 'id' && utils.check.isString( name ) ) {

		element = document.getElementById ( name );

	}

	if ( type === 'tag' && utils.check.isString( name ) ) {

		switch ( name ) {

			case 'head' :
				element = document.head || document.getElementsByTagName("head")[0];
			break

			case 'body' :
				element = document.body || document.getElementsByTagName("body")[0];
			break

			default :

				if (utils.check.doesExist( position ) ) {

					if (utils.check.isNumeric( position ) ) {

						element = document.getElementsByTagName(name)[position];

					} else {

                        element = document.getElementsByTagName(name);
                    }

				} else {

					element = document.getElementsByTagName(name)[0];

				}

			break

		}

	}
    
    if (utils.check.isFunction(cbk)) cbk();
    return element;

}
