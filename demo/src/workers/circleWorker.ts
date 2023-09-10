export const circleWorkerCode = `
self.onmessage = (event) => {
  //Define function
  const generateCircleData = (n) => {
    const data = [];
    const labels = [];
    for (let i = 0; i < n / 2; i++) {
      const r = Math.random() * 2;
      const t = Math.random() * 2 * Math.PI;
      data.push([r * Math.sin(t), r * Math.cos(t)]);
      labels.push(1);
    }
    for (let i = 0; i < n / 2; i++) {
      const r = Math.random() * 2.0 + 3.0;
      const t = (2 * Math.PI * i) / 50.0;
      data.push([r * Math.sin(t), r * Math.cos(t)]);
      labels.push(-1);
    }
    return {
      data, 
      labels
    }
  }

  //Generate data
  const numDataPoints = event.data;
  let result = generateCircleData(numDataPoints);

  //Shuffle result
  /*for (let i = result.data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result.data[i], result.data[j]] = [result.data[j], result.data[i]];
    [result.labels[i], result.labels[j]] = [result.labels[j], result.labels[i]]
  } */
  self.postMessage(result);
}
`;


