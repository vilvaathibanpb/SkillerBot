// SignUp section

var mouseOverSignUp = function(){
    document.getElementById("facebook").classList.add("fb");
    document.getElementById("google").classList.add("gg");
    document.getElementById("linkedin").classList.add("ln");
    document.getElementById("signupImg").classList.remove("display-none");
    document.getElementById("signupImg").classList.remove("animate-signup-image-out");
    document.getElementById("signupImg").classList.remove("animate-signup-image-in");
    document.getElementById("signupImg").classList.add("animate-signup-image-in");
    document.getElementById("contactUsImg").classList.add("display-none");
    document.getElementById("overlay2").classList.remove("display-none");
    
    return;
}

var mouseOutSignUp = function(){
    document.getElementById("facebook").classList.remove("fb");
    document.getElementById("google").classList.remove("gg");
    document.getElementById("linkedin").classList.remove("ln");   
    document.getElementById("signupImg").classList.remove("animate-signup-image-in");
    document.getElementById("signupImg").classList.remove("animate-signup-image-out");
    document.getElementById("overlay2").classList.add("display-none");        
    return; 
}

// Description Section
var mouseOverDescription = function(){
    document.getElementById("signupImg").classList.add("display-none");
    document.getElementById("contactUsImg").classList.add("display-none");
    return;
}



// Customise Section

var mouseOverCustomise = function(){
    document.getElementById("contactUsImg").classList.remove("display-none");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-in");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-out");
    document.getElementById("contactUsImg").classList.add("animate-contact-image-in");
    document.getElementById("signupImg").classList.add("display-none");
    document.getElementById("overlay2").classList.remove("display-none");
    
    return;
}

var mouseOutCustomise = function(){
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-out");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-in");
    document.getElementById("overlay2").classList.add("display-none");    
    return; 
}

var shrinkMenu = function(){
    console.log("shrink")
    // document.getElementById("contactUsImg").classList.add("display-none");  
    document.getElementById("overlay2").classList.remove("display-none");    
    document.getElementById("customize").classList.add("customize-bg");    
    setTimeout(function(){document.getElementById("line2").classList.add("display-none");},250);  
      
}

var expandMenu = function(){
    document.getElementById("line2").classList.remove("display-none");
    document.getElementById("customize").classList.remove("customize-bg");        
    document.getElementById("line2").classList.add("expand-span");
}

var openMenu = function(){
    document.getElementById("menu").classList.remove("display-none");    
}

var closeMenu = function(){
    document.getElementById("menu").classList.add("display-none");    
}