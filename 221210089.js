function estimatePi(numSamples) {

    let insideCircle = 0;
  
    for (let i = 0; i < numSamples; i++) {


      // Random x coordinate between 0 and 1
      const x = Math.random(); 

      const y = Math.random();

      const distance = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2);
  
      if (distance <= 0.5) {

        insideCircle++;

      }
    }
    const estimatedPi = (insideCircle / numSamples) * 4
    return estimatedPi;
  }
  
  
const numSamples = 1000000;

const estimatedPi = estimatePi(numSamples);

console.log(`Estimated value of Pi with ${numSamples} 

samples: ${estimatedPi}`);

