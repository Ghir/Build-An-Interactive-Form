const title = document.querySelector('#title');
document.querySelector('#other-title').style.display = 'none';

function toggleTitle () {
  if (title.value == 'other') {
    document.querySelector('#other-title').style.display = '';
  }
  else {
    const titleText = document.getElementById('other-title');
    if (titleText) {
      document.querySelector('fieldset').removeChild(titleText)
    }
  }
}

document.querySelector('#title').addEventListener('change', toggleTitle);


function changeColors () {
  const design = document.getElementById('design');
  const colorOptions = document.querySelectorAll('#color option');
  for (let i=0; i<colorOptions.length; i++) {
    colorOptions[i].style.display = 'none'
  }
  if (design.value == 'js puns') {
    colorOptions[0].style.display = '';
    colorOptions[0].setAttribute('selected', '');
    colorOptions[3].removeAttribute('selected');
    colorOptions[1].style.display = '';
    colorOptions[2].style.display = '';
  }
  else {
    colorOptions[3].style.display = '';
    colorOptions[3].setAttribute('selected','');
    colorOptions[0].removeAttribute('selected');
    colorOptions[4].style.display = '';
    colorOptions[5].style.display = '';
  }
}

document.querySelector('#design').addEventListener('change', changeColors);


const activities = document.querySelectorAll('.activities input');
const totalText = document.createElement('span');
document.querySelector('.activities').appendChild(totalText);

function checkActivities () {
  if (activities[1].checked) {
    activities[3].disabled = true;
    activities[3].parentNode.style.color = 'grey';
  }
  if (activities[2].checked) {
    activities[4].disabled = true;
    activities[4].parentNode.style.color = 'grey';
  }
  if (activities[3].checked) {
    activities[1].disabled = true;
    activities[1].parentNode.style.color = 'grey';
  }
  if (activities[4].checked) {
    activities[2].disabled = true;
    activities[2].parentNode.style.color = 'grey';
  }
  if (!activities[1].checked) {
    activities[3].disabled = false;
    activities[3].parentNode.style.color = '#000';
  }
  if (!activities[2].checked) {
    activities[4].disabled = false;
    activities[4].parentNode.style.color = '#000';
  }
  if (!activities[3].checked) {
    activities[1].disabled = false;
    activities[1].parentNode.style.color = '#000';
  }
  if (!activities[4].checked) {
    activities[2].disabled = false;
    activities[2].parentNode.style.color = '#000';
  }
  let tot = Array.from(activities).filter(el => el.checked).length * 100;
  if (activities[0].checked) {
    tot += 100;
  }
  totalText.innerText = `Total: $${tot}`;
}

activities.forEach(el => {el.addEventListener('change', checkActivities)})


/******* PAYMENT ********/

const payment = document.querySelector('#payment');
const creditCardDetails = document.querySelector('#credit-card');
document.querySelector('#paypal-info').style.display = 'none';
document.querySelector('#bitcoin-info').style.display = 'none';


function hidePayment() {
  if (payment.value == 'paypal') {
    creditCardDetails.style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = 'none';
    document.querySelector('#paypal-info').style.display = '';
  }
  if (payment.value == 'bitcoin') {
    creditCardDetails.style.display = 'none';
    document.querySelector('#paypal-info').style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = '';

  }
  if (payment.value == 'credit card') {
    creditCardDetails.style.display = '';
    document.querySelector('#paypal-info').style.display = 'none';
    document.querySelector('#bitcoin-info').style.display = 'none';
  }
}

payment.addEventListener('change', hidePayment);


/******* VALIDATION ********/

const mail = document.querySelector('#mail');
const name = document.querySelector('#name');
const form = document.getElementsByTagName('form')[0];
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

function validate (event) {
  if (!name.validity.valid) {
    event.preventDefault();
    name.style.border = '1px red solid'
    name.previousElementSibling.style.color = 'red';
  }
  else {
    name.style.border = '';
    name.previousElementSibling.style.color = '';
  }
  if (!mail.validity.valid) {
    event.preventDefault();
    mail.style.border = '1px red solid'
    mail.previousElementSibling.style.color = 'red';
  }
  else {
    mail.style.border = '';
    mail.previousElementSibling.style.color = '';
  }
  if (Array.from(activities).filter(el => el.checked).length < 1) {
    event.preventDefault();
    document.querySelector('.activities legend').style.color = 'red';
  }
  else {
    document.querySelector('.activities legend').style.color = '';
  }
  if (!ccNum.validity.valid || isNaN(ccNum.value)) {
    event.preventDefault();
    ccNum.style.setProperty('box-shadow', '0 0 0 1px red')
    ccNum.previousElementSibling.style.color = 'red';
  }
  else {
    ccNum.style.setProperty('box-shadow', '');
    ccNum.previousElementSibling.style.color = '';
  }
  if (!zip.validity.valid) {
    event.preventDefault();
    zip.style.setProperty('box-shadow', '0 0 0 1px red')
    zip.previousElementSibling.style.color = 'red';
  }
  else {
    zip.style.setProperty('box-shadow', '');
    zip.previousElementSibling.style.color = '';
  }
  if (!cvv.validity.valid) {
    event.preventDefault();
    cvv.style.setProperty('box-shadow', '0 0 0 1px red')
    cvv.previousElementSibling.style.color = 'red';
  }
  else {
    cvv.style.setProperty('box-shadow', '');
    cvv.previousElementSibling.style.color = '';
  }
}

form.addEventListener('submit', validate);
