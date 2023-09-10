import { Value, v } from "../../../micrograd/engine";

interface Data {
  data: number[][];
  labels: number[];
}

interface DataValues {
  dataValues: Value[][],
  labelValues: Value[],
}

export const generateCircleData = (
  n: number, 
): Data => {
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

export const convertDataToValue = (data: Data): DataValues => {
  const dataValues = data.data.map((dat)=> {
    return dat.map((d) => {
      return v(d);
    })
  })
  const labelValues = data.labels.map((label) => {
    return v(label);
  })
  return {
    dataValues,
    labelValues,
  }
}

