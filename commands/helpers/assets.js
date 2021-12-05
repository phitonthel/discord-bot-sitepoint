

class Helper {

  static calculateAssets(data) {
    let total = 0
    data.assets.forEach(item => {
      total += +item.price
    });
    return total
  }

  static calculateLiabilitites(data) {
    let total = 0
    data.liabilities.forEach(item => {
      total += +item.price
    });
    return total
  }

  static createSummary(data) {
    const summary = {
      assets: [],
      liabilities: []
    }

    summary.assets = data.assets.map((item) => {
      return `${item.id} | ${item.name} | ${item.price}`
    })
 
    summary.liabilities = data.liabilities.map((item) => {
      return `${item.id} | ${item.name} | ${item.price}`
    })

    summary.totalAssets = this.calculateAssets(data)
    summary.totalLiabilities = this.calculateLiabilitites(data)
    summary.perPerson = ( summary.totalAssets - summary.totalLiabilities) / 5

    return summary
  }

  static createSummaryWithAuthor(data) {
    const summary = {
      assets: [],
      liabilities: []
    }

    summary.assets = data.assets.map((item) => {
      return `${item.id} | ${item.name} | ${item.price} | ${item.author}`
    })

    summary.liabilities = data.liabilities.map((item) => {
      return `${item.id} | ${item.name} | ${item.price} | ${item.author}`
    })

    summary.totalAssets = this.calculateAssets(data)
    summary.totalLiabilities = this.calculateLiabilitites(data)
    summary.perPerson = ( summary.totalAssets - summary.totalLiabilities) / 5

    return summary
  }

  static createSummarySSD (data) {
    const messages = {
      Alvin_Jodi: 0,
      Bgskara: 0,
      phitonthel: 0,
      odw: 0
    }

    data.assets.forEach(item => {
      if (item.name == 'SSD') {
        messages[item.author] ++
      }
    });
    
    const numberOfLeechedMap = data.liabilities.length - 1

    for (const player in messages) {
      if (Object.hasOwnProperty.call(messages, player)) {
        const numberOfSSD = messages[player];
        messages[player] = `${numberOfSSD}/${numberOfLeechedMap} (${(numberOfSSD*100/numberOfLeechedMap).toFixed(2)}%)`
      }
    }

    // add total
    messages.totalMap = numberOfLeechedMap

    return messages
  }
}

module.exports = Helper