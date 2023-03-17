"use strict";
var app = angular.module("stuApp", []);
app.controller("stuCtrl", function ($scope) {
    var rowIndex = null;
    $scope.contacts = [];
    $scope.stuDetails = {
        fName: "EX:DAVID",
        mName: "EX:J",
        lName: "EX:MILLER",
        mailId: "abc123@gmail.com",
        num: 1234567890,
        dob: undefined,
        genderVal: undefined,
        university: undefined,
    };
    $scope.stuDatabase = function () {
        if ($scope.studformValid()) {
            // update database
            if (rowIndex == null) {
                if ($scope.contacts.length === 0) {
                    $scope.contacts.push($scope.stuDetails);
                    if (confirm("Are you sure to submit your information")) {
                        alert("YOUR FORM WAS SUCESSFULLY SUBMITTED");
                    }
                    $scope.stuDetails = null;
                } //duplicate check while submitting data
                else {
                    var isDuplicate = false;
                    for (var i = 0; i < $scope.contacts.length; i++) {
                        if ($scope.contacts[i].num === $scope.stuDetails.num) {
                            isDuplicate = true;
                        }
                    }
                    if (!isDuplicate) {
                        $scope.contacts.push($scope.stuDetails);
                        if (confirm("Are you sure to submit your information")) {
                            alert("YOUR FORM WAS SUCESSFULLY SUBMITTED");
                        }
                        $scope.stuDetails = null;
                    } else {
                        alert("the register mobile number already registerd");
                    }
                }
                // edit data and duplicate check
            } else {
                var isDuplicate = false;
                for (var i = 0; i < $scope.contacts.length; i++) {
                    if (i !== rowIndex) {
                        if ($scope.contacts[i].num === $scope.stuDetails.num) {
                            isDuplicate = true;
                        }
                    }
                } //updata data into table
                if (!isDuplicate) {
                    $scope.contacts[rowIndex] = angular.copy($scope.stuDetails);
                    $scope.stuDetails = null;
                    rowIndex = null;
                    if (confirm("Are you sure to submit your information")) {
                        alert("YOUR FORM WAS SUCESSFULLY SUBMITTED")
                    }
                } else {
                    alert("the register mobile number already registerd");
                }
            }
        }
    } //binding the data in UI side
    $scope.stuEdit = function (index) {
        rowIndex = index;
        $scope.stuDetails = angular.copy($scope.contacts[rowIndex]);
    }
    //delete data
    $scope.stuDelete = function (index) {
        if (confirm(" Are you sure to delete your information")) {
            $scope.contacts.splice(index, 1);
        }
    }

    //form validation
    $scope.studformValid = function () { //dob validation
        var inputDate = $scope.stuDetails.dob;
        var stuDate = new Date(inputDate);
        var todayDate = new Date();
        var year = todayDate.getFullYear() - stuDate.getFullYear();
        var month = todayDate.getMonth() - stuDate.getMonth();
        var date = todayDate.getDate() - stuDate.getDate();
        if (inputDate == undefined) {
            $scope.errordobMsg = "*please enter your dob";
            return false;
        } else if (month < 0 || (month == 0 && date < 0)) {
            year--;

        }
        if (year < 18) {
            $scope.errordobMsg = "*student age should be above 18";
            return false;
        }
        //gender validation
        if ($scope.stuDetails.genderVal == undefined) {
            $scope.errorgenderMsg = "*please select gender";
            return false;

        }
        //university validation
        if ($scope.stuDetails.university == undefined) {
            $scope.erroruniMsg = "*please select your university";
            return false;
        } else {
            $scope.errordobMsg = "";
            $scope.errorgenderMsg = "";
            $scope.erroruniMsg = "";
            return true;
        }

    }
});