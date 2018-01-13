var addHrMsg = function(){
    var msg = document.getElementById("msgarea");
    var input = document.getElementById("input");
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
        input.value = "";
    }
}



document.getElementById("input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addHrMsg();
    }
});