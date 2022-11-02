//gloabl variable declaration end here
const form = document.querySelector(".form"),
  input = document.querySelector(".input-to-do"),
  inputGroup = document.querySelector(".input-group"),
  dataItem = document.querySelector(".data-item"),
  addBtn = document.querySelector(".add-btn"),
  updatedBtn = document.querySelector(".update-btn"),
  data = JSON.parse(localStorage.getItem("inputVal"));
let arry = data ? data : [];
//gloabl variable declaration end here
// form event start here
window.onload = dataShow();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const fail = document.querySelector(".fail"),
  inputVal= input.value;
  if (inputVal == "") {
    if (fail) {
      inputGroup.removeChild(fail);
      // error.classList.remove("fail");
    }
      const error = document.createElement("span");
      error.className = "error";
      error.innerText = "*field is required";
      inputGroup.appendChild(error);
      error.classList.add("fail");
    
  } else {
      if (fail) {
        inputGroup.removeChild(fail);
        // fail.classList.remove("fail");
      }
      arry.push(inputVal);
      localStorage.setItem("inputVal",JSON.stringify(arry));
      input.value = "";
      dataShow();


  }
});
// form event end here
// data append start here
function dataShow() {
  let item = '';
  arry.forEach(function (element, index) {
    item += `
    <li>
      <ul class="to-do-list">
      <li class="to-do-item">${index + 1}</li>
      <li class="to-do-item">${element}</li>
      <li class="to-do-item data-item">
        <span class="icon edit">edit</span>
        <span class="icon delete">delete</span>
        </li>
      </ul>
    </li>
    `;
  });

  dataItem.innerHTML = item;
  // delete event start here
  if(dataItem.children.length != 0) {
    const deletebtn = document.querySelectorAll(".delete");
    deletebtn.forEach(function(deleteEle,i){
      deleteEle.addEventListener("click",function(){
        deleteItem(i);
      })
    })
    const editBtn = document.querySelectorAll(".edit");
    editBtn.forEach(function(editEle,idx){
      editEle.addEventListener("click" ,function(){
        form.classList.add("active");
        input.value = data[idx];
        updatedBtn.setAttribute("data-index-num", idx);
      })

    })
  }
} 

updatedBtn.addEventListener("click", function(){
  const dataValue = updatedBtn.getAttribute("data-index-num");
  const inputValue = input.value;
  arry.splice(dataValue, 1, inputValue);
  localStorage.setItem("inputVal",JSON.stringify(arry));
  dataShow();
  input.value = "";
  
  form.classList.remove("active");
});

// delete function start here
function deleteItem(index){
  arry.splice(index,1);
  localStorage.setItem("inputVal",JSON.stringify(arry));
  dataShow();
  input.value = "";
};
// delete function start here





















