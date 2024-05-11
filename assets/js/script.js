let s0_nondonor; // Assume this variable holds the survival function from 0 to 1
let b_nondonor; // Assume this variable holds the beta coefficients from Cox regression
let SV_nondonor; // Assume this variable holds the scenario vector

// Read CSV files and extract relevant data
function readCSVFiles() {
  Promise.all([
    fetch('path/to/s0_nondonor.csv').then(response => response.text()),
    fetch('path/to/b_nondonor.csv').then(response => response.text()),
    fetch('path/to/SV_nondonor.csv').then(response => response.text())
  ]).then(([s0_nondonor_csv, b_nondonor_csv, SV_nondonor_csv]) => {
    // Parse CSV data
    s0_nondonor = parseCSV(s0_nondonor_csv);
    b_nondonor = parseCSV(b_nondonor_csv);
    SV_nondonor = parseCSV(SV_nondonor_csv);

    // Assuming s0_nondonor contains _d, _t, and s0_nondonor values
    // Extract these values from SV_nondonor as needed

    // Assuming b_nondonor contains the beta coefficients
    // Extract these coefficients as needed

    // Calculate cumulative incidence
    calculateCumulativeIncidence();
  }).catch(error => {
    console.error('Error loading CSV files:', error);
  });
}

// Calculate Hazard Ratio (HR)
function calculateHR() {
  // Transpose b_nondonor
  let b_transpose = transposeMatrix(b_nondonor);

  // Calculate HR as the exponential of the dot product of SV_nondonor and b_nondonor
  let HR = 0;
  for (let i = 0; i < SV_nondonor.length; i++) {
    HR += SV_nondonor[i] * b_transpose[i];
  }
  HR = Math.exp(HR);
  return HR;
}

// Calculate Cumulative Incidence
function calculateCumulativeIncidence() {
  // Calculate f0_nondonor
  const f0_nondonor = (1 - s0_nondonor) * 100;

  // Calculate HR
  const HR = calculateHR();

  // Calculate f1_nondonor = f0_nondonor * HR
  const f1_nondonor = f0_nondonor * HR;

  // Update UI to display f1_nondonor as the cumulative incidence curve
  updateUI(f1_nondonor);
}

// Function to transpose a matrix
function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Function to parse CSV data into an array of arrays
function parseCSV(csv) {
  return csv.split('\n').map(row => row.split(','));
}

// Example function to update the UI with the calculated cumulative incidence
function updateUI(cumulativeIncidence) {
  console.log('Cumulative Incidence:', cumulativeIncidence);
}

// Function to handle form submission
function onSubmit(event) {
  event.preventDefault();
  readCSVFiles();
}

// Add event listener to form submission
document.getElementById("myForm").addEventListener("submit", onSubmit);
