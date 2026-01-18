// as long as the device is on, power_on will ALWAYS be true
let power_on = true;
let recurive_speed_divide = 2 * Math.sqrt(15);
let int_speed = 60;
let status = true;
let temp_speed = 0;
// The text that will be shown before the program continues to run
let intro_output = "This program calculates the speed based on conditions such as detecting the state of the side sensor. Under certain conditoons, the car will change its speed based on the status of these sides.";

function calculateSpeed() {
    if (status == false) {
        // Multiples 2 times the initial speed (60) times the recursive speed (the speed that will always 
        // reappear and never change), esentially making the car move faster
        temp_speed = Math.floor(2 * (int_speed * recurive_speed_divide));
    } else if (status == true) {
        // Divides the initial speed by the recursive speed (which never changes) and divides it by 3, making the
        // car move slower
        temp_speed = Math.floor((int_speed / recurive_speed_divide) / 5);
    }

    // returns the value of the temporary speed, any code after this will NOT run.
    return temp_speed;
}

function getSensorStatus() {
    // gets the boolean status of the censors
    status = cuteBot.trackSide(cuteBot.MbPins.Left, cuteBot.MbEvents.FindLine);
    // returns the value
    return status;
}

function printResults(){
    // prints the results for status
    basic.showString(status.toString());
    // prints the results for the temporary speed
    basic.showNumber(temp_speed);
}

function drive() {
    // allows the car to move at temp_speed which is defined by mathematical problems. Because the time is set 
    // to 1000000000000000, it is virtually impossible to stop
    cuteBot.moveTime(cuteBot.Direction.forward, temp_speed, 1000000000000000)
}

function initiate() {
    // initiates all of the defined functions above

    basic.showString(intro_output);
    getSensorStatus();
    printResults();
    calculateSpeed();
    drive();
}

// runs all of the functions above when power_on is true which is always the case
function run() {
    while (power_on == true) {
        initiate();
    }
}

run();