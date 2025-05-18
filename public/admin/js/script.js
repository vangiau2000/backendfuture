const buttonFilter = document.querySelectorAll("[buttonFilter]")
if (buttonFilter.length) {
  buttonFilter.forEach(button=> {
  button.addEventListener("click", (e) => {
    const url = new URL(window.location.href)
    if(e.target.value) {
      url.searchParams.set("status", e.target.value)
    }
    else {
     url.searchParams.delete("status");
    }
    	window.location.href = url.href
  });
});
}

//search
const formSearch = document.querySelector("#formSearch")
formSearch.addEventListener("submit", (e) => {
  e.preventDefault()
})

const inputSearch = document.querySelector("#inputSearch")
let valueSearch = ""

inputSearch.addEventListener("change", (e) => {
  valueSearch = e.target.value
  if (!valueSearch) {
    const url = new URL(window.location.href)
    url.searchParams.delete("search")
    window.location.href = url.href 
  }
})
const buttonSearch = document.querySelector("#buttonSearch")
buttonSearch.addEventListener("click", () => {
  const url = new URL(window.location.href)
  if (valueSearch) {
    url.searchParams.set("search", valueSearch)
    window.location.href = url.href  // reload lại trang với query mới
  }
})

// ✅ Sau khi trang reload, giữ lại value trong ô input
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const search = params.get("search")
  if (search) {
    inputSearch.value = search
    valueSearch = search
  }
})

//saerch


// const buttonStatusChange = document.querySelector("[button-status-change]")
// const formChangeStatus = document.querySelector("#fromChangeStatus")
// buttonStatusChange.addEventListener("click", (e) => {
//   console.log(buttonStatusChange.getAttribute("idItem"))
// })


// pagination
const paginationItems = document.querySelectorAll("[paginationItem]")
paginationItems.forEach(item => {
  item.addEventListener("click", () => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", item.getAttribute("paginationItem"))
    window.location.href = url.href 
  })
})
// pagination 

// mutil check
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


// form change multi