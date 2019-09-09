
# Server-side script

## Español (Spanish)

La primera vez que se ejecute creará un archivo "config.json" que habrá que modificar para poner las claves que MoneyButton facilita al crear una app.

* Puedes crear una cuenta de usuario en MoneyButton desde [la web de MoneyButton](https://www.moneybutton.com/)
* Puedes crear una app perteneciente a tu cuenta desde el botón [Create New App](https://www.moneybutton.com/settings/apps/create)

El script `reader.py` pide a money button las últimas transacciones y lee la orden de apagado/encendido que se encuentra en la transacción más reciente.

El módulo de python `RPi.GPIO` es propio de Raspberry Pi para controlar y manipular los pines de conexión que activarán/desactivarán el relé. Pon la opción `IS_RASPI = True`

###Configuración mínima
En la configuración necesitas completar como mínimo en `config.json`:

**Client Identifier**
Usa el ''Client Identifier'' dentro de tus botones web para mantener un registro de quién paga, cuándo y desde dónde.

**Client Secret**
Usa el Client Secret junto con el Client_id en tu servidor para poder solicitar el token de acceso (access_token) y poder usar la API (y no lo hagas público).

## English

The first time it runs it will create a "config.json" file that will have to be modified to put the keys that MoneyButton provides when creating an app.

* You can create a user account in MoneyButton from [the MoneyButton website](https://www.moneybutton.com/)
* You can create an app belonging to your account from the [Create New App](https://www.moneybutton.com/settings/apps/create) button

The `reader.py` script asks money button for the latest transactions and reads the on/off command found in the most recent transaction.

The `RPi.GPIO` python module is owned by Raspberry Pi to control and manipulate the connection pins that will activate / deactivate the relay. Activate the option with `IS_RASPI` = `True` inside the script.

###Minimal configuration
Yo will need to complete at least this two values in `config.json`:

**Client Identifier**
Use the Client Identifier inside your buttons to keep track of who paid for what.

**Client Secret**
Use the Client Secret on your server to access the Money Button API (and don't let your users see it).