// chrome extension //

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const Leadsfromlocalstorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")


if ( Leadsfromlocalstorage){
    myLeads = Leadsfromlocalstorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {

  chrome.tabs.query({ active: true, currentWindow: true }, function () {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify( myLeads ))
    render(myLeads)
   console.log(tabs[0].url)
   
  });

  
})


function render(Leads) {
  let listItems = ""

  for (let i = 0; i < Leads.length; i++) {
    listItems += `
              <li>
               <a target='_blank' href='${Leads[i]}'>
                 ${Leads[i]}
              </a>
            </li>
               `
  }

  ulEl.innerHTML += listItems
}

deleteBtn.addEventListener('dblclick', function(){
  console.log("doubleclicked")
  localStorage.clear()
  myLeads = []
  render(myLeads)
});



inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""

  localStorage.setItem("myLeads", JSON.stringify(myLeads))

  render(myLeads)

  console.log(localStorage.getItem("myLeads"))
})
