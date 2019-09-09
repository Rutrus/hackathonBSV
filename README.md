# hackathonBSV

**https://twitter.com/Bsvespanol/status/1167788560126267392**

## August 31st - September 1st 2019
This hackathon se realizó el pasado 31 de Agosto de 2019

Castellví de Rosanes - Barcelona


### En qué consiste
Proyecto de integración de pagos con BSV, hacia dispositivos IoT para #Automatización Industrial y Domótica.

Usamos MoneyButton.com para integrar un botón de pago con el que podremos activar hardware con una sencilla y asequible transacción en la blockchain.

### Configuración de la parte web
El componente web es muy sencillo y se usa principalmente para mostrar el botón de MoneyButton con la configuración adecuada.

Es configurable la dirección de destino, la cantidad a pagar y el Client Identifier. Puedes editar `test.js` para cambiarle la configuración.

El Client Identifier será importante porque debe coincidir con el usado en la parte de servidor que leerá las transacciones realizadas.

### Configuración de la parte servidor
Puedes ejecutar el script servidor con python2 y python3.  Para instalar las dependencias:
`python -m pip install -r server/requirements.txt`

Ejecutar el script:
`python server/reader.py`

La primera vez creará el archivo mínimo de configuración `config.json` que habrá que completar al menos con `client_identifier` y `client_secret` que facilita la web de MoneyButton al crear una app dentro de su web.


## August 31st - September 1st 2019
This hackathon was held on August 31st, 2019

Castellví de Rosanes - Barcelona


### What does it consist of
Project of integration of payments with BSV, towards IoT devices for Industrial #Automation and Home Automation.

We use MoneyButton.com to integrate a payment button with which we can activate hardware with a simple and affordable transaction in the blockchain.

### Web part configuration
The web component is very simple and is mainly used to display the MoneyButton part with the appropriate settings.

The destination address, the amount to be paid and the Client Identifier are configurable. You can edit `test.js` to change the settings.

The Client Identifier will be important because it must match the one used in the server part that will read the transactions made.

### Server part configuration
You can run the server script with python2 and python3. To install the dependencies:
`python -m pip install -r server/requirements.txt`

Run the script:
`python server/reader.py`

The first time you will create the minimum configuration file `config.json` that must be completed at least with `client_identifier` and `client_secret` provided by the MoneyButton website when creating an app within its website.