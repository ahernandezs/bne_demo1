'use strict';

angular.module('bnePaymentsOldFashionedApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', '$anchorScroll', function ($scope, $http, $location, $anchorScroll) {

    $scope.firstObject = {};

		$scope.hoursCombo = [
			{name: '1:00'},
			{name: '2:00'},
			{name: '3:00'},
			{name: '4:00'},
			{name: '5:00'},
			{name: '6:00'},
			{name: '7:00'},
			{name: '8:00'},
			{name: '9:00'},
			{name: '10:00'},
			{name: '11:00'},
			{name: '12:00'},
			{name: '14:00'},
			{name: '15:00'},
			{name: '16:00'},
			{name: '17:00'},
			{name: '18:00'},
			{name: '19:00'},
			{name: '20:00'},
			{name: '21:00'},
			{name: '22:00'},
			{name: '23:00'},
			{name: '24:00'}
		];

    $scope.hoursCombo2 = [
      {name: '9:00'},
      {name: '10:00'},
      {name: '11:00'},
      {name: '12:00'},
      {name: '13:00'},
      {name: '14:00'},
      {name: '15:00'}
    ];

    $scope.minutesCombo = [
      {name: '00'},
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
      {name: '59'}
    ];

    $scope.accountTypes = [
      {id: 1, name: 'Clabe interbancaria'},
      {id: 2, name: 'Tarjeta de débito'},
      {id: 3, name: 'Tarjeta de crédito'}
    ];

    $scope.banks = [
      {id: 1, name: 'BBVA Bancomer'},
      {id: 2, name: 'HSBC'},
      {id: 3, name: 'Banorte'},
      {id: 4, name: 'Scotia Bank'},
      {id: 5, name: 'Santander'}
    ];

    $scope.base_url = "http://projects.anzen.com.mx:4567/api";
		$scope.ownpayingAccounts = [];
		$scope.thirdpayingAccounts = [];
    $scope.interbankPayments = [];
		$scope.orderpayingAccounts = [];

		$scope.maxAmount = 10000.0;

    $scope.ownDefaultData = [];
    $scope.thirdDefaultData = [];
    $scope.ownTargetData = [];
    $scope.interbankTargetData = [];
    $scope.orderTargetData = [];

    $http.get($scope.base_url + "/accounts?group=true&query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.ownDefaultData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $http.get($scope.base_url + "/thirdaccounts?query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.thirdDefaultData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $http.get($scope.base_url + "/accounts?query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.ownTargetData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $http.get($scope.base_url + "/interbank?query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.interbankTargetData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

    $http.get($scope.base_url + "/orders?query=", {}).
      success(function(responseData, status, headers, config) {
      $scope.orderTargetData = responseData;
    }).
      error(function(data, status, headers, config) {
      console.log("error");
    });

		$scope.groups = [];

		$http.get($scope.base_url + "/allgroups", {}).
			success(function(responseData, status, headers, config) {
			$scope.groups = responseData;
		}).
			error(function(data, status, headers, config) {
			console.log("error");
		});

    $scope.groupsSelect = [{'name':'Nuevo grupo'},{'name':'Ver más grupos'},{'name':'-----------------'},{"id":"GR-1-1403543527","type_i":23,"name":"Programadores V1.2 (norte)","creation_date_dt":"2014-06-23T17:12:07Z","last_date_dt":"2014-06-23T17:12:07Z","items_i":10,"total_d":48500.0,"source_rank_i":0,"target_rank_i":0,"_version_":1471722057654861824},{"id":"GR-2-1403543527","type_i":23,"name":"Grupo de diseño","creation_date_dt":"2014-06-23T17:12:07Z","last_date_dt":"2014-06-23T17:12:07Z","items_i":9,"total_d":41000.0,"source_rank_i":0,"target_rank_i":0,"_version_":1471722057768108032},{"id":"GR-3-1403543527","type_i":23,"name":"Ventas area local","creation_date_dt":"2014-06-23T17:12:07Z","last_date_dt":"2014-06-23T17:12:07Z","items_i":5,"total_d":26500.0,"source_rank_i":0,"target_rank_i":0,"_version_":1471722057857236992},{"id":"GR-4-1403543527","type_i":23,"name":"Proveedores","creation_date_dt":"2014-06-23T17:12:07Z","last_date_dt":"2014-06-23T17:12:07Z","items_i":4,"total_d":13000.0,"source_rank_i":0,"target_rank_i":0,"_version_":1471722057955803136},{"id":"GR-5-1403543527","type_i":23,"name":"Programadores V2.2 (sur)","creation_date_dt":"2014-06-23T17:12:07Z","last_date_dt":"2014-06-23T17:12:07Z","items_i":8,"total_d":39000.0,"source_rank_i":0,"target_rank_i":0,"_version_":1471722058118332416}];

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

    $scope.getCurrentTime = function () {
			var today = new Date();

      var hours = today.getHours();
      var minutes = today.getMinutes();

      return hours + ":" + minutes;
    };

		$scope.addThirdPayment = function () {
			if($scope.thirdpayingAccounts.length >= 15) return;
			var firstPayment = {
        enabled: false,
        fiscal: false,
        date: $scope.getCurrentDate()
			}

			$scope.thirdpayingAccounts.push(firstPayment);
		};

    $scope.addMoreThirdPayments = function () {
      $scope.addThirdPayment();
    };

    $scope.addOwnPayment = function () {
      if($scope.ownpayingAccounts.length >= 15) return;

      if($scope.sameAccount){
        var firstPayment = {
          enabled: false,
          date: $scope.getCurrentDate(),
          source: $scope.firstObject.source
        }
      }else{
        var firstPayment = {
          enabled: false,
          date: $scope.getCurrentDate()
        }
      }

      $scope.ownpayingAccounts.push(firstPayment);
    };

    $scope.addMoreOwnPayments = function () {
      $scope.addOwnPayment();
    };

    $scope.addInterbankPayment = function () {
      if($scope.interbankPayments.length >= 15) return;

      var firstPayment = {
        enabled: false,
        date: $scope.getCurrentDate()
      }

      $scope.interbankPayments.push(firstPayment);
    };

    $scope.addMoreInterbankPayments = function () {
      $scope.addInterbankPayment();
    };

    $scope.addOrderPayment = function () {
      if($scope.orderpayingAccounts.length >= 15) return;

      var firstPayment = {
        enabled: false,
        date: $scope.getCurrentDate()
      }

      $scope.orderpayingAccounts.push(firstPayment);
    };

    $scope.addMoreOrderPayments = function () {
      $scope.addOrderPayment();
    };

    $scope.addNewBeneficiary = function () {
      if($scope.newAccounts.length >= 15) return;

      var account = {
        personType: "1"
      }

        $scope.newAccounts.push(account);
    };

    $scope.addGroupPayment = function () {
      if($scope.groupItems.docs.length >= 15) return;

      var firstPayment = {
        enabled: false,
        date: $scope.getCurrentDate()
      }

      $scope.groupItems.docs.push(firstPayment);
    };

    $scope.addMoreGroupPayments = function () {
      $scope.addGroupPayment();
    };

    // setup

    $scope.setup = function () {
		  $scope.ownpayingAccounts = [];
      $scope.interbankPayments = [];
      $scope.thirdpayingAccounts = [];
		  $scope.orderpayingAccounts = [];

      $scope.addMoreThirdPayments();
      for(var i = 0; i < 4; i++) {
        $scope.addMoreOwnPayments();
      }
      $scope.addMoreInterbankPayments();
      $scope.addMoreOrderPayments();
      $scope.collapseOne = true;
      $scope.collapseTwo = false;
      $scope.collapseThree = false;
      $scope.collapseFour = false;
      $scope.collapseFive = false;
      $scope.allowNext = false;
      $scope.multipleInterbank = true;

      $scope.groupsInterbank = false;
      $scope.selectedGroup = undefined;
      $scope.groupItems = [];

      $scope.dynamicPassword = "";

      $scope.newAccounts = [];
      $scope.addNewBeneficiary();
      $scope.addInterbank = false;

      $scope.addToGroupSelect= undefined;
      $scope.newGroupName = "";

      $scope.stepState="capture";
    };

    $scope.setup();

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

    $scope.removePayment = function(accounts, index) {
      if(index != -1) {
        accounts.splice(index, 1);
      }
    };

		$scope.btn_openclose = function( btn ) {
			// console.log( $(btn) );
			if( $(btn).find('span').html() == '+' ){
				$(btn).find('span').html('-');
			}else{
				$(btn).find('span').html('+');
			}
		};

    $scope.show_tltp = function( elemento , boton ) {
      var izq = ($(boton).offset().left)-($(elemento).width()/2)+9;
      var arriba = $(boton).offset().top;
      // console.log(izq);
      $( elemento ).css({
        'left': izq,
        'top': arriba
      }).show();
    };

		$scope.show_tltp_eliminar = function( elemento , boton ) {
			var izq = ($(boton).offset().left)-($(elemento).width()/2)+11;
			var arriba = $(boton).offset().top;
			// console.log(izq);
			$( elemento ).css({
				'left': izq,
				'top': arriba
			}).fadeIn('fast');
		};
		$scope.hide_tltp = function( elemento ) {
			$( elemento ).fadeOut('fast');
		};

    $scope.getTotalPayment = function (payments) {
      var sum = 0;
      for(var i = 0; i < payments.length; i++) {
        var elem = payments[i].amount;
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


    var emptyOwn = angular.toJson($scope.ownpayingAccounts);
    var emptyThird = angular.toJson($scope.thirdpayingAccounts);
    var emptyInterbank = angular.toJson($scope.interbankPayments);
    var emptyOrder = angular.toJson($scope.orderpayingAccounts);

    $scope.$watch('ownpayingAccounts', function (value) {
      if(emptyOwn !== angular.toJson($scope.ownpayingAccounts)) {
        $scope.allowNext = true;
      }
    }, true);

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

    $scope.$watch('orderpayingAccounts', function (value) {
      if(emptyOrder !== angular.toJson($scope.orderpayingAccounts)) {
        $scope.allowNext = true;
      }
    }, true);

		$scope.$watch('selectedGroup', function (value) {
			if($scope.selectedGroup) {
				$scope.allowNext = true;
			}
		});

    $scope.verifyThirdMode = function (payment, selection) {
      if(selection === 'programming' && payment.remote) {
        payment.remote = false;
      }
      if(selection === 'remote' && payment.programming) {
        payment.programming = false;
      }
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

    $scope.validatePayment = function (payment) {
      return payment.enabled;
    };

    $scope.validatePayments = function (payments) {
      var success = false;
      for(var i = 0; i < payments.length; i++) {
        if(payments[i].enabled) {
          return true;
        }
      }

      return success;
    };

    $scope.validateInterbankAccount = function (account) {
      if(account.accountType && account.accountNumber && account.bank)
        return true;
      return false;
    };

    $scope.acceptAppliedOptions = function () {
      if($("#finalOption").val()=='0'){
        $scope.modal_nuevogrupo=true;
      }else if($("#finalOption").val()=='1'){
        $scope.modal_grupos=true;
      }else{
            $scope.applied = false;
            $scope.showAccounts = true;
            $scope.state = 'multiplePayments';
            $scope.setup();
      }
    };

    $scope.acceptApplied = function () {
      $scope.applied = false;
      $scope.showAccounts = true;
      $scope.state = 'multiplePayments';
      $scope.setup();
    };    

    $scope.fiscalVerify = function (payment) {
      if(payment.fiscal && payment.amount > 0) {
        payment.iva = (payment.amount * 0.16).toFixed(2);
      }
    };

    $scope.getAppliedDate = function (payment) {
      var date = $scope.getCurrentDate() + " " + $scope.getCurrentTime() + " hrs";
      if(payment.date && payment.hours && payment.minutes) {
        date = payment.date + " " + payment.hours.name + ":" + payment.minutes.name + " hrs";
      }
      if(payment.remoteDate && payment.hours && payment.minutes) {
        date = payment.remoteDate + " " + payment.hours.name + ":" + payment.minutes.name + " hrs";
      }

      payment.appliedDate = date;

      return date;
    };

    $scope.selectGroup = function (group) {
      $scope.selectedGroup = group;
    };

		$scope.changeGroup = function () {
      if($scope.selectedGroup) {
        $http.get($scope.base_url + "/allgroups/" + $scope.selectedGroup.id + "/items", {}).
          success(function(responseData, status, headers, config) {
            //$scope.groupItems = responseData;
            for(var x = 0 ; x<responseData.docs.length; x++){
              //Esto es para que el importe por default sea el mismo que el último pago
              responseData.docs[x].amount = responseData.docs[x].target.originalObject.last_payment_d;
              responseData.docs[x].date = $scope.getCurrentDate();
            }
            $scope.ownpayingAccounts = responseData.docs;
            $scope.addMoreOwnPayments();
          }).
        error(function(data, status, headers, config) {
          console.log("error");
        });
      }
		};

		$scope.getAccountsByType = function (id) {
			for(var i = 0; i < $scope.ownDefaultData.length; i++) {
				var elem = $scope.ownDefaultData[i];
				if(elem.id === id) {
					return elem.accounts;
				}
			}
		};

		$scope.getAccountById = function (typeId, id) {
      var accounts = $scope.getAccountsByType(typeId);
			for(var i = 0; i < accounts.length; i++) {
				var elem = accounts[i];
				if(elem.id === id) {
					return elem;
				}
			}
		};

		$scope.getInterbankAccountById = function (id) {
			for(var i = 0; i < $scope.interbankTargetData.docs.length; i++) {
				var elem = $scope.interbankTargetData.docs[i];
				if(elem.id === id) {
					return elem;
				}
			}
		};

    $scope.jumpToTop = function(event){
      $location.hash('top');
      $anchorScroll();
      if(event!=undefined){
        event.preventDefault();
        event.stopPropagation();
      }
    }

    $scope.changeTab = function(tab) {
      if ($scope.stepState === 'capture') {
        $scope.state = tab;
        $scope.ownpayingAccounts = [];
        if (tab === 'multiplePayments') {
          $scope.setup();
        }
      }
    }

    $location.hash('top');
    $anchorScroll();

    $scope.disableDiv = function(){
      $scope.groupSelected = true;
    }

    $scope.groupSelected = false;
    $scope.multiplePayments = true;
    $scope.collapseOne = true;
    $scope.sameAccount = false;
    $scope.state = "multiplePayments";

    $scope.showBeneficiary = function(){
      $scope.addBenef = true;
    }

    $scope.sucNum = "";
    $scope.showSuc = function(index){
      $scope.sucNum = index;
      $scope.modal_sucursales = true;
    }
    $scope.asignarSuc = function(){
      var tmp = 'sucursal'+$scope.sucNum;
      $scope.sucNum
      $("#"+tmp).val('000');
    }

    $scope.showPrint = function(){
      $scope.modal_impresion = true;
    }
    $scope.imprimir = function(){
      if($('input[name=radio-impresion]:checked').val()=='individual'){
        window.open("print1.html","impresion");
      }
      if($('input[name=radio-impresion]:checked').val()=='lista'){
        window.open("print2.html","impresion");
      }
      $scope.modal_impresion = false;
    }
    $scope.showNewGroup = function(){
      $scope.modal_nuevogrupo = true;
    }
    $scope.showGroups = function(){
      $scope.modal_nuevogrupo = true;
    }
    $scope.showAddGroup = function(){
      if( $('.select_addGroup').val() == '0' ){
        showNewGroup();
      }
      if( $('.select_addGroup').val() == '1' ){
        showGroups();
      }
    }

    $scope.grupoaborrar ="";
    $scope.showDeleteGroups = function(nombre){
      $scope.grupoaborrar =nombre;
      $scope.modal_deleteGroup = true;
    }

    $scope.oneAccount4All = function($event,objeto){
      if($event){
        $("input").each(function(){
            if ($(this).attr("id")=="origin-account_value") {
              $(this).val($("#origin-account_value").val());
            }
        });
      }else{
        var contador = 0;
        $("input").each(function(){
          if ($(this).attr("id")=="origin-account_value") {   
            if(contador>0){        
              $(this).val("");
            }
            contador++;
          }
        });
      }
      $scope.sameAccount = $event ? true : false;
      $scope.firstObject = objeto;
    }

    $scope.removeGroup = function(index) {
      if(index != -1) {
        $scope.groups.docs.splice(index, 1);
      }
    };

    $scope.newGroup = function(){
      $scope.setup();
      $scope.stepState = 'newBeneficiaryGroups';
    }

    $scope.newGroupName = "";

    $scope.saveNewBeneficiaryGroup = function(){
      $scope.newGroupName = $('#newNameGroup').val();
    }

    $scope.validate = function(){
      var noHayNada = true;
      $scope.ownpayingAccounts.forEach(function(renglon, index){
        if(renglon.source !== undefined || renglon.target !== undefined || renglon.amount !== undefined){
          noHayNada = false;
        }
      });
      if(noHayNada){
        $scope.ownpayingAccounts[0].errorMsgSource = 'Seleccione una cuenta origen';
        $scope.ownpayingAccounts[0].errorMsgTarget = 'Seleccione una cuenta destino';
        $scope.ownpayingAccounts[0].errorAmount = 'Ingresa un importe';
        $location.hash('top');
        $anchorScroll();
        return;
      }

      var ok = true ;
      $scope.ownpayingAccounts.forEach(function(renglon, index){
        renglon.errorMsgSource = renglon.errorMsgTarget = renglon.errorAmount = '';
        if(renglon.source !== undefined || renglon.target !== undefined || renglon.amount !== undefined){
          if(renglon.source === undefined){
            renglon.errorMsgSource = 'Seleccione una cuenta origen';
            ok = false;
          }
          if(renglon.target === undefined){
            renglon.errorMsgTarget = 'Seleccione una cuenta destino';
            ok = false;
          }
          if(renglon.amount === undefined){
            renglon.errorAmount = 'Ingresa un importe';
            ok = false;
          }
        }
      });
      if(ok){
        $scope.stepState='confirmation';
      }else{
        $location.hash('top');
        $anchorScroll();
      }
    }

    $scope.nombreNuevoGrupo = "";
    $scope.errorNombreNuevoGrupo = false;
    $scope.inicioNombreNuevoGrupo = true;
    $scope.guardarNuevoGrupo = function(){
        if($scope.inicioNombreNuevoGrupo){
          if($scope.nombreNuevoGrupo === ''){
            $scope.errorNombreNuevoGrupo = true;
          }else{
            $scope.inicioNombreNuevoGrupo = false;
            $scope.okNombreNuevoGrupo = true;
            $scope.errorNombreNuevoGrupo = false;   
          }
        }else{
          $scope.inicioNombreNuevoGrupo = true;
          $scope.okNombreNuevoGrupo = false;
          $scope.nombreNuevoGrupo = '';
          $scope.modal_nuevogrupo = false;
          $scope.applied=false;
          $scope.state = 'multiplePayments';
          $scope.stepState = 'capture';
          $("#finalOption").val('-1');
          $scope.deshabilitar = false;   
          $scope.addToNewGroup = false;    
          $scope.setup();
        }
  }

  $scope.previousState="";


}]);
