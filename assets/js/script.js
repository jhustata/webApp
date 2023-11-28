'use strict';

var gender = 'male';
var hypertension = 'noMedication';

function setActiveGender(type) {
  gender = type
  var buttons = document.querySelectorAll('.gender a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  document.querySelector('.button-' + type).classList.add('active');
}

document.getElementById("expected-eGFRcr").style.display = 'none'
document.getElementById("predicted-creatinine").style.display = 'none'
document.getElementById("discussion-description").style.display = 'none'

function footerDescription(type) {
  gender = type
  var buttons = document.querySelectorAll('.footer a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  document.querySelector('.button-' + type).classList.add('active');
  console.log(type)

  if (type === 'model') {
    document.getElementById("discussion-description").style.display = 'none'
    document.getElementById("model-insights-description").style.display = 'block'
  } else {
    document.getElementById("discussion-description").style.display = 'block'
    document.getElementById("model-insights-description").style.display = 'none'
  }
}

// function validateInput(input) {
//   // document.getElementById("gfg").
//   var bmi = document.getElementById("bmi");
//   var errorMessageElement = document.getElementById("error-message");
//   if (input.value > 40) {
//     errorMessageElement.textContent = 'Value should be between 15 to 40';
//     bmi.setCustomValidity('Value should be between 15 to 40');o
//   } else if (input.value < 15) {
//     errorMessageElement.textContent = 'Value should be between 15 to 40';
//     bmi.setCustomValidity('Value should be between 15 to 40');o
//   } else {
//     errorMessageElement.textContent = '';
//     bmi.setCustomValidity('');
//   }
//   // if (input.value > 40) {
//   //   input.value = 40;
//   // } else if (input.value < 15) {
//   //   input.value = 15
//   // } else {
//   //   input.value = input.value;

//   // if (input.value === '') {
//   //   input.value = '';
//   // }
//   console.log(input.value)
// }

function setActiveHypertension(type) {
  hypertension = type
  var buttons = document.querySelectorAll('.hypertension a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  document.querySelector('.button-' + type).classList.add('active');
}


function onSubmit (event) {
  // event.preventDefault();
  var form = document.getElementById("myForm");
  if (form.checkValidity()) {
    document.getElementById("expected-eGFRcr").style.display = 'block'
    document.getElementById("predicted-creatinine").style.display = 'block'
  } else {
    document.getElementById("expected-eGFRcr").style.display = 'none'
    document.getElementById("predicted-creatinine").style.display = 'none'
    form.reportValidity();
    return;
  }

  var age = Number(document.getElementById("age").value);
  var creatinine = Number(document.getElementById("creatinine").value);
  var bmi = Number(document.getElementById("bmi").value);
  var height = Number(document.getElementById("height").value);
  // var patient = {
  //   gender: gender,
  //   hypertension: hypertension,
  //   age: age,
  //   creatinine: creatinine,
  //   bmi: bmi,
  //   height: height
  // };

  calculateDonorRisk(creatinine, gender, bmi, age, height, hypertension);
}

function calculateDonorRisk(predonationCreatinine, gender, BMI, age, height, hypertension) {
  const maleCoefficient = gender == 'male' ? 1 : 0;
  const hypertensionCoefficient = hypertension == 'noMedication' ? 0 : 1;
  const predonationCreatinineCoefficientSeven = predonationCreatinine > 0.7 ? 1 : 0;
  const predonationCreatinineCoefficientNine = predonationCreatinine > 0.9 ? 1 : 0;
  const BMI30Term = BMI > 30 ? 1 : 0;
  const age55Term = age > 55 ? 1 : 0;

  const predictedCreatinine  =
      0.0600344 + ((0.8191583 + (-0.3593172 * maleCoefficient)) * predonationCreatinine) + ((0.1311153 + (0.4733182 * maleCoefficient)) *(predonationCreatinine - 0.7) * predonationCreatinineCoefficientSeven) + (-0.1581432*(predonationCreatinine - 0.9) * predonationCreatinineCoefficientNine) + 0.3429115 * maleCoefficient + 0.0034174 * BMI + (-0.0025009 * (BMI - 30 ) * BMI30Term) + (0.0024177 * age) + (-0.0007185 * (age - 55) * age55Term) + (0.12903 * height) + (0.0074556 * hypertensionCoefficient)

  console.log(predictedCreatinine)

  const kCoefficient = gender == 'male' ? 0.9 : 0.7;
  const alphaCoefficient = gender == 'male' ? -0.302 : 0.241;
  const eGFRcrCoefficient = gender == 'male' ? 1 : 1.012;
  const constant = 142;
  const eGFRcrMin = Math.min(predictedCreatinine / kCoefficient, 1);
  const eGFRcrMax = Math.max(predictedCreatinine / kCoefficient, 1);
  const powerMin = Math.pow(eGFRcrMin, alphaCoefficient);
  const powerMax = Math.pow(eGFRcrMax, -1.2);
  const ageCoefficient = Math.pow(0.9938, age) * eGFRcrCoefficient;
  const expectedeGFRcr = constant * powerMin * powerMax * ageCoefficient

  console.log(expectedeGFRcr)

  document.getElementById("predicted-creatinine-result").innerText = predictedCreatinine.toFixed(2)
  document.getElementById("expected-eGFRcr-result").innerText = expectedeGFRcr.toFixed(0)
}