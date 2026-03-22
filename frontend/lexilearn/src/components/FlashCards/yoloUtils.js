import * as tf from '@tensorflow/tfjs';

const yolov8Classes = ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"];

export const loadYoloModel = async () => {
  await tf.setBackend('webgl');
  await tf.ready();
  // Using public yolov8n web model
  const model = await tf.loadGraphModel('https://raw.githubusercontent.com/Hyuto/yolov8-tfjs/master/public/yolov8n_web_model/model.json');
  return model;
};

export const detectYolo = async (model, video) => {
  const inputSize = 640;
  
  // 1. Preprocessing
  const [input, ratio] = tf.tidy(() => {
    const img = tf.browser.fromPixels(video);
    const [h, w] = img.shape.slice(0, 2);
    const maxSize = Math.max(w, h);
    const imgPadded = img.pad([[0, maxSize - h], [0, maxSize - w], [0, 0]]);
    return [
      tf.image.resizeBilinear(imgPadded, [inputSize, inputSize]).div(255.0).expandDims(0),
      maxSize / inputSize
    ];
  });

  // 2. Inference
  const res = await model.executeAsync(input);
  
  // 3. Postprocessing
  const [boxes, nmsBoxes, scores, classes] = tf.tidy(() => {
    const transRes = res.shape[1] === 84 ? res.transpose([0, 2, 1]) : res; 

    // Boxes
    const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // w
    const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // h
    const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // cx - w/2
    const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // cy - h/2
    const x2 = tf.add(x1, w);
    const y2 = tf.add(y1, h);

    const boxes = tf.concat([x1, y1, w, h], 2).squeeze(); // [8400, 4] for drawing
    const nmsBoxes = tf.concat([y1, x1, y2, x2], 2).squeeze(); // [8400, 4] for NMS
    
    // Scores and Classes
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, 80]).squeeze(); // [8400, 80]
    const scores = rawScores.max(1); // [8400]
    const classes = rawScores.argMax(1); // [8400]
    
    return [boxes, nmsBoxes, scores, classes];
  });

  // Run Non-Max Suppression
  const nmsIndices = await tf.image.nonMaxSuppressionAsync(nmsBoxes, scores, 5, 0.45, 0.25);
  
  const boxesData = boxes.arraySync();
  const scoresData = scores.arraySync();
  const classesData = classes.arraySync();
  const indicesData = nmsIndices.arraySync();
  
  tf.dispose([input, res, boxes, nmsBoxes, scores, classes, nmsIndices]);
  
  // 4. Map back to original image
  const detections = indicesData.map((i) => {
    let [x, y, w, h] = boxesData[i];
    return {
      bbox: [x * ratio, y * ratio, w * ratio, h * ratio],
      class: yolov8Classes[classesData[i]],
      score: scoresData[i]
    };
  });

  return detections;
};
