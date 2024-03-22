const {
  fn_readFile,
  fn_isEven,
  fn_countConsonants,
  fn_countVowels,
  fn_haveCommonFactors,
  fn_findHighestScoringObject,
} = require("./utils/functions");

// File paths
const driverFilePath = "./data/Drivernames.txt";
const addressFilePath = "./data/StreetAddresses.txt";

async function run() {
  try {
    // get the list of all available drivers and addresses
    const [addresses, drivers] = await Promise.all([
      fn_readFile(addressFilePath),
      fn_readFile(driverFilePath),
    ]);

    let max = 0;
    // keep looping as long as a pair can be matched
    while (
      addresses.length > 0 &&
      drivers.length > 0 &&
      addresses.length === drivers.length
    ) {
      const rankings = [];
      //   loop through the available addresses
      for (let i = 0; i < addresses.length; i++) {
        let result = {
          address: addresses[i],
          addressId: i,
          driver: "",
          driverId: null,
          score: -Infinity,
          drivers: [],
        };

        // loop through the list of drivers available
        for (let z = 0; z < drivers.length; z++) {
          let score = 0;
          //   check if the address is even or add to add the multiplier
          if (fn_isEven(addresses[i]) ? 1.5 : 1) {
            score = fn_countVowels(drivers[z]) * 1.5;
          } else {
            score = fn_countConsonants(drivers[z]);
          }

          // Check if the lengths share common factors
          if (fn_haveCommonFactors(addresses[i].length, drivers[z].length)) {
            // Increase score by 50%
            score *= 1.5;
          }
          //   set the new highest driver and score to this address
          if (score > result.score) {
            result.driver = drivers[z];
            result.score = score;
            result.driverId = z;
          }
        }

        rankings.push(result);
      }
      //   finde the highest scored pair
      const assignment = fn_findHighestScoringObject(rankings);

      console.log(
        `Driver ${assignment.driver} has been assigned to ${assignment.address} with a score of ${assignment.score}`
      );

      //   remove the address and driver that just got paired assigned with the highest score
      addresses.splice(assignment.addressId, 1);
      drivers.splice(assignment.driverId, 1);

      //   add a safe guard to not get into an infanite loop
      max++;
      if (max === 10) {
        break;
      }
    }

    // console.log("score: ", score);
  } catch (err) {
    console.log("Something went wrong", err);
  }
}

run();
