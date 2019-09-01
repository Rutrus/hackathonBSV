var timer;
var segundos = 0;
function main(){}

function llamada(e){
    var input = document.getElementById('segundos');
    var loader = document.querySelector('.loader');
    input.disabled = true;
    e.style.display = "none";
    loader.style.display = "block";

    var factor = 110;
    var amount = factor * input.value * 1e-8;

    console.log({'factor':factor, 'amount':amount, 'input':input.value});

    const div = document.getElementById('money-button');
    var config = {
        to: "rutrus@moneybutton.com",
        /*amount: "0.00000546",
        currency: "BSV",*/
        amount: amount.toString(),
        currency: "BSV",
        label: "Programar",
        clientIdentifier: "253e9c2eed154e4e9defa7bc50cdcbf6",
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