var timer;
var segundos = 0;
var factor = 110;
var input = document.getElementById('segundos');

input.addEventListener("change", updateSecs)
var amount = factor * input.value * 1e-8;

function updateSecs(){
    sats = document.getElementById("sats")
    amount = factor * input.value * 1e-8;
    sats.innerHTML = Math.round(amount * 1e8) + " sats"
}

function llamada(e){
    var loader = document.querySelector('.loader');
    input.disabled = true;
    e.style.display = "none";
    loader.style.display = "block";

    console.log({'factor':factor, 'amount':amount, 'input':input.value});

    const div = document.getElementById('money-button');
    var config = {
        /*to: "rutrus@moneybutton.com",
        amount: "0.00000546",
        currency: "BSV",*/
        to: "1BefTfvsk3BSqYzcsmgPZ4sUYpsMfWKSkw",
        amount: amount.toString(),
        currency: "BSV",
        label: "Programar",
        clientIdentifier: "28d219bcde2c52a65c52814e44a96124",
        buttonId: "boton-pagina",
        buttonData: "{}",
        opReturn: "#ON#1#"+input.value,
        type: "tip",
        onPayment: function (arg) {
            setTimeout(function(){
                console.log('onPayment', arg);
                document.querySelector('.led').style.backgroundColor = "green";
                segundos = input.value;
                timer = setInterval(contador, 1000);
            }, 2000);
        },
        onError: function (arg) { console.log('onError', arg) },
        onLoad: function (arg) {}
    };
    moneyButton.render(div, config);
}

function contador() {
    document.getElementById('contador').innerHTML = "Faltan " + segundos + ' segundos';
    segundos -= 1;
    if (segundos == -1) {
        document.querySelector('.led').style.backgroundColor = "red";
        document.getElementById('contador').innerHTML = '';
        clearInterval(timer);
        location.reload();
    }
}

function toogle() {
    eTimer = document.getElementById("timer");
    eSwitch = document.getElementById("switch");

    if (eSwitch.style.display != "none") {
        eTimer.style.display = "block";
        eSwitch.style.display = "none";
        document.getElementById("toogle").innerHTML = "Switch"
    } else {
        eTimer.style.display = "none";
        eSwitch.style.display = "block";
        document.getElementById("toogle").innerHTML = "Timer"
        if (!loadedButtons) {
            a();
            loadedButtons = true;
        }
    }
}

function a() {
    var div_on = document.getElementById('on');
    var div_off = document.getElementById('off');

    var config_on = {
        /*to: "rutrus@moneybutton.com",
        amount: "0.00000546",
        currency: "BSV",*/
        to: "rutrus@moneybutton.com",
        amount: "0.00000546",
        currency: "BSV",
        label: "Turn on",
        clientIdentifier: "28d219bcde2c52a65c52814e44a96124",
        buttonId: "enciende",
        buttonData: "{}",
        opReturn: "#ON#1",
        type: "tip",
        onPayment: function (arg) {
            setTimeout(function(){
                console.log('onPayment', arg);
                document.querySelector('.led').style.backgroundColor = "green";
            }, 2000);
        },
        onError: function (arg) { console.log('onError', arg) },
        onLoad: function (arg) {}
    };

    var config_off = {
        /*to: "rutrus@moneybutton.com",
        amount: "0.00000546",
        currency: "BSV",*/
        to: "rutrus@moneybutton.com",
        amount: "0.00000546",
        currency: "BSV",
        label: "Turn off",
        clientIdentifier: "28d219bcde2c52a65c52814e44a96124",
        buttonId: "enciende",
        buttonData: "{}",
        opReturn: "#OFF#1",
        type: "tip",
        onPayment: function (arg) {
            setTimeout(function(){
                console.log('onPayment', arg);
                document.querySelector('.led').style.backgroundColor = "red";
                timer = setInterval(contador, 1000);
            }, 2000);
        },
        onError: function (arg) { console.log('onError', arg) },
        onLoad: function (arg) {}
    };
    console.log(div_on, config_on)
    moneyButton.render(div_on, config_on);
    moneyButton.render(div_off, config_off);
}

var loadedButtons = a() || true;