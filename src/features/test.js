const constants = require('../node/constants');

function NSECall(index) {
  return (async (index) =>
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        const stock = constants.allStocks1[index];
        console.log('Called--1', stock.symbol);
        if (index + 1 < constants.allStocks1.length) {
          NSECall(++index);
        }
        resolve('foo', index);
      }, 1000);
    }))(index);
}

function test() {
  //let stock = constants.allStocks1[i];
  //const callPromise = NSECall();

  const response = NSECall(0);
}

test();
