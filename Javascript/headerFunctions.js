const header = document.getElementById("main-header")
const burguerMenu = document.getElementById("burguer-menu")
const isClassShow = document.getElementsByClassName("hidden")
const listResponsive = document.getElementById("list__responsive")
const headerResponsive = document.getElementById("div__main--responsive")
const aboutMe = document.getElementById("AboutMe")
const navItems = document.querySelectorAll(".nav-items")
const listItems = document.querySelectorAll(".list-item")


let arrayItems = [...navItems] //convierto mis listas y nodos en arrays
let arrayList = [...listItems] //convierto mis listas y nodos en arrays


console.log(navItems);

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
  // document.onscroll = scrollHeaderTop
document.addEventListener("scroll", scrollHeaderTop)



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

const viewSection = (entries, observer) => {
   entries.forEach(entry => {
    // console.log(entry);
    const id = entry.target.getAttribute("id") // a cada una de mis entradas le selecciono el atributo ID
    const navLink = document.querySelector(`a[href="#${id}"]`) // aqui le indico que quiero buscar selector por selector segun su ID
    console.log(navLink);
    if(entry.isIntersecting) {
      navLink.classList.add("active")
    } else navLink.classList.remove("active")
   })
}

const observing = new IntersectionObserver(viewSection , {
  // root: null,
  // rootMargin: "0px 0px -50% 0px",
  threshold: [.5 , .75]
})

navItems.forEach(el => observing.observe(el)) // nav items nos trae un arreglo y debemos obervar cada uno de los elementos



