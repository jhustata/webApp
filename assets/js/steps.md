To add the functionality for calculating the 30-year risk of mortality based on user input (age, sex, and race) using the provided coefficient vector `beta` and survival function `s0`, you can modify the existing script. Here's the updated script:

```javascript
'use strict';

// Existing code...

function calculateMortalityRisk() {
  // Scenario vector X: (40, 1, 1, 0, 0) - 40yo, male, white, not black, not hispanic
  const scenarioVector = [40, 1, 1, 0, 0];
  const beta = [1.1, 0.4, 0, 1.79, -0.05];
  const s0 = [0.99, 0.93, 0.86, 0.77, 0.71, 0.64, 0.56];
  const timePoints = [0, 5, 10, 15, 20, 25, 30];

  // Calculate log hazard ratio
  const logHR = beta.reduce((acc, curr, index) => acc + (curr * scenarioVector[index]), 0);

  // Calculate hazard ratio
  const HR = Math.exp(logHR);

  // Calculate risk over time for the scenario
  const f0 = s0.map(s => (1 - s) * 100);
  const f1 = f0.map((f, index) => f * Math.exp(logHR));

  // Display the 30-year risk of mortality at time points 0, 5, 10, 15, 20, 25, 30
  const riskResults = timePoints.map((time, index) => `Risk at ${time} years: ${f1[index].toFixed(2)}%`);
  console.log(riskResults.join('\n'));
}

// Existing code...

// Add an event listener for the "Calculate Mortality Risk" button
document.getElementById("calculate-risk-button").addEventListener("click", calculateMortalityRisk);

```

This script calculates the log hazard ratio based on the scenario vector `X` and the coefficient vector `beta`. It then calculates the hazard ratio `HR` and uses the survival function `s0` to calculate the risk of mortality over time `f1`. Finally, it logs the 30-year risk of mortality at the specified time points. You can add this to the existing JavaScript to complete the functionality.
