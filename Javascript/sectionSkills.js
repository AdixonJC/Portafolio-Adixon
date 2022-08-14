const showText = document.querySelectorAll(".text__skills")
const iconRotate = document.querySelectorAll(".icon-circle-down")

console.log(iconRotate);

const showTextArr = [...showText]

const windowView = document.querySelectorAll(".text__animation")

showTextArr.map((text , index) => text.addEventListener('click', ()=> {
     windowView[index].classList.toggle("active-details")
     iconRotate[index].classList.toggle("iconRotate")
}))



