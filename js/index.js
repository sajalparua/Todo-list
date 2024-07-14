// import date and put it into ui page
let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, "0");
let day = String(dateObj.getDate()).padStart(2, "0");
let year = dateObj.getFullYear();
let outputDate = day + "/" + month + "/" + year;
document.getElementById("fulldate").innerHTML = outputDate;



//lisstne enter key and assignd  to submit button
const textInput = document.getElementById("task");
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // console.log('Enter key pressed!');
    submit.click();
  }
});



//take input data and push it in a arrray
var tasklist = [];
function submittask() {
  const task = document.getElementById("task");
  const result = task.value.trim();
  if (result == "") {
  } else {
    const obj = {
      // make a random  no. and send to make id.
      id: Math.floor(Math.random() * 100 + 1),
      checked: false,
      text: result,
    };
    //else input string push to tasklist array.
    tasklist.push(obj);
    // refresh the output list.
    reloadTaskUi();
    //clear input box after click submit.
    task.value = "";
  }
  saveBTnApper();
}


//when click the delete button then start this  opration.
document.getElementById("task-ul").addEventListener("click", function (dets) {
  //get the id from targeted clicked items.
  taskid = dets.target.id;
  // console.log(taskid);
  iconId = document.getElementById(taskid);
  //when user click on checkbox 
  if (taskid.includes("checkboxId")) {
    let checkBox = document.getElementById(taskid);
    let elementId = taskid.replace("checkboxId_", "")
    let clickedElement = tasklist.findIndex((element) => {
      return element.id == elementId;
    })
    tasklist[clickedElement].checked = checkBox.checked;


  }
  //it,s work only when it,s id name include delete.
  else if (taskid.includes("delete")) {
    //get the index element from id erase the delete letter.
    newid = taskid.replace("delete_", "");
    //find the index element's index.
    const arrayIndex = tasklist.findIndex((element) => element.id == newid);
    // delete the index
    tasklist.splice(arrayIndex, 1);
    reloadTaskUi();
    saveBTnApper();
  }
  // when click on task  edite button  
  else if (taskid.includes("edit")) {
    iconId.style.display = "none";
    newid = taskid.replace("edit_", "");
    deletId = "delete_" + newid;
    deleteIcon = document.getElementById(deletId);
    deleteIcon.style.display = "none"
    inputId = "typebox_" + newid;
    buttonId = "savebtn_" + newid;
    editebox = document.getElementById(inputId);
    buttonbox = document.getElementById(buttonId);
    editebox.style.display = "block";
    editebox.click();
    buttonbox.style.display = "block";
    contentId = "contentId_" + newid;
    content = document.getElementById(contentId);
    content.style.display = "none";
    text = tasklist.find((element) => element.id == newid).text;
    editebox.value = text;
  } else if (taskid.includes("savebtn")) {
    iconId.style.display = "block";
    mainId = taskid.replace("savebtn_", "");
    newText = document.getElementById(inputId).value;
    clickIndex = tasklist.find((element) => element.id == newid);
    clickIndex.text = newText;
    reloadTaskUi();
  }
});


// reload the tasks ui after aney oparation 
function reloadTaskUi() {
  var listbox = "";
  for (i = 0; i < tasklist.length; i = i + 1) {
    const obj = tasklist[i];
    textid = obj.id;
    isChecked = obj.checked;
    checked = isChecked == true ? 'checked' : ''
    listbox =
      listbox +
      `<li id="list"><div class="checkbox-wrapper-19">
  <input type="checkbox" id="checkboxId_${textid}"  ${checked}  />
  <label for="checkboxId_${textid}" class="check-box">
</div><p id="contentId_${textid}" class="ms-3 ">${tasklist[i].text}</p> <input id="typebox_${textid}" class="editebox" type="text"><button id="savebtn_${textid}">save</button><i id="edit_${textid}" class="bi bi-pencil-square fs-5"></i><i id="delete_${textid}" class="bi bi-x delete"></i></li>`;
  }
  document.getElementById("task-ul").innerHTML = listbox;
}


let sliderPosition = false;
function slideMenu(savedTask) {
  sliderPosition = !sliderPosition;
  if (sliderPosition == true) {
    savedTask.style.left = 0;
  } else {
    savedTask.style.left = -100 + "%";
  }
}

function saveBTnApper() {
  if (tasklist.length == 0) {
    saveBtn.style.display = "none";
  } else {
    saveBtn.style.display = "inline";
  }
}
saveBTnApper();

// saved  tasks in a local storage after checked localstorage
let savedItems ={};
function saveTask() {
  if (tasklist.length == 0) {
    console.log("empty");
  }
  let savaedJSON = localStorage.getItem("Todos");
   let savedData = JSON.parse(savaedJSON);
   if (savedData == null) {
     savedData = [];
   }
  if(savedItems.id){
  //  console.log('achha');
   savedItems = {id: savedItems.id , date:outputDate , taskes: tasklist}
   
   let index = savedData.findIndex((ele)=>{
    return ele.id == savedItems.id
   })
   savedData[index] = savedItems;
  }
  else{
    // console.log('nai');
    savedItems = { id: Date.now(), date:outputDate , taskes: tasklist };
    // console.log(savedItems);
    // console.log(savedData);
    savedData.unshift(savedItems);
  }
  let myJsonString = JSON.stringify(savedData);
  localStorage.setItem("Todos", myJsonString);
  localStorageUI();
  tasklist = [];
  reloadTaskUi();
  saveBTnApper();
  savedItems= {};
}

//get localstorage data and show it in ui
var savedTaskUl = document.getElementById("savedTaskUl");
function localStorageUI() {
  var savaedTaskInnerHtml = "";
  const itemsTring = localStorage.getItem("Todos");
  let itemArray = JSON.parse(itemsTring);
  if (itemArray == null) {
    return;
  } else {
    for (i = 0; i < itemArray.length; i++) {
      // console.log(itemArray);
      savaedTaskInnerHtml =
        savaedTaskInnerHtml +
        `<li class=" my-2 mx-2 ">
<section id=${i} onclick ="showLocalTask(id)" class="w-100 ">${itemArray[i].taskes[0].text}
<div class='date'>${itemArray[i].date}</div>
</section>
<i id="${i}" onclick = "deleteLocalTask(id)" class="bi bi-x-square"></i>
</li>`;
    }
    savedTaskUl.innerHTML = savaedTaskInnerHtml;
  }
}
localStorageUI();

//////

function showLocalTask(clickId) {
  const itemsTring = localStorage.getItem("Todos");
  let itemArray = JSON.parse(itemsTring);
  document.getElementById("fulldate").innerHTML = itemArray[clickId].date;
  tasklist = itemArray[clickId].taskes;
  savedItems.id = itemArray[clickId].id;
  reloadTaskUi();
  slideMenu(savedTask);
  saveBTnApper();
}
/////// local storage delete  button working . 
function deleteLocalTask(clickedid) {
  const itemsTring = localStorage.getItem("Todos");
  let itemArray = JSON.parse(itemsTring);
  itemArray.splice(clickedid, 1)
  let myJsonString = JSON.stringify(itemArray);
  localStorage.setItem("Todos", myJsonString);
  localStorageUI();
  tasklist = [];
  reloadTaskUi();
}
