'use strict';

angular.module('bnePaymentsOldFashionedApp')
  .controller('MainCtrl', function ($scope) {

    $scope.hoursCombo = [
      {name: 'Ahora'},
      {name: '0:00'},
      {name: '0:30'},
      {name: '1:00'},
      {name: '1:30'},
      {name: '2:00'},
      {name: '2:30'},
      {name: '3:00'},
      {name: '3:30'},
      {name: '4:00'},
      {name: '4:30'},
      {name: '5:00'},
      {name: '5:30'},
      {name: '6:00'},
      {name: '6:30'},
      {name: '7:00'},
      {name: '7:30'},
      {name: '8:00'},
      {name: '8:30'},
      {name: '9:00'},
      {name: '9:30'},
      {name: '10:00'},
      {name: '10:30'},
      {name: '11:00'},
      {name: '11:30'},
      {name: '12:00'},
      {name: '12:30'},
      {name: '13:00'},
      {name: '13:30'},
      {name: '14:00'},
      {name: '14:30'},
      {name: '15:00'},
      {name: '15:30'},
      {name: '16:00'},
      {name: '16:30'},
      {name: '17:00'},
      {name: '17:30'},
      {name: '18:00'},
      {name: '18:30'},
      {name: '19:00'},
      {name: '19:30'},
      {name: '20:00'},
      {name: '20:30'},
      {name: '21:00'},
      {name: '21:30'},
      {name: '22:00'},
      {name: '22:30'},
      {name: '23:00'},
      {name: '23:30'},
      {name: '24:00'}
    ];

    $scope.payingAccounts = [];

    $scope.maxAmount = 10000.0;

    $scope.getCurrentDate = function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd='0'+dd
      }

      if(mm<10) {
        mm='0'+mm
      }

      today = dd+'/'+mm+'/'+yyyy;

      return today;
    };

    $scope.addPayment = function () {
      if($scope.payingAccounts.length >= 15) return;

      var firstPayment = {
        source: undefined,
        target: undefined,
        date: $scope.getCurrentDate(),
        hourSelection: $scope.hoursCombo[0]
      }

      $scope.payingAccounts.push(firstPayment);
    };

    $scope.addPayment();

    $scope.getPayingAccountIndex = function(accountId) {
      for(var i = 0; i < $scope.payingAccounts.length; i++) {
        if($scope.payingAccounts[i].id === accountId) {
          return i;
        }
      }

      return -1;
    };

    $scope.removePayingAccount = function(accountId) {
      var index = $scope.getPayingAccountIndex(accountId);

      if(index != -1) {
        $scope.payingAccounts.splice(index, 1);
      }

      if($scope.payingAccounts.length < 1) {
        $scope.paymentConfirmation = false;
        $scope.dashboard = true;
      }
    };

  });
