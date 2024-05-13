'use strict';

var scenarioVector = [1, 0, 0]; // Default to living donors scenario

function selectScenario(scenario) {
  switch (scenario) {
    case 'livingDonors':
      scenarioVector = [1, 0, 0];
      break;
    case 'healthyNonDonors':
      scenarioVector = [0, 1, 0];
      break;
    case 'generalPopulation':
      scenarioVector = [0, 0, 1];
      break;
    default:
      scenarioVector = [1, 0, 0];
  }
}

function calculateMortalityRisk() {
  const beta = [/* Insert beta coefficients for each scenario here */];
  const s0 = [0.99, 0.93, 0.86, 0.77, 0.71, 0.64, 0.56];
  const timePoints = [0, 5, 10, 15, 20, 25, 30];
  const logHR = beta.reduce((acc, curr, index) => acc + (curr * scenarioVector[index]), 0);
  const f0 = s0.map(s => (1 - s) * 100);
  const f1 = f0.map((f, index) => f * Math.exp(logHR));
  const riskResults = timePoints.map((time, index) => `Risk at ${time} years: ${f1[index].toFixed(2)}%`);
  document.getElementById("mortality-risk-results").innerText = riskResults.join('\n');
}

document.getElementById("calculate-risk-button").addEventListener("click", calculateMortalityRisk);
