//your JS code here. If required.
// Select the table body
const output = document.getElementById("output");

// Initially show loading row
output.innerHTML = `
  <tr>
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Function to create a promise that resolves after a random delay between 1–3 seconds
function createPromise(promiseName) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2 + 1; // Random between 1 and 3
    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const timeTaken = ((end - start) / 1000).toFixed(3);
      resolve({ name: promiseName, time: parseFloat(timeTaken) });
    }, delay * 1000);
  });
}

// Create 3 promises
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

// Start time to calculate total duration
const totalStart = performance.now();

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
  const totalEnd = performance.now();
  const totalTime = ((totalEnd - totalStart) / 1000).toFixed(3);

  // Clear loading message
  output.innerHTML = "";

  // Populate table with each promise result
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.name}</td>
      <td>${res.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total time row (maximum promise time or total elapsed)
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});
