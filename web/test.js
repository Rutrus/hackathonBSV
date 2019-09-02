var timer;
var segundos = 0;
var amount;
function main(){}

var factor = 110;
var input = document.getElementById('segundos');
input.addEventListener("change", updateSecs)

function updateSecs(){
    sats = document.getElementById("sats")
    amount = factor * input.value * 1e-8;
    sats.innerHTML = Math.round(amount * 1e8) + " sats"
}

function llamada(e){
    // var input = document.getElementById('segundos');
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
