// setInterval(cambiaColor, 1000);

function cambiaColor(response) {
    if (response === undefined){
        response = {}
        response.ok = Math.round(Math.random())
    }

    console.log(response);
    if (response.ok) {
        document.querySelector('.led').style.backgroundColor = "green";
    }else{
        document.querySelector('.led').style.backgroundColor = "red";
    }   
}

/*
const mbClient = new MoneyButtonClient("253e9c2eed154e4e9defa7bc50cdcbf6", "a97ce4413fc641f64c3a6470e5037ffb")
await mbClient.logInAsApp()
const payments = await mbClient.getOwnPayments()
const data = payments.map (p => ({id: p.id, amount: p.amount, currency: p.currency}))
console.log(data)
*/
