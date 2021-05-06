function monteSim(nTry, attempts, prob) {
  return `${nTry}, ${attempts}, ${prob}`
}

function monteSim2 (iteration, nTry, chanceOfSuccess) {
  let peoples = []
  let arrNumOfSuccess = []
  let arrSuccessBool = []
  let output = ''
  
  for (let i = 0; i < iteration; i++) {
      person = [false, 0]
  
      for (let j = 0; j < nTry; j++) {
          r = Math.random()
          if (r < chanceOfSuccess) {
              person[0] = true
              person[1] += 1          
          }
      }
      arrSuccessBool.push(person[0])
      arrNumOfSuccess.push(person[1])
  }
  
  let sortedArrSuccessBool = arrSuccessBool.sort()
  let sortedArrNumOfSuccess = arrNumOfSuccess.sort()
  
  output += `Succeed: ${sortedArrSuccessBool.filter(x => x === true).length}\n`
  output += `Failed: ${sortedArrSuccessBool.filter(x => x === false).length}\n\n`
  
  output += `Out of ${iteration} people tried ${nTry} time(s):\n`
  let isAngkaAwalUdahMuncul = false
  for (let i = 1; i < 100; i++) {
      let countNumOfSuccess = sortedArrNumOfSuccess.filter(x => x === i).length
      if (countNumOfSuccess != 0) {
          isAngkaAwalUdahMuncul == true
          output += `Got ${i} time(s) ${countNumOfSuccess}, or ${countNumOfSuccess*100/iteration}%\n`
      }
      if (countNumOfSuccess == 0 && isAngkaAwalUdahMuncul == true) {break}
  }
  return '```ts\n' + output + '\n```'
}

module.exports = {
  name: 'monte',
  description: 'Run a Monte Carlo Simulation!',
  execute(msg, args) {
    msg.channel.send(`running a monte carlo simulations...
    Number of People Who Tries: ${args[0]}
    Number of Attempt per Person: : ${args[1]}
    Probability of Success: ${args[2]}`);
    if (args[0] < 10000 && args[1] < 500) {
      msg.channel.send(monteSim2(args[0], args[1], args[2]));
    } else {
      msg.channel.send(`Nigga you wanna destroy my server?`);
    }
  },
};
