const buttonStatuss = document.querySelectorAll("[button-status-change]")
if (buttonStatuss.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus.getAttribute("path")
  buttonStatuss.forEach(button => {
    button.addEventListener("click", () => {
    const idItem = button.getAttribute("idItem")
    const valueStatus = button.getAttribute("valueStatus")
    formChangeStatus.action = path+`/${valueStatus}/${idItem}?_method=PATCH`
    formChangeStatus.submit()
    })
  })
}


// position
const inputPosition = document.querySelectorAll("[position]")

inputPosition.forEach(input => {
  input.addEventListener("change", (e) => {
  const formChangePosition = document.querySelector("#form-change-position")
  const idItem = input.getAttribute("idItem")
  const position = e.target.value
  console.log(position )
  formChangePosition.action = formChangePosition.getAttribute("path") + `/${idItem}/${position}?_method=PATCH`
  formChangePosition.submit()
  })
})
// end postition


// alert express flash
const alertFlash = document.querySelector("[alert-express-flash]")
if (alertFlash) {
  const dataTime = alertFlash.getAttribute("data-time")
  setTimeout(() => {
    alertFlash.classList.add("hiden-alert")
  }, dataTime);
  const clickHident = document.querySelector("[click-hident]")
  clickHident.addEventListener("click", () => {
    alertFlash.classList.add("hiden-alert")
  })
}


// create
// create


// img pupload
const inputUpload = document.querySelector("[input-upload]")
if (inputUpload) {
  const imgUpload = document.querySelector("[img-upload]")
  inputUpload.addEventListener("change", (e) => {
  const nameFile = e.target.files[0]
  const tempUrl = URL.createObjectURL(nameFile);
  imgUpload.setAttribute("src", tempUrl)
  })
  imgUpload.addEventListener("click", () => {
    inputUpload.value = ""
    URL.revokeObjectURL(imgUpload.src);
    imgUpload.setAttribute("src", "")
  })
}
// img uplad
