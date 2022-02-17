
app.controller('CandidateController', function($rootScope, $scope, WebService, $http, $timeout, $location, ValidateUltility, $uibModal, ModalService, GridService, $compile) {
	$timeout(function() {
	//	fnInit()
	});
$scope.showTabInfo = "active";
tabsInfoDefault()

	function tabsInfoDefault() {
		$scope.showTabInfo = "active";

	}
	$scope.clickTab = function(tabName) {
		$scope.showTabInfo = ""
		$rootScope.isActiveTabCadidate = function(tab) {

			return tab === tabName
		}

	}


	/*function fnInit() {
		tabsInfoDefault();

		if (ValidateUltility.checkEmpty(idPer)) {

			tabsInfoDefault();
		
			$scope.isDisabledTranning = true
			$scope.isDisabledSkill = true
			$scope.isDisabledExp = true
			$scope.isDisabledEvaluate = true

		} else {

			tabsInfoDefault();
			$rootScope.$on('showTab', function(events, data) {
				console.log("qua")
					$scope.isDisabledTranning = false
			$scope.isDisabledSkill = false
			$scope.isDisabledExp = false
			$scope.isDisabledEvaluate = false

				tabsInfoDefault();

			});
		
		} //end else
		
		
	}
*/




});