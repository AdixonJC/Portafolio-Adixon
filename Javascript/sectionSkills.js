const showText = document.querySelectorAll(".div__icon")
const iconRotate = document.querySelectorAll(".icon-circle-down")

// console.log(iconRotate);

const windowView = document.querySelectorAll(".text__animation")

console.log(windowView);

showText.forEach((text , index) =>{
     text.addEventListener("click", ()=> {
          windowView.forEach(el => {
               if(el === windowView[index]){
                    windowView[index].classList.toggle("active-details")     
               } else{
                    el.classList.remove("active-details")
               }
          })
          iconRotate.forEach(el => {
               if (el === iconRotate[index]) {
                    iconRotate[index].classList.toggle("iconRotate")
               } else {
                    el.classList.remove("iconRotate")
               }
          })
     })
})


