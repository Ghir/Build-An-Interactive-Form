/* JS-Project-3---Build-An-Interactive-Form

TREEHOUSE TECHDEGREE FULL STACK JAVASCRIPT - PROJECT 3 - BUILD AN INTERACTIVE FORM

What the program does:

It provides interactivity to a web form when registering for a conference. When the form
first loads, the first textfield is highlighted. As the user makes selections in the
form, parts of it are automatically updated. As the user registers for activities at
the conference, the total cost is highlighted below the list. When they select an activity
that conflicts with the time of another activity, the conflicting one is grayed out.
They can pick different payment options and based on what they select, a different message
will appear at the bottom of the page. Finally when they submit the form, if they haven't
provided all the necessary information error messages will appear letting them know what
they got wrong. */


/*==== TITLE ====*/
const title = document.querySelector('#title');
const otherTitle = document.querySelector('#other-title');
// hide 'other title' input first
otherTitle.style.display = 'none';

// hide and show 'other title' input on user selection
function toggleTitle () {
  if (title.value == 'other') {
    otherTitle.style.display = '';
  }
  else {
      otherTitle.style.display = 'none';
  }
}
document.querySelector('#title').addEventListener('change', toggleTitle);

/*==== COLORS ====*/
// hide and show color options based on design selection
function changeColors () {
  document.querySelector('#colors-js-puns').style.display = '';
  // show color selector
  const design = document.getElementById('design');
  const colorOptions = document.querySelectorAll('#color option');
  // hide all options
  for (let i=0; i<colorOptions.length; i++) {
    colorOptions[i].style.display = 'none'
  }
  // show colors matching the selection
  if (design.value == 'js puns') {
    colorOptions[0].style.display = '';
    colorOptions[1].style.display = '';
    colorOptions[2].style.display = '';
    colorOptions[0].setAttribute('selected', '');
    colorOptions[3].removeAttribute('selected');
  }
  else {
    colorOptions[3].style.display = '';
    colorOptions[4].style.display = '';
    colorOptions[5].style.display = '';
    colorOptions[3].setAttribute('selected','');
    colorOptions[0].removeAttribute('selected');
  }
}
// hide color selector first
document.querySelector('#colors-js-puns').style.display = 'none';

document.querySelector('#design').addEventListener('change', changeColors);

/*==== ACTIVITIES ====*/
const activities = document.querySelectorAll('.activities input');
const totalText = document.createElement('span');
document.querySelector('.activities').appendChild(totalText);

function checkActivities () {
  // disable crashing activities
  for (let i=1; i < 3; i++) {
    if (activities[i].checked) {
      activities[i+2].disabled = true;
      activities[i+2].parentNode.style.color = 'grey';
    }
  }
  for (let i = 3; i < 5; i++) {
    if (activities[i].checked) {
      activities[i-2].disabled = true;
      activities[i-2].parentNode.style.color = 'grey';
    }
  }
  for (let i=1; i < 3; i++) {
    if (!activities[i].checked) {
      activities[i+2].disabled = false;
      activities[i+2].parentNode.style.color = '#000';
    }
  }
  for (let i = 3; i < 5; i++) {
    if (!activities[i].checked) {
      activities[i-2].disabled = false;
      activities[i-2].parentNode.style.color = '#000';
    }
  }
  // create array of checked items
  const checkedAct = Array.from(activities).filter(el => el.checked);
  // calculate total price
  let tot = checkedAct.length * 100;
  // take into account different price of the first item
  if (activities[0].checked) {
    tot += 100;
  }
  // show total
  totalText.innerText = `Total: $${tot}`;
}

activities.forEach(el => {el.addEventListener('change', checkActivities)})

/*==== PAYMENT ====*/
const paymentType = document.querySelector('#payment');
const ccDetails = document.querySelector('#credit-card');
document.querySelector('#paypal-info').style.display = 'none';
document.querySelector('#bitcoin-info').style.display = 'none';

// hide and show details based on payment selection
function hidePayment() {
  if (paymentType.value == 'paypal') {
    ccDetails.style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = 'none';
    document.querySelector('#paypal-info').style.display = '';
  }
  else if (paymentType.value == 'bitcoin') {
    ccDetails.style.display = 'none';
    document.querySelector('#paypal-info').style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = '';

  }
  else if (paymentType.value == 'credit card') {
    ccDetails.style.display = '';
    document.querySelector('#paypal-info').style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = 'none';
  }
}

paymentType.addEventListener('change', hidePayment);


/*==== FORM VALIDATION ====*/

const mail = document.querySelector('#mail');
const name = document.querySelector('#name');
const form = document.getElementsByTagName('form')[0];
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const errorMsg = document.createElement('p');
errorMsg.id = 'error';
const zipLabel = document.querySelector('#zipLabel');
const cvvLabel = document.querySelector('#cvvLabel');

// NAME
function validateName (event) {
  if (!name.validity.valid) {
    event.preventDefault();
    name.style.setProperty('box-shadow', '0 0 0 1px red');
    name.previousElementSibling.style.color = 'red';
  }
  else {
    name.style.setProperty('box-shadow', '');
    name.previousElementSibling.style.color = '';
  }
}
// EMAIL
function validateEmail(event) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(mail.value) == false) {
    event.preventDefault();
    mail.style.setProperty('box-shadow', '0 0 0 1px red');
    mail.previousElementSibling.style.color = 'red';
  }
  else {
    mail.style.setProperty('box-shadow', '');
    mail.previousElementSibling.style.color = '';
  }
}
// ACTIVITIES
function validateActivities (event) {
  if (Array.from(activities).filter(el => el.checked).length < 1) {
    event.preventDefault();
    document.querySelector('.activities legend').style.color = 'red';
  }
  else {
    document.querySelector('.activities legend').style.color = '';
  }
}
// PAYMENT
function validatePayment (event) {
  if (paymentType.value == 'credit card') {
    if (ccNum.value == '') {
      event.preventDefault();
      ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
      ccNum.previousElementSibling.style.color = 'red';
      errorMsg.innerText = 'Please enter a credit card number.';
      ccNum.previousElementSibling.appendChild(errorMsg);
      zipLabel.classList.add('adjust');
      cvvLabel.classList.add('adjust');
      zipLabel.classList.remove('adjustPlus');
      cvvLabel.classList.remove('adjustPlus');
    }
    else if (ccNum.value.length < 13 || ccNum.value.length > 16 || isNaN(ccNum.value)) {
      event.preventDefault();
      ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
      ccNum.previousElementSibling.style.color = 'red';
      errorMsg.innerText = 'Please enter a number that is between 13 and 16 digits long.';
      ccNum.previousElementSibling.appendChild(errorMsg);
      zipLabel.classList.remove('adjust');
      cvvLabel.classList.remove('adjust');
      zipLabel.classList.add('adjustPlus');
      cvvLabel.classList.add('adjustPlus');
    }
    else {
      ccNum.style.setProperty('box-shadow', '');
      ccNum.previousElementSibling.style.color = '';
      if (errorMsg) {
        ccNum.previousElementSibling.removeChild(errorMsg);
      }
      zipLabel.classList.remove('adjust');
      cvvLabel.classList.remove('adjust');
      zipLabel.classList.remove('adjustPlus');
      cvvLabel.classList.remove('adjustPlus');
    }
    if (!zip.validity.valid) {
      event.preventDefault();
      zip.style.setProperty('box-shadow', '0 0 0 1px red');
      zip.previousElementSibling.style.color = 'red';
    }
    else {
      zip.style.setProperty('box-shadow', '');
      zip.previousElementSibling.style.color = '';
    }
    if (!cvv.validity.valid) {
      event.preventDefault();
      cvv.style.setProperty('box-shadow', '0 0 0 1px red');
      cvv.previousElementSibling.style.color = 'red';
    }
    else {
      cvv.style.setProperty('box-shadow', '');
      cvv.previousElementSibling.style.color = '';
    }
  }
}

// ALL
function validate (event) {
  validateEmail(event);
  validateActivities(event);
  validateName(event);
  validatePayment(event);
}

// validate form on submit
form.addEventListener('submit', validate);
// real-time validation of email, name, activities
mail.addEventListener('input', validateEmail);
name.addEventListener('input', validateName);
activities.forEach(e => e.addEventListener('change', validateActivities))
