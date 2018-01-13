var addHrMsg = function(){
    var msg = document.getElementById("msgarea");
    var input = document.getElementById("input");
    var userId = document.getElementById("user-id").innerHTML;
    if(input.value.length > 0 && input.value.trim() != ""){
        var div = document.createElement("div");
        div.innerHTML = '<div style="background: #fff; display:flex; justify-content:flex-end ">' +
        '<h4 class="chat-bubble hr" style="font-weight: 400;">'+ input.value +'</h4>' +
        '</div>'
        msg.appendChild(div);
        var hrs = document.getElementsByClassName('hr');
        var element = hrs[hrs.length-1]; 
        var topPos = element.offsetTop;
        document.getElementById('chatbox').scrollTop = topPos-10;
        // var data = { "query" : input.value };
        fetch("/findIntent?q=" + input.value,
        {
            method: 'GET'
        })
        .then(function(response){ return response.json(); })
        .then(function(intent){ 
            if(intent.error){
                console.log(intent.error); 
                return;               
            }
            if(intent.intent){
                console.log(intent.intent);
                fetch("/findAnswer?q=" + intent.intent + "&user_id=" + userId,
                {
                    method: 'GET'
                })
                .then(function(response){ return response.json(); })
                .then(function(output){ console.log(output.answer) });

            }else{
                console.log("I am still learning. Please ask a better question");
            }
            input.value = "";            
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}



document.getElementById("input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addHrMsg();
    }
});