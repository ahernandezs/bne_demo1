'use strict';

angular.module('bnePaymentsOldFashionedApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

		$scope.hoursCombo = [
			{name: '0'},
			{name: '1'},
			{name: '2'},
			{name: '3'},
			{name: '4'},
			{name: '5'},
			{name: '6'},
			{name: '7'},
			{name: '8'},
			{name: '9'},
			{name: '10'},
			{name: '11'},
			{name: '12'},
			{name: '14'},
			{name: '15'},
			{name: '16'},
			{name: '17'},
			{name: '18'},
			{name: '19'},
			{name: '20'},
			{name: '21'},
			{name: '22'},
			{name: '23'},
			{name: '24'}
		];

    $scope.minutesCombo = [
      {name: '01'},
      {name: '02'},
      {name: '03'},
      {name: '04'},
      {name: '05'},
      {name: '06'},
      {name: '07'},
      {name: '08'},
      {name: '09'},
      {name: '10'},
      {name: '11'},
      {name: '12'},
      {name: '13'},
      {name: '14'},
      {name: '15'},
      {name: '16'},
      {name: '17'},
      {name: '18'},
      {name: '19'},
      {name: '20'},
      {name: '21'},
      {name: '22'},
      {name: '23'},
      {name: '24'},
      {name: '25'},
      {name: '26'},
      {name: '27'},
      {name: '28'},
      {name: '29'},
      {name: '30'},
      {name: '31'},
      {name: '32'},
      {name: '33'},
      {name: '34'},
      {name: '35'},
      {name: '36'},
      {name: '37'},
      {name: '38'},
      {name: '39'},
      {name: '40'},
      {name: '41'},
      {name: '42'},
      {name: '43'},
      {name: '44'},
      {name: '45'},
      {name: '46'},
      {name: '47'},
      {name: '48'},
      {name: '49'},
      {name: '50'},
      {name: '51'},
      {name: '52'},
      {name: '53'},
      {name: '54'},
      {name: '55'},
      {name: '56'},
      {name: '57'},
      {name: '58'},
      {name: '59'},
      {name: '60'}
    ];
    $scope.interbankPayments = [];
		$scope.thirdpayingAccounts = [];

		$scope.maxAmount = 10000.0;

    $scope.ownDefaultData = [];
    $scope.thirdDefaultData = [];

    $http.get("http://projects.anzen.com.mx:4567/api/accounts?group=true&query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.ownDefaultData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $http.get("http://projects.anzen.com.mx:4567/api/thirdaccounts?query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.thirdDefaultData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $scope.showAccounts = true;

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

		$scope.addPayment = function (payments) {
			if(payments.payingAccounts.length >= 15) return;

			var firstPayment = {
				target: undefined,
        application: 'Mismo día',
				date: $scope.getCurrentDate()
			}

			payments.payingAccounts.push(firstPayment);
		};

    $scope.addTemplate = function () {
			if($scope.interbankPayments.length >= 5) return;

      var template = {
        payingAccounts: []
      }

      $scope.interbankPayments.push(template);

      for(var i = 0; i < 5; i++) {
        $scope.addPayment(template);
      }
    };

    $scope.addPayments = function (payments) {
      for(var i = 0; i < payments.depositAccountNumber; i++) {
        $scope.addPayment(payments);
      }
      payments.depositAccountNumber = "";
    };

		$scope.addThirdPayment = function () {
			if($scope.thirdpayingAccounts.length >= 15) return;

			var firstPayment = {
        enabled: false
			}

			$scope.thirdpayingAccounts.push(firstPayment);
		};

    $scope.addMoreThirdPayments = function () {
      for(var i = 0; i < 5; i++) {
        $scope.addThirdPayment();
      }
    };
    // setup

    $scope.addTemplate();
    $scope.addMoreThirdPayments();


		$scope.getPayingAccountIndex = function(payingAccounts, accountId) {
			for(var i = 0; i < payingAccounts.length; i++) {
				if(payingAccounts[i].id === accountId) {
					return i;
				}
			}

			return -1;
		};

		$scope.removePayingAccount = function(intIndex, index) {
      var payingAccounts = $scope.interbankPayments[intIndex].payingAccounts;

			if(index != -1) {
				payingAccounts.splice(index, 1);
			}

		};

		$scope.btn_openclose = function( btn ) {
			console.log( $(btn) );
			if( $(btn).find('span').html() == '+' ){
				$(btn).find('span').html('-');
			}else{
				$(btn).find('span').html('+');
			}
		};

		$scope.show_tltp = function( elemento , boton ) {
			var izq = ($(boton).offset().left)-($(elemento).width()/2)+9;
			var arriba = $(boton).offset().top;
			console.log(izq);
			$( elemento ).css({
				'left': izq,
				'top': arriba
			}).show();
		};
		$scope.hide_tltp = function( elemento ) {
			$( elemento ).hide();
		};

    $scope.getTotalPayment = function (payments) {
      var sum = 0;
      for(var i = 0; i < payments.payingAccounts.length; i++) {
        var elem = payments.payingAccounts[i].amount;
        if(elem && parseFloat(elem)) {
          sum += parseFloat(elem);
        }
      }

      return sum;
    };


    $("#sortable").sortable();
		$( "input.calendar" ).datepicker({
			buttonImage: "/images/ico-calendar.png",
      		buttonImageOnly: true
		});


    var emptyThird = angular.toJson($scope.thirdpayingAccounts);
    var emptyInterbank = angular.toJson($scope.interbankPayments);

    $scope.$watch('interbankPayments', function (value) {
      if(emptyInterbank !== angular.toJson($scope.interbankPayments)) {
        $scope.allowNext = true;
      }
    }, true);

    $scope.$watch('thirdpayingAccounts', function (value) {
      if(emptyThird !== angular.toJson($scope.thirdpayingAccounts)) {
        $scope.allowNext = true;
      }
    }, true);

    $scope.verifyThirdMode = function (payment, selection) {
      if(selection === 'programming' && payment.remote) {
        payment.remote = false;
      }
      if(selection === 'remote' && payment.programming) {
        payment.programming = false;
      }
      console.log(payment);
    };

    $scope.selectAll = false;

    $scope.selectAllThird = function () {
      $scope.selectAll = !$scope.selectAll;
      for(var i = 0; i < $scope.thirdpayingAccounts.length; i++) {
        $scope.thirdpayingAccounts[i].enabled = $scope.selectAll;
      }
    };

    $scope.validateInterbankPayment = function (payment) {
      if(payment.target && payment.amount)
        return true;
      return false;
    };
	}]);
