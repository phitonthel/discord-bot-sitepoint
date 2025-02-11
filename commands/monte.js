const { prefix } = require('../config.json');

function monteSim (iteration, nTry, chanceOfSuccess) {
  let arrNumOfSuccess = []
  let arrSuccessBool = []
  let output = ''
  
  for (let i = 0; i < iteration; i++) {
      person = [false, 0]
  
      for (let j = 0; j < nTry; j++) {
          const r = Math.random()
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

  let n_person_succeed = sortedArrSuccessBool.filter(x => x === true).length
  let n_person_failed = sortedArrSuccessBool.filter(x => x === false).length
  
  output += `Succeed: ${n_person_succeed}\n`
  output += `Failed: ${n_person_failed} (${((n_person_failed / iteration) * 100).toFixed(3)}%)\n\n`
  
  output += `Out of ${iteration} people tried ${nTry} time(s):\n`
  let isAngkaAwalUdahMuncul = false
  for (let i = 1; i <= nTry; i++) {
      let countNumOfSuccess = sortedArrNumOfSuccess.filter(x => x === i).length
      if (countNumOfSuccess != 0) {
          isAngkaAwalUdahMuncul == true
          output += `Got ${i} time(s) ${countNumOfSuccess}, or ${countNumOfSuccess*100/iteration}%\n`
      }
      if (countNumOfSuccess == 0 && isAngkaAwalUdahMuncul == true) {break}
  }
  return '```ts\n' + output + '\n```'
}

const desc = `Run a Monte Carlo Simulation!
Takes 3 arguments: 
  <> number_of_tries:number [required]
  <> number_of_attempts:number [required]
  <> probability:number [required]`

module.exports = {
  name: `${prefix}monte`,
  description: desc,
  execute(msg, args) {
    const arg = args[0]

    if (!args[0] || !args[1] || !args[2]) {
      return msg.channel.send(desc)
    }

    msg.channel.send(`running a monte carlo simulations...
    Number of People Who Tries: ${args[0]}
    Number of Attempt per Person: : ${args[1]}
    Probability of Success: ${args[2]}`);
    if (args[0] <= 100000 && args[1] <= 500) {
      msg.channel.send(monteSim(args[0], args[1], args[2]));
    } else {
      msg.channel.send(`Nigga you wanna destroy my server?`);
    }
  },
};
