const showText = document.querySelectorAll(".div__icon")
const iconRotate = document.querySelectorAll(".icon-circle-down")

// console.log(iconRotate);

const showTextArr = [...showText]

const windowView = document.querySelectorAll(".text__animation")

showTextArr.map((text , index) =>{
     text.addEventListener('click', ()=> {
          windowView.forEach(el => el.classList.remove("active-details"))
          iconRotate.forEach(el => el.classList.remove('iconRotate'))
          windowView[index].classList.add("active-details")
          iconRotate[index].classList.add("iconRotate")
     })
})



