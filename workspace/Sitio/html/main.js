$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
 $('.registrado').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 const input = document.getElementById ("password")
 const check = document.getElementById ("ver")

 check.addEventListener("click", ()=>{
   if(check.checked)
   {
      input.type = "text"
   }
   else{
      input.type = "password"
   }
 })
 
 
 
 
 