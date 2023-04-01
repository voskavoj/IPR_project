const form = document.querySelector("form")

form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting

  const name = document.querySelector('#firstName').value;
  console.log(name)
  const lastname = document.querySelector('#lastName').value;
  console.log(lastname)
  const fathername = document.querySelector('#fatherName').value;
  console.log(fathername)
  const gender = document.querySelector('#gender').value;
  console.log(gender)
  const birthdate = document.querySelector('#birthdate').value;
  console.log(birthdate)
  const cowork = document.querySelector('#cowork').value;
  

  

});