const {
  fn_readFile,
  fn_calculateSuitabilityScore,
  fn_haveCommonFactors,
  fn_findHighestScoringObject,
  fn_parseStreetName,
} = require("./utils/functions");

// File paths
const driverFilePath = "./data/Drivernames.txt";
const addressFilePath = "./data/StreetAddresses.txt";
const assignemnts = [];

async function run() {
  try {
    // Get the list of all available addresses and drivers
    const [addresses, drivers] = await Promise.all([
      fn_readFile(addressFilePath),
      fn_readFile(driverFilePath),
    ]);

    // Set a maximum iteration limit so it will only run for the maximum available addresses
    const maxIterations = addresses.length;
    for (let j = 0; j < maxIterations; j++) {
      // Array to store rankings of drivers for each address
      const rankings = [];

      // Loop through the available addresses
      for (let i = 0; i < addresses.length; i++) {
        // Initialize result object for each address
        const result = {
          address: addresses[i],
          addressId: i,
          driver: "",
          driverId: null,
          score: -Infinity,
          drivers: [],
        };

        // If no more drivers are available, end the program
        if (drivers.length === 0) {
          throw new Error(
            `You do not have any more drivers left to assign to the reamining ${address.length} address(es)`
          );
        }

        // Get just the street name from the full address
        const streetName = fn_parseStreetName(addresses[i]);

        // Loop through the list of available drivers
        for (let z = 0; z < drivers.length; z++) {
          // Get the name of the driver at the current index
          const drivernName = drivers[z];

          // Calculate suitability score for the current driver and addres
          let score = fn_calculateSuitabilityScore(streetName, drivernName);

          // Check if the lengths of street name and driver name share common factors
          if (
            fn_haveCommonFactors(streetName.length, drivernName.trim().length)
          ) {
            // Increase score by 50%
            score *= 1.5;
          }

          // Set the new highest scoring driver and score for this address
          if (score > result.score) {
            result.driver = drivernName;
            result.score = score;
            result.driverId = z;
          }
        }

        // Push the result object to rankings array
        rankings.push(result);
      }

      // Find the highest scored pair
      const assignment = fn_findHighestScoringObject(rankings);

      // Log the assignment details
      console.log(
        `Driver ${assignment.driver} has been assigned to ${assignment.address} with a score of ${assignment.score}`
      );

      // Save the assignments to be used later
      assignemnts.push(
        `Driver ${assignment.driver} has been assigned to ${assignment.address} with a score of ${assignment.score}`
      );

      // Remove the address and driver that just got paired with the highest score
      addresses.splice(assignment.addressId, 1);
      drivers.splice(assignment.driverId, 1);
    }
  } catch (err) {
    // Handle errors
    console.log("Something went wrong", err);
  }
}

run();
