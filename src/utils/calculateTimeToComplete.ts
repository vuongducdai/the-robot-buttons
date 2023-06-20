import { TRobot } from "@/types/robotType";

/**
 * The problem seems like a multi-threaded program with two tasks (robot A and robot B)
 * executed parallel and depends on each other. So we can solve this problem like a
 * multi-threaded program but in a single-threaded manner.
 *
 * With above metaphor, we treat:
 * robot A's actions is thread A
 * robot B's actions is thread B
 *
 * @param {string} input - The sequence of buttons separated by white spaces.
 * @returns {number} Returns the total time needed to complete the run
 */
export const calculateTimeToComplete = (input: string) => {
  // The counter is the total time needed to complete the run
  let counter = 0;

  // currentTimePasses is the total time we spent on a thread at a time.
  let currentTimePassed = 0;

  // lastDestinationType is a flag indicating whether to switch
  // from one thread to other thread.
  let lastDestinationType;

  // The current location of robot A and robot B
  const curLocation = {
    A: 1,
    B: 1,
  };

  // The array of buttons preprocessed from input
  // Example: The input "A1 B2" wil turn into: [{type:'A', value: 1}, {type:'B', value: 2}]
  const buttonsArray = preprocessInput(input);

  for (let curDestination of buttonsArray) {
    const { type: destinationType, value: destinationValue } = curDestination;

    // The time needed to travel from current position to the destination + time pressing the button
    const curDistance = Math.abs(curLocation[destinationType as TRobot] - destinationValue) + 1;

    // Update the location of current robot to its next destination
    curLocation[destinationType as TRobot] = destinationValue;

    // The heart of this algorithm
    // The lastDestinationType flag decides when to switch from one thread to the other thread
    // If current destination type is different from previous destination type
    // we switch to the other thread and reset the currentTimePassed.
    if (lastDestinationType !== destinationType) {
      currentTimePassed = Math.max(1, curDistance - currentTimePassed);
      counter += currentTimePassed;
    }
    // If current destination type is the same as previous destination type
    // we stay at current thread and accumulate the currentTimePassed.
    else {
      currentTimePassed += curDistance;
      counter += curDistance;
    }

    // Update lastDestinationType flag
    lastDestinationType = destinationType;
  }
  return counter;
};

const preprocessInput = (input: string) => {
  return input
    .trim()
    .split(" ")
    .map((item) => {
      const type = item[0];
      const value = +item.slice(1);

      if (type !== "A" && type !== "B")
        throw new Error("Invalid button type (only A and B are accepted");

      if (value <= 0 || value > 100) throw new Error("Invalid button number");

      return { type, value };
    });
};
