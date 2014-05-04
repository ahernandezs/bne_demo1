'use strict';

angular.module('bnePaymentsOldFashionedApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

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

    $scope.interbankPayments = [];
		$scope.payingAccounts = [];
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
      console.log($scope.thirdDefaultData);
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
				source: undefined,
				target: undefined,
				date: $scope.getCurrentDate(),
				hourSelection: $scope.hoursCombo[0]
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
			}

			$scope.thirdpayingAccounts.push(firstPayment);
		};

    // setup

    $scope.addTemplate();

		for(var i = 0; i < 5; i++) {
			$scope.addThirdPayment();
		}


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

			//if($scope.payingAccounts.length < 1) {
			//	$scope.paymentConfirmation = false;
			//	$scope.dashboard = true;
			//}
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
	}]);
