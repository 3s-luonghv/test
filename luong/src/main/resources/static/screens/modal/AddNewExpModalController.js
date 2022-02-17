app.controller('AddNewExpModalController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	var idper= 1;
	var getDataDropDownAll = function() {
			//khai báo điều kiện để get dữ liệu lên Level
			var dataDropDownAll = {
				"client": fnGetClientInfo(),
				"dummySearch":{}
			}
			//gọi để hiển thị data lên drop Level
			WebService.call($http, "catitem/ci03", dataDropDownAll, function(response) {

				var typework = [];
				var rolework = [];
				var placework = [];
				var data = response.data.list;
				if (data == 0) {
					
				} else {
					console.log("OK");
	
					for (x in data) {
						if (data[x].categoryId ==11) {
							typework.push(data[x]);
						}else if(data[x].categoryId ==10){
							rolework.push(data[x]);
						}else if(data[x].categoryId ==17){
							placework.push(data[x]);
						}
					}

					$scope.TypeOfWork = typework;			
					$scope.selectTypeOfWork = $scope.TypeOfWork[0].id +"";
					$scope.MainRole = rolework;			
					$scope.selectMainRole = $scope.MainRole[0].id +"";
					$scope.Workplace = placework;			
					$scope.selectWorkplace = $scope.Workplace[0].id +"";
/*					$scope.statusNameList = status;
					$scope.selectstatus = $scope.statusNameList[0].useFlag + "";
					loadgrid()*/

				}
			}, "POST");
		}
			getDataDropDownAll();
			
			$scope.btnOpenTypeOfWork= function() {
	ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Loại công việc", '', function(response) {
		
	 });

		}
			$scope.btnOpenMainRole= function() {
	ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Vai trò chính", '', function(response) {
		
	 });

		}
				$scope.btnOpenWorkplace= function() {
	ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Nơi làm việc", '', function(response) {
		
	 });

		}

	
		$scope.closeModal = function() {
		$uibModalInstance.dismiss();
		
	}
		$scope.closee = function() {
		$uibModalInstance.dismiss();
		
	}
	$(function() {
  $('#fromdate').datetimepicker({
 format: 'YYYY-MM-DD'
 })
});
	$(function() {
  $('#todate').datetimepicker({
 format: 'YYYY-MM-DD'
 })
});
	
	$scope.SaveAndClose = function() {
		console.log(parentParameter.id)
		console.log(datarequestcati)
var datarequestcati =
{
    "client": {
      
    },
    "dto": {
        "idper":idper,
        "startTime": $scope.fromdate,
        "endTime": $scope.todate,
        "workplace": $scope.selectWorkplace,
        "organizationName": $scope.organizationname,
        "workTypes": $scope.selectTypeOfWork,
        "nameProjects": $scope.projectworkname,
        "time": $scope.time,
        "scale": $scope.scale,
        "workSammary": $scope.summaryjobinformation,
        "technologyApplication": $scope.appliedtechnologyexpertise,
        "achievements": $scope.responsibilityworkachievement,
        "mainRole": $scope.selectMainRole
        
    }
}

console.log(datarequestcati)

	WebService.call($http, "personexp/perexp05", datarequestcati, function(response) {
	$uibModalInstance.close(true);
	}, "POST");
 	//return true;
	};
	
	});