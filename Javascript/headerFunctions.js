const header = document.getElementById("main-header")
const burguerMenu = document.getElementById("burguer-menu")
const isClassShow = document.getElementsByClassName("hidden")
const listResponsive = document.getElementById("list__responsive")
const headerResponsive = document.getElementById("div__main--responsive")
const aboutMe = document.getElementById("AboutMe")

const scrollHeaderTop = () => {
if(header){
   if(window.scrollY > 150) {
    header.classList.add("header__container--scroll__animation")
    headerResponsive.classList.add("main__responsive--scroll")
   } else {
    header.classList.remove("header__container--scroll__animation")
    headerResponsive.classList.remove("main__responsive--scroll")
   }
 } 

 if(window.scrollY > 180) {
    listResponsive.classList.remove("show__menu")
    burguerMenu.classList.remove("hidden")
    setTimeout(() => {
      listResponsive.style.position = "fixed"
    }, 500);
 } else {
    listResponsive.style.position = "absolute"
 }
}
document.onscroll = scrollHeaderTop

// document.addEventListener("scroll", scrollHeaderTop)


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

console.log(aboutMe);




