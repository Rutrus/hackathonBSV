var segundos = 1;

var myVar = setInterval(myTimer, segundos*1000);

function myTimer() {
    fetch("https://reqres.in/api/users?page=2")
    .then(function(response) {
        console.log(response);
        if (response.ok) {
            document.querySelector('.led').style.backgroundColor = "green";
        }else{
            document.querySelector('.led').style.backgroundColor = "red";
        }
    });
}