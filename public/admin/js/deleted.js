const dataCheckBox = document.querySelector("#check-box-all")
if (dataCheckBox) {
  const checkBoxItems = [...document.querySelectorAll("[check-box-item]")]
  dataCheckBox.addEventListener("click", () => {
    if (dataCheckBox.checked) {
      checkBoxItems.forEach(input => {
        input.checked = true
      })
    } else {
       checkBoxItems.forEach(input => {
        input.checked = false
      })
    }
  })
  checkBoxItems.forEach(input => {
    input.addEventListener("click", () => {
       const checkChecked = checkBoxItems.every(input => {
        return input.checked == true
      })
      if (checkChecked) {
        dataCheckBox.checked = true
      }
      else dataCheckBox.checked = false
    })
  })
}
// mutil check


// form change multi
const formChangeMulti = document.querySelector("#form-change-mutil")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputCheckBoxItems = [...document.querySelectorAll("[check-box-item]")]
    const inputChecked = inputCheckBoxItems.filter(input => input.checked).map(input => input.getAttribute("idItem"))
    const inputIds = document.querySelector("[inputIds]")
    inputIds.value = inputChecked.join(",")
    formChangeMulti.submit()
  })
}
