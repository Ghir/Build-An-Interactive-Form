// TITLE
const title = document.querySelector('#title'),
  otherTitle = document.querySelector('#other-title');
document.querySelector('#title').addEventListener('change', () => {
  otherTitle.style.display = title.value === 'other' ? 'inline-block' : 'none'
});

// COLORS
function changeColors() {
  document.querySelector('#colors-js-puns').style.display = 'block';
  const design = document.getElementById('design'),
    punsOptions = document.querySelectorAll('.puns'),
    heartOptions = document.querySelectorAll('.heart');

  if (design.value === 'js puns') {
    heartOptions.forEach(option => option.style.display = 'none');
    punsOptions.forEach(option => option.style.display = 'block');
    punsOptions[0].setAttribute('selected', '');
    heartOptions[0].removeAttribute('selected');
  } else {
    punsOptions.forEach(option => option.style.display = 'none');
    heartOptions.forEach(option => option.style.display = 'block');
    heartOptions[0].setAttribute('selected', '');
    punsOptions[0].removeAttribute('selected');
  }
}
document.querySelector('#design').addEventListener('change', changeColors);

// ACTIVITIES
const activities = document.querySelectorAll('.activities input'),
  total = document.querySelector('.total');

activities.forEach((el, i) => {
  el.addEventListener('change', () => {
    if (i === 1 || i === 2) {
      if (el.checked) {
        activities[i + 2].disabled = true;
        activities[i + 2].parentNode.style.color = 'grey';
      } else {
        activities[i + 2].disabled = false;
        activities[i + 2].parentNode.style.color = '#000';
      }
    } else if (i === 3 || i === 4) {
      if (el.checked) {
        activities[i - 2].disabled = true;
        activities[i - 2].parentNode.style.color = 'grey';
      } else {
        activities[i - 2].disabled = false;
        activities[i - 2].parentNode.style.color = '#000';
      }
    }

    const selected = Array.from(activities).filter(el => el.checked);
    let cost = selected.length * 100;
    if (activities[0].checked) {
      cost += 100;
    }

    total.innerText = `Total: $${cost}`;
  })
})

// PAYMENT
const paymentType = document.querySelector('#payment'),
  ccDetails = document.querySelector('#credit-card'),
  paypal = document.querySelector('#paypal-info'),
  bitcoin = document.querySelector('#bitcoin-info');

function hidePayment() {
  if (paymentType.value === 'paypal') {
    ccDetails.style.display = 'none';
    bitcoin.style.display = 'none';
    paypal.style.display = 'block';
  }
  else if (paymentType.value === 'bitcoin') {
    ccDetails.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'block';

  }
  else if (paymentType.value === 'credit card') {
    ccDetails.style.display = 'block';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  }
}
paymentType.addEventListener('change', hidePayment);

// FORM VALIDATION
const mail = document.querySelector('#mail'),
  name = document.querySelector('#name'),
  form = document.querySelector('form'),
  ccNum = document.querySelector('#cc-num'),
  zip = document.querySelector('#zip'),
  cvv = document.querySelector('#cvv'),
  errorMsg = document.createElement('p'),
  zipLabel = document.querySelector('#zipLabel'),
  cvvLabel = document.querySelector('#cvvLabel');
errorMsg.id = 'error';

function validateName(event) {
  if (!name.validity.valid) {
    event.preventDefault();
    name.style.setProperty('box-shadow', '0 0 0 1px red');
    name.previousElementSibling.style.color = 'red';
  } else {
    name.style.setProperty('box-shadow', '');
    name.previousElementSibling.style.color = '';
  }
}

function validateEmail(event) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(mail.value) === false) {
    event.preventDefault();
    mail.style.setProperty('box-shadow', '0 0 0 1px red');
    mail.previousElementSibling.style.color = 'red';
  } else {
    mail.style.setProperty('box-shadow', '');
    mail.previousElementSibling.style.color = '';
  }
}

function validateActivities(event) {
  if (!Array.from(activities).filter(el => el.checked).length) {
    event.preventDefault();
    document.querySelector('.activities legend').style.color = 'red';
  } else {
    document.querySelector('.activities legend').style.color = '';
  }
}

function validatePayment(event) {
  if (paymentType.value !== 'credit card') { return; }

  if (!ccNum.value) {
    event.preventDefault();
    ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
    ccNum.previousElementSibling.style.color = 'red';
    errorMsg.innerText = 'Please enter a credit card number.';
    ccNum.previousElementSibling.appendChild(errorMsg);
    zipLabel.classList.add('adjust');
    cvvLabel.classList.add('adjust');
    zipLabel.classList.remove('adjustPlus');
    cvvLabel.classList.remove('adjustPlus');
  } else if (ccNum.value.length < 13 || ccNum.value.length > 16 || isNaN(ccNum.value)) {
    event.preventDefault();
    ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
    ccNum.previousElementSibling.style.color = 'red';
    errorMsg.innerText = 'Please enter a number that is between 13 and 16 digits long.';
    ccNum.previousElementSibling.appendChild(errorMsg);
    zipLabel.classList.remove('adjust');
    cvvLabel.classList.remove('adjust');
    zipLabel.classList.add('adjustPlus');
    cvvLabel.classList.add('adjustPlus');
  } else {
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
  } else {
    zip.style.setProperty('box-shadow', '');
    zip.previousElementSibling.style.color = '';
  }
  if (!cvv.validity.valid) {
    event.preventDefault();
    cvv.style.setProperty('box-shadow', '0 0 0 1px red');
    cvv.previousElementSibling.style.color = 'red';
  } else {
    cvv.style.setProperty('box-shadow', '');
    cvv.previousElementSibling.style.color = '';
  }
}

form.addEventListener('submit', () => {
  validateEmail(event);
  validateActivities(event);
  validateName(event);
  validatePayment(event);
});
mail.addEventListener('input', validateEmail);
name.addEventListener('input', validateName);
activities.forEach(e => e.addEventListener('change', validateActivities))
