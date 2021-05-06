module.exports = {
  name: 'monte',
  description: 'Run a Monte Carlo Simulation!',
  execute(msg, args) {
    msg.channel.send(`running a monte carlo simulations...
    Mice: ${args[0]}
    n: ${args[1]}
    probability: ${args[2]}`);
  },
};
