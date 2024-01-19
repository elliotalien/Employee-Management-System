// FETCHES EMPLOYEE DATA FROM THE SERVER (START)

async function employeeGet() {
  try {
    const data = await fetch("http://localhost:3000/employees");
    const objectData = await data.json();

    // getEmployee(objectData); 

    allemployee = objectData;
    console.log(objectData)
  
  } catch (error) {
    console.log(error);
  }
  pagination(allemployee);
}

employeeGet();

// FETCHES EMPLOYEE DATA FROM THE SERVER (END)








// GENERATES DYNAMIC HTML TABLE FROM THE SERVER BASED DATA. (START)

function getEmployee(user) {
  let tableData = "";
  let slno = 1;
  user.forEach((user,index) => {
    tableData += `
            <tr>
            <td>#${slnumber(index + 1)}${index + 1}</td>
             <td><img src="http://localhost:3000/employees/${user.id}/avatar" alt=profilpic class="rounded-circle employee-imagE mr-2" height=30  width=30> ${user.salutation} ${user.firstName} ${user.lastName}</td>
             <td>${user.email}</td>
             <td>${user.phone}</td>
             <td>${user.gender}</td>
             <td>${user.dob}</td>
             <td>${user.country}</td>
             <td class="editing"> <button  type="button" class="delete-edit" onclick="toggleEmployeeSetup(this.nextElementSibling)" id="employeeSetupDiv" ><i class="fa-solid fa-ellipsis"></i></button>
             <div class="employee-setup"  >
             <a href="ViewEmployee.html?id=${user.id}" ><button  class="btn-controls" ><i class="fa-regular fa-eye"></i> View Details</button></a>
             <button onclick="getId('${user.id}');getUser()" class="btn-controls"><i class="fa-solid fa-pen"></i>Edit</button>
             <button type="button" class="btn-controls" onclick="deleteData('${user.id}')"><i class="fa-regular fa-trash-can"></i>Delete</button>
             </div>
             </td>
            </tr> `;

    slno++;
  })

  document.getElementById("table-body").innerHTML = tableData;
}

// GENERATES DYNAMIC HTML TABLE FROM THE SERVER BASED DATA. (END)









// SLNUMBER GENERATING FUNCTION (START)

function slnumber(num) {
  if (num < 10) {
    return 0;
  } else {
    return "";
  }
}

// SLNUMBER GENERATING FUNCTION (END)









// ADD EMPLOYEE FORM OPENING (START)

let  submitFormOpen = document.getElementById("form-box");
let  overlay = document.getElementById("overlay");

 overlay.addEventListener("click", function () {

  closeForm(); // formclosing function
  deleteEmployeeToastClose(); // Delete employee toast box
  editEmployeeToastClose();// Edit employee toast box
  addemployeeCloseToast(); // Add employee toast box
});

function openForm() {

  document.getElementById("previewimage").style.display = "none";
  document.getElementById("imageuploding-box").style = "block";

  dataRemove();// data removing function

  submitFormOpen.classList.add("active");
  overlay.classList.add("active");
}

function closeForm() {
  submitFormOpen.classList.remove("active");
  overlay.classList.remove("active");
  
}

// ADD EMPLOYEE FORM OPENING (END)







// VIEW EMPLOYEE EDIT EMPLOYEE DELETE EMPLOYE POPUP (START)

const toggleEmployeeSetup = (button) => {

  button.style.display = button.style.display === "block" ? "none" : "block";

let invisibleOverlay = document.getElementById("invisible");
let employeeSetupDiv  = document.getElementById('employeeSetupDiv')

employeeSetupDiv .classList.add('active');
invisibleOverlay.classList.add('active');

invisibleOverlay.addEventListener("click", function () {

  closeEmployeeSetup();

})

function closeEmployeeSetup(){
  employeeSetupDiv .classList.remove('active');
  invisibleOverlay.classList.remove('active');
  button.style.display = "none"
}
}

// VIEW EMPLOYEE EDIT EMPLOYEE DELETE EMPLOYE POPUP (END)

 





// FORM ALL DATA CLEARING FUNCTION (START)

const dataRemove = () => {
  
  document.getElementById("adduserbtn").style.display = "block";
  document.getElementById("changeemployee").style.display = "none";
  document.getElementById("changeform").textContent = "Add Employee";

  document.getElementById("salutation").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("dob").value = "";
  Male.checked = false;
  Female.checked = false;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("qualifications").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pinZip").value = "";

};
// FORM ALL DATA CLEARING FUNCTION (END)







//EMPLOYEE GENDER SELECTION FUNCTION (START)

const genderSelect = () => {
  const male = document.getElementById('Male');
  const female = document.getElementById('Female');

  if (male.checked == true) {

      return male.value;
  } else {
      return female.value;
  }
}

//EMPLOYEE GENDER SELECTION FUNCTION (END)






// posting employees details into table

function adduser() {
  let user = {};
  user["salutation"] = document.getElementById("salutation").value;
  user["firstName"] = document.getElementById("firstName").value;
  user["lastName"] = document.getElementById("lastName").value;
  user["email"] = document.getElementById("email").value;
  user["phone"] = document.getElementById("phone").value;
  user["dob"] = document.getElementById("dob").value;
  user["gender"] = genderSelect();
  user['dob'] = dateofbirth(document.getElementById('dob').value)
  user["qualifications"] = document.getElementById("qualifications").value;
  user["address"] = document.getElementById("address").value;
  user["country"] = document.getElementById("country").value;
  user["username"] = document.getElementById("username").value;
  user["password"] = document.getElementById("password").value;
  user["country"] = document.getElementById("country").value;
  user["state"] = document.getElementById("state").value;
  user["city"] = document.getElementById("city").value;
  user["pinZip"] = document.getElementById("pinZip").value;
 


  return user;

  function dateofbirth(dob){
    let Date = dob.split('-').reverse().join('-');
    return Date
  }
}






let userId;

function getId(id) {
  userId = id;
}

async function getUser() {
  try {
    openForm();

    document.getElementById("imageuploding-box").style.display = "none";
    document.getElementById("previewimage").style.display = "block";

    // edit form

    document.getElementById("adduserbtn").style.display = "none";
    document.getElementById("changeemployee").style.display = "block";
    document.getElementById("changeform").textContent = "Edit Employee";

    // fetch edit data

    const res = await fetch("http://localhost:3000/employees/" + userId);
    const data = await res.json();


    document.getElementById("salutation").value = data.salutation;
    document.getElementById("firstName").value = data.firstName;
    document.getElementById("lastName").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;

    document.getElementById("dob").value = dateofbirth(data.dob);
    data.gender === 'male' ? Male.checked = true : Female.checked = true;

    document.getElementById("username").value = data.username;
    document.getElementById("password").value = data.password;
    document.getElementById("qualifications").value = data.qualifications;
    document.getElementById("address").value = data.address;
    document.getElementById("country").value = data.country;
    document.getElementById("state").value = data.state;
    document.getElementById("city").value = data.city;
    document.getElementById("pinZip").value = data.pinZip;
    document.getElementById("imagefile").src ="http://localhost:3000/employees/" + userId + "/avatar";
  } 
  catch (error) {
    console.log(error);
  }

  function dateofbirth(dob){
    let Date = dob.split('-').reverse().join('-');
    return Date
  }
  
}


// function for posting Employee data to the server

let employeeDpImage = document.getElementById("image-change");
let addEmployeeInputbox = document.getElementById("imageuploadbox");

let profilePicEmployeeDp;
let profilePicAddEmployee;

employeeDpImage.addEventListener('change', () => {
  profilePicEmployeeDp = employeeDpImage.files[0];
});

addEmployeeInputbox.addEventListener('change', () => {
  profilePicAddEmployee = addEmployeeInputbox.files[0];
});

let userImage = document.getElementById("imagefile");
let userImageInputbox = document.getElementById("imageuploadbox");




userImageInputbox.addEventListener("change", function () {
  document.getElementById('imageuploding-box').style.display = "none";
  document.getElementById('previewimage').style.display = "block";

  const [file] = userImageInputbox.files;
  if (file) {
    userImage.src = URL.createObjectURL(file);
  }
});



async function postuser() {
  try {
    const userData = adduser(); 
    const response = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    if (profilePicAddEmployee) {
      await uploadavatar(responseData.id, profilePicAddEmployee);
    }
    addemployeeOpenToast() ;
  } catch (error) {
   console.log(error);
  }

  
}

async function uploadavatar(userId, imageFile) {
  try {
    const formData = new FormData();
    formData.append("avatar", imageFile);

    const response = await fetch(`http://localhost:3000/employees/${userId}/avatar`, {
      method: "POST",
      body: formData,
    });

  } catch (error) {
   console.log(error);
  }
}








//  EMPLOYEE EDITING / PUT (START)

async function editing() {
  if (profilePic) {
    addImage(profilePic);
  }
  try {
    await fetch("http://localhost:3000/employees/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adduser()),
    });

  } catch (error) {
    console.error(error);
  }

}

//  EMPLOYEE EDITING / PUT (END)













// EMPLOYEE DELETE (START)

const deletebtns = document.getElementById("deletebox");
const deletes = document.getElementById("alert-box-delete");




function deleteData(id) {

  deletebtns.style.display = "block";

  deletebtns.classList.add('active');
  document.getElementById('overlay').classList.add('active');

  deletes.addEventListener("click", function () {
    fetch("http://localhost:3000/employees/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {});
  });
 
 
}


// Function to close the alert and hide elements

function closealert() {
  deletebtns.style.display = "none";

  deletebtns.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  
}

document.getElementById('overlay').addEventListener("click",function(){
  closealert();
})


// EMPLOYEE DELETE (END)












// ADD EMPLOYEE FORM IMAGE PREVIEW (END)





// UPDATE EMPLOYEE IMAGE PREVIEW AND UPDATING OF IMAEG (END)

let imageFile = document.getElementById("image-change");

let profilePic;

imageFile.addEventListener("change", () => {
  profilePic = imageFile.files[0];
});


let changeimage = document.getElementById("image-change");
let profileimage = document.getElementById("imagefile");

// image previewing in edit employee form

changeimage.addEventListener("change", function () {
  const [file] = changeimage.files;
  if (file) {
    profileimage.src = URL.createObjectURL(file);
  }
});



//selelected image updated to the server

async function addImage() {
  let avatarData = new FormData();
  avatarData.append("avatar", profilePic);
  try {
    const res = await fetch(
      "http://localhost:3000/employees/" + userId + "/avatar",
      {
        method: "POST",
        body: avatarData,
      }
    );
  } catch (error) {
    console.log(error);
  }
}



// UPDATE EMPLOYEE IMAGE PREVIEW AND UPDATING OF IMAEG (END)










// FORM VALIDATION (START)


function validateField(inputId, errorMessage, requiredMessage) {
  let inputField = document.getElementById(inputId);

  // for user type the input field remove required msg
  inputField.addEventListener('input', () => {
    inputField.previousElementSibling.classList.remove('required');
    inputField.style.border = "1px solid #E6E8EB";
    inputField.previousElementSibling.innerHTML = errorMessage;
    inputField.previousElementSibling.style.color = "#2B3674";
  });

  let inputValue = inputField.value;

  if (!inputValue) {
    // Highlight required message 
    inputField.previousElementSibling.classList.add('required');
    inputField.style.border = "1px solid red";
    inputField.focus();
    inputField.previousElementSibling.innerHTML = requiredMessage;
    inputField.previousElementSibling.style.color = "red";
    return false;
  } else if (inputField.type === 'email' && !isValidEmail(inputValue)) {
    // Email validation
    inputField.previousElementSibling.classList.add('required');
    inputField.style.border = "1px solid red";
    inputField.focus();
    inputField.previousElementSibling.innerHTML = 'Invalid email format';
    inputField.previousElementSibling.style.color = "red";
    return false;
  } else if (inputField.type === 'tel' && !validatePhone(inputValue)) {
    // Phone number validation
    inputField.previousElementSibling.classList.add('required');
    inputField.style.border = "1px solid red";
    inputField.focus();
    inputField.previousElementSibling.innerHTML = 'Invalid phone number format';
    inputField.previousElementSibling.style.color = "red";
    return false;
  } else {
    // Remove required styling
    inputField.previousElementSibling.classList.remove('required');
    inputField.style.border = "1px solid #E6E8EB";
    inputField.previousElementSibling.innerHTML = errorMessage;
    inputField.previousElementSibling.style.color = "#2B3674";
    return true;
  }

  
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation function
function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}





function formValidation()  {
  const fields = [
        { id: 'salutation', message: 'Salutation', requiredMessage: 'Salutation is required' },
        { id: 'firstName', message: 'First Name', requiredMessage: 'First Name is required' },
        { id: 'lastName', message: 'Last Name', requiredMessage: 'Last Name is required' },
        { id: 'email', message: 'Email', requiredMessage: 'Email is required' },
        { id: 'phone', message: 'Mobile Number', requiredMessage: 'Mobile Number is required' },
        { id: 'username', message: 'Username', requiredMessage: 'Username is required' },
        { id: 'password', message: 'Password', requiredMessage: 'Password is required' },
        { id: 'dob', message: 'Date of Birth', requiredMessage: 'Date of Birth is required' },
        { id: 'qualifications', message: 'Qualification', requiredMessage: 'Qualification is required' },
        { id: 'address', message: 'Address', requiredMessage: 'Address is required' },
        { id: 'country', message: 'Country', requiredMessage: 'Country is required' },
        { id: 'state', message: 'State', requiredMessage: 'State is required' },
        { id: 'city', message: 'City', requiredMessage: 'City is required' },
        { id: 'pinZip', message: 'Pin/Zip', requiredMessage: 'Pin/Zip is required' }
  ];

  let isFormValid = true;

  for (let field of fields) {
    if (!validateField(field.id, field.message, field.requiredMessage)) {
      isFormValid = false;
    }
  }

  return isFormValid;
}


// reset all required fields

function resetFields() {
  const fields = [
    { id: 'salutation', message: 'Salutation', requiredMessage: 'Salutation is required' },
    { id: 'firstName', message: 'First Name', requiredMessage: 'First Name is required' },
    { id: 'lastName', message: 'Last Name', requiredMessage: 'Last Name is required' },
    { id: 'email', message: 'Email', requiredMessage: 'Email is required' },
    { id: 'phone', message: 'Mobile Number', requiredMessage: 'Mobile Number is required' },
    { id: 'username', message: 'Username', requiredMessage: 'Username is required' },
    { id: 'password', message: 'Password', requiredMessage: 'Password is required' },
    { id: 'dob', message: 'Date of Birth', requiredMessage: 'Date of Birth is required' },
    { id: 'qualifications', message: 'Qualification', requiredMessage: 'Qualification is required' },
    { id: 'address', message: 'Address', requiredMessage: 'Address is required' },
    { id: 'country', message: 'Country', requiredMessage: 'Country is required' },
    { id: 'state', message: 'State', requiredMessage: 'State is required' },
    { id: 'city', message: 'City', requiredMessage: 'City is required' },
    { id: 'pinZip', message: 'Pin/Zip', requiredMessage: 'Pin/Zip is required' }
  ];

  for (let field of fields) {
    const inputField = document.getElementById(field.id);
    const label = inputField.previousElementSibling;
    inputField.style.border = "1px solid #E6E8EB";
    label.innerHTML = field.message;
    label.style.color = "#2B3674";
    label.classList.remove('required');
  }
}


document.getElementById("adduserbtn").addEventListener('click', function (e) {
  e.preventDefault();
  formValidation();
  if (formValidation()) {
    addemployeeOpenToast();// ADD employee toast box
    closeForm(); // FORM close function
    postuser();// POSTING employee to (server)
    overlay.classList.add("active");// ( overlay)
  }
});

document.getElementById("changeemployee").addEventListener('click', function (e) {
  e.preventDefault();
  formValidation();
  if (formValidation()) {
    editEmployeeToastOpen(); // Edit employee toast box
    closeForm();// FORM close function
    editing();// PUT employee to (server)
    overlay.classList.add("active");// ( overlay)
  }
});



// clearing required message clearing

document.getElementById("overlay").addEventListener('click', resetFields);

window.addEventListener('click', (event) => {
  if (!event.target.closest('#FormClearing')) { 
    resetFields();
  }
});


// FORM VALIDATION (START)















// WEBSITE PAGINATION (START)


var indexvalue = 0;
var datas;
var allemployee;
var totalPages;
var itemshow;

var pageul = document.querySelector(".paginationbtn");

var employeePerpage = document.getElementById("employeePerpage");

employeePerpage.addEventListener('change', selectpage);

function selectpage() {
  indexvalue = 0;
  pagination(allemployee);
}

function pagination(employeelist) {
  var itemperpage = parseInt(employeePerpage.value);
  var totalItems = employeelist.length;
  totalPages = Math.ceil(totalItems / itemperpage);

  var currentPageData = employeelist.slice(indexvalue, indexvalue + itemperpage);

  getEmployee(currentPageData);

  renderPagination();
}


function renderPagination() {
  pageul.innerHTML = "";

  var prevButton = document.createElement("li");
  prevButton.className = "previousPage";
  prevButton.innerHTML = '<i class="fa fa-angle-left"></i>';
  prevButton.addEventListener("click", function () {
    if (indexvalue > 0) {
      indexvalue -= parseInt(employeePerpage.value);
      pagination(allemployee);
    }
  });
  pageul.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    var li = document.createElement("li");
    li.textContent = i;
    li.addEventListener("click", function () {
      indexvalue = (i - 1) * parseInt(employeePerpage.value);
      pagination(allemployee);
      updateActivePage(); 
    });
    pageul.appendChild(li);
  }

  var nextButton = document.createElement("li");
  nextButton.className = "nextPage";
  nextButton.innerHTML = '<i class="fa fa-angle-right"></i>';
  nextButton.addEventListener("click", function () {
    if (indexvalue + parseInt(employeePerpage.value) < allemployee.length) {
      indexvalue += parseInt(employeePerpage.value);
      pagination(allemployee);
      updateActivePage(); 
    }
  });
  pageul.appendChild(nextButton);

  updateActivePage(); 
}

// Function to update the active page
function updateActivePage() {
  var paginationList = document.getElementById("paginationList");
  var listItems = paginationList.getElementsByTagName("li");

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove("active");
  }

  listItems[indexvalue / parseInt(employeePerpage.value) + 1].classList.add("active");
}


// WEBSITE PAGINATION (END)






// EMPLOYEE SEARCHING (START)

function searchUser() {
  const search = document.getElementById("searchUser").value.toUpperCase();
  let datafetch = [];

  for (let x = 0; x < allemployee.length; x++) {
    let firstName = allemployee[x].firstName.toUpperCase();
    let lastName = allemployee[x].lastName.toUpperCase();
    let email = allemployee[x].email.toUpperCase();
    let phone = allemployee[x].phone.toString().toUpperCase();
    
    if(firstName.includes(search) || lastName.includes(search) || email.includes(search) || phone.includes(search)){
      datafetch.push(allemployee[x]);
    }
  }

  getEmployee(datafetch);
}

// EMPLOYEE SEARCHING (END)









// FULL TOAST BOX CODE



function addemployeeOpenToast() {
  document.getElementById("addEmployeeToast").classList.add("active")
}

function addemployeeCloseToast() {
  document.getElementById("addEmployeeToast").classList.remove("active")
  employeeGet() ;
  overlay.classList.remove("active");

}



// edit employee toast box


function editEmployeeToastOpen() {
  document.getElementById("editEmployeeToast").classList.add("active");
}


function editEmployeeToastClose() {
document.getElementById("editEmployeeToast").classList.remove("active")
employeeGet() ;
overlay.classList.remove("active");

}




// delete employee toast box


document.getElementById("alert-box-delete").addEventListener("click" , function (e) {
  closealert();
  deleteEmployeeToastOpen(); 
});


function deleteEmployeeToastOpen() {
  document.getElementById("deleteEmployeeToast").classList.add("active");
  overlay.classList.add("active");
 
}

function deleteEmployeeToastClose() {
  document.getElementById("deleteEmployeeToast").classList.remove("active");
  employeeGet(); 
  overlay.classList.remove("active");
}
