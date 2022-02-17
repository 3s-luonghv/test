app.controller('ModalCopyCtrl', function ($scope, $uibModalInstance,TitleparentParameter,$http,ModalService,WebService,parentParameter) {
	
	var responsesave = "";
	var idscreens = parentParameter.id;   //lay id tu vi tri parentParameter dua qua
	var idlang = "";
	function loaddata() {
		$scope.selectscreenscopy = parentParameter.screensId + "";
	}
	//dropdown màn hình in copy modal
	dropdownScreens();
	function dropdownScreens() {
		var dropdownScreens = {
			"client":  {
				"langCode": fnGetClientInfo().langCode
				}
		}
		WebService.call($http, "screens/screens001", dropdownScreens, function (response) {
			//tab ngon ngu
			$scope.screensdropdown = response.data.list;
			$scope.selectscreenscopy = $scope.screensdropdown[0].screensId + '';
		}, "POST")
	}
	
//copylabel fnfunction
	$scope.fnCopylabel = function () {
		for (i in parentParameter) {
			parentParameter[i].screensId = $scope.selectscreenscopy
			delete parentParameter[i].id
		}		
		var copyScreens ={
			"client":  {
				"langCode": fnGetClientInfo().langCode
				},
			"dtoList":parentParameter
		}
		WebService.call($http,"screensitem/screensitem06", copyScreens, function (response) {		
			
		closeModal();
		}, "POST")
	}

	function closeModal(responsesave) {
		ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'sao  chép thành công' }, function () { }, function () { });
		$uibModalInstance.close(responsesave);
	}
	$scope.fnCloseCopy = function () {
		$uibModalInstance.close();
	}// end fnCloseModal
	
	buidLabelScreens();
	function buidLabelScreens() {
		var request = {
			"client": {
				"langCode": fnGetClientInfo().langCode
				},
			"dummySearch": {
				"screensId": 9
			}
		}
		WebService.call($http, 'screensitem/screensitem03', request, function(response) {
			
		if(response.data.issues.length == 0) {
		
			$scope.Label17 = response.data.list[16].displayText;
			$scope.Label13 = response.data.list[12].displayText;
			$scope.Label11 = response.data.list[10].displayText;
			$scope.Label18 = response.data.list[17].displayText;
			
			}
			
		else { $window.alert("ERROR: " + response.data.issues[0].message);}
		}, "POST");
	}

});//end
