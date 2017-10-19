

function loadWars() {
    $.ajax({url: "https://swapi.co/api/people/2/?format=json", success: function(result){
            console.log(result);
            $("#result").text(JSON.stringify(result));
    }});
};