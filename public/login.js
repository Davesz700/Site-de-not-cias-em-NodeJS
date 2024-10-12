var r_button =  document.querySelector(".registrar")
var regform = document.querySelector("#regform")
var logform = document.querySelector("#logform")
r_button.addEventListener("click", ()=>{
    if(regform.classList.contains("ocultar")){
        regform.classList.remove("ocultar")
        logform.classList.add("ocultar")
    }else{
        regform.classList.add("ocultar")
        logform.classList.remove("ocultar")

    }

})