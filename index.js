/* Your Code Here */
function createEmployeeRecord([firstName, lastName, title, payPerHour]) {
  let employeeRecord = {};
  employeeRecord.firstName = firstName;
  employeeRecord.familyName = lastName;
  employeeRecord.title = title;
  employeeRecord.payPerHour = payPerHour;
  employeeRecord.timeInEvents = [];
  employeeRecord.timeOutEvents = [];

  return employeeRecord;
}

function createEmployeeRecords(employeeArrays) {
  let employeeRecords = [];
  employeeArrays.map((record) => {
    employeeRecords.push(createEmployeeRecord(record));
  });
  return employeeRecords;
}

let emp1 = ["Byron", "Poodle", "Mascot", 3];
function createTimeInEvent(timestamp) {
  let timeInObj = {
    type: "TimeIn",
    hour: parseInt(timestamp.split(" ")[1]),
    date: timestamp.split(" ")[0],
  };
  this.timeInEvents.push(timeInObj);
  return this;
}

function createTimeOutEvent(timestamp) {
  let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(timestamp.split(" ")[1]),
    date: timestamp.split(" ")[0],
  };
  this.timeOutEvents.push(timeOutObj);
  return this;
}

function hoursWorkedOnDate(date) {
  let hoursWorked;
  let timeInIdx = this.timeInEvents.findIndex(
    (timeCard) => timeCard.date === date
  );
  let timeOutIdx = this.timeOutEvents.findIndex(
    (timeCard) => timeCard.date === date
  );
  let clockInTime = this.timeInEvents[timeInIdx].hour;
  let clockOutTime = this.timeOutEvents[timeOutIdx].hour;

  if (timeInIdx !== -1) {
    hoursWorked = (clockOutTime - clockInTime) / 100;
  } else {
    console.log(`error: time information for ${date} doesn/'t exist`);
  }

  return hoursWorked;
}

function wagesEarnedOnDate(date) {
  let employeeHours = hoursWorkedOnDate.call(this, date);
  let payOwed = employeeHours * this.payPerHour;

  return payOwed;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((x) => x.firstName === firstName);
}


function calculatePayroll(employeeArrays) {
  let payForEachEmployee = [];
  employeeArrays.forEach((employeeObj) => {
    payForEachEmployee.push(allWagesFor.call(employeeObj));
  });
  let payroll = payForEachEmployee.reduce(
    (previousPay, currentPay) => previousPay + currentPay,
    0
  );
  return payroll;
}
