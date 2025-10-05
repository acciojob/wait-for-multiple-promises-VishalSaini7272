// Select the table body
const output = document.getElementById("output");

// Show initial loading message with correct id
output.innerHTML = `
  <tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Function to create a promise that resolves after a random delay (1–3s)
function createPromise(promiseName) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2 + 1; // Random number between 1 and 3 seconds
    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const timeTaken = ((end - start) / 1000).toFixed(3);
      resolve({ name: promiseName, time: timeTaken });
    }, delay * 1000);
  });
}

// Create three promises
const p1 = createPromise("Promise 1");
const p2 = createPromise("Promise 2");
const p3 = createPromise("Promise 3");

// Start time for total duration
const totalStart = performance.now();

// Wait for all promises to resolve
Promise.all([p1, p2, p3]).then((results) => {
  const totalEnd = performance.now();
  const totalTime = ((totalEnd - totalStart) / 1000).toFixed(3);

  // Clear loading message
  output.innerHTML = "";

  // Add rows for each promise
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.name}</td>
      <td>${res.time}</td>
    `;
    output.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});
