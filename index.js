/* Your Code Here */

function createEmployeeRecord(singleEmpArray){
    const singleEmpObj = {
        firstName: singleEmpArray[0],
        familyName: singleEmpArray[1],
        title: singleEmpArray[2],
        payPerHour: singleEmpArray[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
    return singleEmpObj
}

function createEmployeeRecords(manyEmpArray){
    const arrayOfObjects = manyEmpArray.map(array => {
        return createEmployeeRecord(array)
    })
    return arrayOfObjects
}

function createTimeInEvent(dateStamp){
    const timeInObject = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    this.timeInEvents.push(timeInObject)
    return this
}

function createTimeOutEvent(dateStamp){
    const timeOutObject = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    this.timeOutEvents.push(timeOutObject)
    return this
}

function hoursWorkedOnDate(date){
    const timeInHour = this.timeInEvents.find(entry => entry.date === date).hour
    const timeOutHour = this.timeOutEvents.find(entry => entry.date === date).hour
    return (timeOutHour - timeInHour) / 100
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
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
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(manyEmpArray, fName){
    return manyEmpArray.find(emp => emp.firstName === fName)
}

function calculatePayroll(manyEmpArray){
    const totalWages = manyEmpArray.reduce(function(accumulator, element){
        return accumulator + allWagesFor.call(element)
    }, 0)
    return totalWages
}

