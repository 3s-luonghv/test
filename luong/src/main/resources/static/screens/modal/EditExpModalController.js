app.controller('EditExpModalController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService,parentParameter, ModalService, ValidateUltility) {
		console.log(parentParameter);
		var idperson = parentParameter
		var getDataDropDown = function() {
			//khai báo điều kiện để get dữ liệu lên Level
			var dataDropDown = {
				"client": fnGetClientInfo(),
				"dummySearch":{}
			}
			//gọi để hiển thị data lên drop Level
			WebService.call($http, "catitem/ci03", dataDropDown, function(response) {

				var typework1 = [];
				var rolework1 = [];
				var placework1 = [];
				var data = response.data.list;
				if (data == 0) {
					
				} else {
					console.log("OK");
	
					for (x in data) {
						if (data[x].categoryId ==11) {
							typework1.push(data[x]);
						}else if(data[x].categoryId ==10){
							rolework1.push(data[x]);
						}else if(data[x].categoryId ==17){
							placework1.push(data[x]);
						}
					}

					$scope.TypeOfWork = typework1;			
					$scope.selectTypeOfWork = $scope.TypeOfWork[0].id +"";
					$scope.MainRole = rolework1;			
					$scope.selectMainRole = $scope.MainRole[0].id +"";
					$scope.Workplace = placework1;			
					$scope.selectWorkplace = $scope.Workplace[0].id +"";
/*					$scope.statusNameList = status;
					$scope.selectstatus = $scope.statusNameList[0].useFlag + "";
					loadgrid()*/

				}
			}, "POST");
		}
			getDataDropDown();
			
		$scope.closeModal = function() {
		$uibModalInstance.dismiss();
		
	}
			var requestForm1 = {
			"client" :{
				"langCode":'vi'
			},
			"dummySearch": {
				"id": parentParameter,
				"idper": idPer
				
				
		}
	}
		console.log(requestForm1)
		WebService.call($http, "personexp/perexp03", requestForm1, function(response) {
			console.log(response)		
					
					$scope.fromdate = response.data.list[0].startTime;	
					$scope.todate = response.data.list[0].endTime;	
					$scope.selectWorkplace = response.data.list[0].workplace;												
					$scope.organizationname = response.data.list[0].organizationName;	
					$scope.selectTypeOfWork = response.data.list[0].workTypes;	
					$scope.projectworkname = response.data.list[0].nameProjects;
					$scope.time = response.data.list[0].time;	
					$scope.scale = response.data.list[0].scale;		
					$scope.summaryjobinformation = response.data.list[0].workSammary;
					$scope.appliedtechnologyexpertise = response.data.list[0].technologyApplication;
					$scope.responsibilityworkachievement = response.data.list[0].achievements;
					$scope.selectMainRole = response.data.list[0].mainRole;																						
		}, "POST");


	$scope.SaveAndClose = function() {
var datarequestcati =
{
    "client": {
      
    },
    "dto": {    
		"id":parentParameter,
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
	$uibModalInstance.close();
	//console.log(response)
	loaddatagrid();
	}, "POST");
	};
	
	
	$scope.editor = function() {
		console.log(parentParameter.id)
var datarequestcati2 =
{
    "client": {
      
    },
    "dto": {
        "id":parentParameter,
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

console.log(datarequestcati2)

	WebService.call($http, "personexp/perexp05", datarequestcati2, function(response) {
	$uibModalInstance.close();
	}, "POST");
	};
	
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
	
	});