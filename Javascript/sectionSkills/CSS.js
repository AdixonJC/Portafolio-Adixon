const showText = document.querySelectorAll(".div__icon")
const iconRotate = document.querySelectorAll(".icon-circle-down")

// console.log(iconRotate);

const windowView = document.querySelectorAll(".text__animation")

showText.forEach((text , index) =>{
     text.addEventListener("click", ()=> {
          windowView.forEach(el => {
               if(el === windowView[index]) return windowView[index].classList.toggle("active-details")     

               return  el.classList.remove("active-details")
          })
          iconRotate.forEach(el => {
               if (el === iconRotate[index]) return iconRotate[index].classList.toggle("iconRotate")
               
               return el.classList.remove("iconRotate")
          })
     })
})