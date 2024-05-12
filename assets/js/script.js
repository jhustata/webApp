<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creatinine Prediction</title>

  <link rel="stylesheet" href="./assets/css/style.css">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>

  <nav class="navbar">
    <h2 class="org-title">Institutional Research & Analytics</h2>
  </nav>

  <div class="menu">
    <a href="#" class="menu-item">Age</a>
    <a href="#" class="menu-item">Gender</a>
    <a href="#" class="menu-item">Race</a>
    <a href="#" class="menu-item">Calculator</a>
  </div>

  <main>
    <div class="main-content">

      <section class="patient-data">

        <div class="calculator-title">
          <h3 class="h3 tech-title">Post-Donation Kidney Function Calculator</h3>
          <p>This calculator predicts 6-month post-donation kidney function for adult individuals considering living kidney donation.</p>
        </div>

        <div id="rectangle">
          <p class="results-description" id="predicted-creatinine"><span id="predicted-creatinine-result"></span><span style="font-size: 20px; font-weight: 100;"> mg/dL</span></p>
          <p>Predicted 6-month post-donation creatinine</p>
        </div>
        <div id="rectangle">
          <p class="results-description" id="expected-eGFRcr"><span id="expected-eGFRcr-result"></span><span style="font-size: 20px; font-weight: 100;"> mL/min/1.73m<sup>2</sup></span></p>
          <p>Expected 6-month post-donation eGFRcr</p>
        </div>

        <form id="myForm">
          <div class="form-field input-group mb-3">
            <label class="form-field-label" for="cars">Creatinine:</label>
            <span class="input-field">
              <input class="select-field" required type="number" id="creatinine" value="creatinine" name="creatinine" min="0.30" max="1.50" step="0.01">
              <span class="input-group-text" id="basic-addon2">mg/dL</span>
            </span>
          </div>

          <div class="form-field input-group mb-3">
            <label class="form-field-label" for="cars">Age:</label>
            <span class="input-field">
              <input class="select-field" required type="number" id="age" value="age" name="age" min="18" max="85" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
              <span class="input-group-text" id="basic-addon2">Years</span>
            </span>
          </div>

          <div class="form-field">            
            <label class="form-field-label" for="cars">Sex:</label>
            <div class="button-bar gender">
              <a class="button button-male active" type="button" value="male" onclick="setActiveGender('male')">Male</a>
              <a class="button button-female" type="button" value="female" onclick="setActiveGender('female')">Female</a>
            </div>
          </div>

          <div class="form-field input-group mb-3">
            <label class="form-field-label" for="cars">BMI:</label>
            <span class="input-field">
              <input class="select-field" required type="number" id="bmi" value="bmi" title="Please enter a valid integer value."   name="bmi" min="15" max="40" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
              <span class="input-group-text" id="basic-addon2">kg/m<sup>2</sup></span>
            </span>
          </div>

          <div class="form-field input-group mb-3">
            <label class="form-field-label" for="cars">Height:</label>
            <span class="input-field">
              <input class="select-field" required type="number" id="height" value="height" name="height" min="1.2" max="2.1" step="0.01">
              <span class="input-group-text" id="basic-addon2">Meters</span>
            </span>
          </div>

          <div class="form-field">            
            <label class="form-field-label" for="cars">Anti-hypertensive Therapy:</label>
            <div class="button-bar hypertension">
              <a class="button button-noMedication active" onclick="setActiveHypertension('noMedication')">No Anti-hypertensive Therapy</a>
              <a class="button button-medication" onclick="setActiveHypertension('medication')">Anti-hypertensive Therapy</a>
            </div>
          </div>

          <div class="form-field-button">
            <button class="submit-button" type="button" onclick="onSubmit(event)" >Calculate</button>
          </div>

          <div class="button-bar footer">
            <a class="button button-model active" onclick="footerDescription('model')">Model Insights</a>
            <a class="button button-discussion" onclick="footerDescription('discussion')">Discussion</a>
          </div>

          <p class="model-insights-description" id="model-insights-description">
            This model is intended for adult individuals considering living kidney donation. It provides a predicted 6-month post-donation serum creatinine and an expected eGFR calculated based on the predicted serum creatinine using the race-free creatinine-based equation (CKD-EPI 2021).
            <br>
            <br>
            The population used for this study included adult individuals considering living kidney donation. Individuals with missing covariate data or with <30 mL/min/1.73m² eGFRcr were excluded.
          </p>

          <p class="discussion-description" id="discussion-description">
            In the discussion, we compare the performance of this model with other models in the literature and provide insights into its potential impact on clinical practice.
          </p>

        </form>
      </section>

      <section class="mortality-risk">
        <h3 class="h3">Calculate Mortality Risk</h3>
        <button id="calculate-risk-button">Calculate</button>
        <pre id="mortality-risk-results"></pre>
      </section>
    </div>
  </main>

  <footer>
    <p>&copy; 2024 Institution Research & Analytics. All Rights Reserved.</p>
  </footer>

  <script>
    // Your JavaScript code here
    // Updated JavaScript code
    'use strict';

    var gender = 'male';
    var race = 'white';
    var hypertension = 'noMedication';

    function setActiveGender(type) {
      gender = type;
      var buttons = document.querySelectorAll('.gender a');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      document.querySelector('.button-' + type).classList.add('active');
    }

    function setActiveRace(type) {
      race = type;
      var buttons = document.querySelectorAll('.race a');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      document.querySelector('.button-' + type).classList.add('active');
    }

    function setActiveHypertension(type) {
      hypertension = type;
      var buttons = document.querySelectorAll('.hypertension a');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      document.querySelector('.button-' + type).classList.add('active');
    }

    function onSubmit(event) {
      var form = document.getElementById("myForm");
      if (form.checkValidity()) {
        document.getElementById("expected-eGFRcr").style.display = 'block';
        document.getElementById("predicted-creatinine").style.display = 'block';
      } else {
        document.getElementById("expected-eGFRcr").style.display = 'none';
        document.getElementById("predicted-creatinine").style.display = 'none';
        form.reportValidity();
        return;
      }

      var age = Number(document.getElementById("age").value);
      var creatinine = Number(document.getElementById("creatinine").value);
      var bmi = Number(document.getElementById("bmi").value);
      var height = Number(document.getElementById("height").value);

      calculateDonorRisk(creatinine, gender, bmi, age, height, hypertension);
    }

    function calculateDonorRisk(predonationCreatinine, gender, BMI, age, height, hypertension) {
      const maleCoefficient = gender == 'male' ? 1 : 0;
      const hypertensionCoefficient = hypertension == 'noMedication' ? 0 : 1;
      const predonationCreatinineCoefficientSeven = predonationCreatinine > 0.7 ? 1 : 0;
      const predonationCreatinineCoefficientNine = predonationCreatinine > 0.9 ? 1 : 0;
      const BMI30Term = BMI > 30 ? 1 : 0;
      const age55Term = age > 55 ? 1 : 0;

      const predictedCreatinine =
        0.0600344 + ((0.8191583 + (-0.3593172 * maleCoefficient)) * predonationCreatinine) + ((0.1311153 + (0.4733182 * maleCoefficient)) * (predonationCreatinine - 0.7) * predonationCreatinineCoefficientSeven) + (-0.1581432 * (predonationCreatinine - 0.9) * predonationCreatinineCoefficientNine) + 0.3429115 * maleCoefficient + 0.0034174 * BMI + (-0.0025009 * (BMI - 30) * BMI30Term) + (0.0024177 * age) + (-0.0007185 * (age - 55) * age55Term) + (0.12903 * height) + (0.0074556 * hypertensionCoefficient);

      const kCoefficient = gender == 'male' ? 0.9 : 0.7;
      const alphaCoefficient = gender == 'male' ? -0.302 : 0.241;
      const eGFRcrCoefficient = gender == 'male' ? 1 : 1.012;
      const constant = 142;
      const eGFRcrMin = Math.min(predictedCreatinine / kCoefficient, 1);
      const eGFRcrMax = Math.max(predictedCreatinine / kCoefficient, 1);
      const powerMin = Math.pow(eGFRcrMin, alphaCoefficient);
      const powerMax = Math.pow(eGFRcrMax, -1.2);
      const ageCoefficient = Math.pow(0.9938, age) * eGFRcrCoefficient;
      const expectedeGFRcr = constant * powerMin * powerMax * ageCoefficient;

      document.getElementById("predicted-creatinine-result").innerText = predictedCreatinine.toFixed(2);
      document.getElementById("expected-eGFRcr-result").innerText = expectedeGFRcr.toFixed(0);
    }

    function calculateMortalityRisk() {
      const scenarioVector = [40, gender === 'male' ? 1 : 0, race === 'white' ? 1 : 0, race === 'black' ? 0 : 1, race === 'hispanic' ? 0 : 1];
      const beta = [1.1, 0.4, 0, 1.79, -0.05];
      const s0 = [0.99, 0.93, 0.86, 0.77, 0.71, 0.64, 0.56];
      const timePoints = [0, 5, 10, 15, 20, 25, 30];

      const logHR = beta.reduce((acc, curr, index) => acc + (curr * scenarioVector[index]), 0);
      const HR = Math.exp(logHR);
      const f0 = s0.map(s => (1 - s) * 100);
      const f1 = f0.map((f, index) => f * Math.exp(logHR));
      const riskResults = timePoints.map((time, index) => `Risk at ${time} years: ${f1[index].toFixed(2)}%`);
      document.getElementById("mortality-risk-results").innerText = riskResults.join('\n');
    }

    function footerDescription(type) {
      var buttons = document.querySelectorAll('.footer a');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      document.querySelector('.button-' + type).classList.add('active');

      if (type === 'model') {
        document.getElementById("discussion-description").style.display = 'none';
        document.getElementById("model-insights-description").style.display = 'block';
      } else {
        document.getElementById("discussion-description").style.display = 'block';
        document.getElementById("model-insights-description").style.display = 'none';
      }
    }

    document.getElementById("expected-eGFRcr").style.display = 'none';
    document.getElementById("predicted-creatinine").style.display = 'none';
    document.getElementById("discussion-description").style.display = 'none';

    document.getElementById("calculate-risk-button").addEventListener("click", calculateMortalityRisk);
  </script>

</body>

</html>
