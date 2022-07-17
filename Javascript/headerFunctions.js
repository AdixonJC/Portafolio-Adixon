const header = document.getElementById("main-header")
const burguerMenu = document.getElementById("burguer-menu")
const isClassShow = document.getElementsByClassName("hidden")
const listResponsive = document.getElementById("list__responsive")

const scrollHeaderTop = () => {
if(header){
   if(window.scrollY > 150) {
    header.classList.add("header__container--scroll__animation")
   } else {
    header.classList.remove("header__container--scroll__animation")
   }
 } return
}

// document.addEventListener("scroll", scrollHeaderTop)
document.onscroll = scrollHeaderTop

const showBurguerMenu = () => {
    if(isClassShow.length === 0){
      burguerMenu.classList.add("hidden")
      listResponsive.classList.add("show__menu")
    } else {
      burguerMenu.classList.remove("hidden")
      listResponsive.classList.remove("show__menu")
    }
}

// burguerMenu.addEventListener("click", showBurguerMenu)
burguerMenu.onclick = showBurguerMenu






