function generateMatrix() {
  //fungsi generate input matriks
  const size = document.getElementById("size").value; //mengambil value dari input dengan id size
  const matrixInput = document.getElementById("matrixInput"); //
  matrixInput.innerHTML = "";

  const table = document.createElement("table");
  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j <= size; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  matrixInput.appendChild(table);
}

function printMatrix(matrix) {
  let html = '<table border="1">';
  for (let row of matrix) {
    html += "<tr>";
    for (let value of row) {
      html += `<td>${value.toFixed(0)}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  return html;
}

function gaussElimination(matrix, steps) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    // Make the diagonal contain all 1's
    const factor = matrix[i][i];
    for (let j = i; j <= n; j++) {
      matrix[i][j] /= factor;
    }
    steps.innerHTML += `<p>B${i + 1}/${factor.toFixed(0)}</p>`;
    steps.innerHTML += printMatrix(matrix);

    // Make the other elements in the column 0
    for (let k = i + 1; k < n; k++) {
      const factor = matrix[k][i];
      for (let j = i; j <= n; j++) {
        matrix[k][j] -= factor * matrix[i][j];
      }
      steps.innerHTML += `<p>B${k + 1}-(${factor.toFixed(0)}*B ${i + 1})</p>`;
      steps.innerHTML += printMatrix(matrix);
    }
  }
  return matrix;
}

function gaussJordanElimination(matrix, steps) {
  const n = matrix.length;
  // Reduce to RREF after Gauss Elimination
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      const factor = matrix[j][i];
      for (let k = n; k >= i; k--) {
        matrix[j][k] -= factor * matrix[i][k];
      }
      steps.innerHTML += `<p>B ${j + 1}-(${factor.toFixed(0)}*B${i + 1})</p>`;
      steps.innerHTML += printMatrix(matrix);
    }
  }
  return matrix;
}

function performElimination() {
  const size = document.getElementById("size").value;
  const matrixInput = document
    .getElementById("matrixInput")
    .getElementsByTagName("input");
  const matrix = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j <= size; j++) {
      row.push(parseFloat(matrixInput[i * (parseInt(size) + 1) + j].value));
    }
    matrix.push(row);
  }

  const gaussSteps = document.getElementById("gaussSteps");
  const gaussJordanSteps = document.getElementById("gaussJordanSteps");
  gaussSteps.innerHTML = "<h2>Gauss Elimination Steps:</h2>";
  gaussJordanSteps.innerHTML = "<h2>Gauss-Jordan Elimination Steps:</h2>";

  const gaussMatrix = matrix.map((row) => row.slice());
  const resultGauss = gaussElimination(gaussMatrix, gaussSteps);

  const resultGaussJordan = gaussJordanElimination(
    resultGauss,
    gaussJordanSteps
  );

  gaussJordanSteps.innerHTML += "<h2>Final Reduced Row Echelon Form:</h2>";
  gaussJordanSteps.innerHTML += printMatrix(resultGaussJordan);
}
