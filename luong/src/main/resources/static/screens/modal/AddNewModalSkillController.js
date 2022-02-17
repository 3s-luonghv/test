app.controller('AddNewModalSkillController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	var parent = 49
	$scope.selectcSpecialize = "49"
	$scope.selectSkillname = "52"
	$scope.modalTitle = TitleparentParameter
	var getDataDropDown = function() {
	var dataDropDown = {
		"client": fnGetClientInfo()
			}
		WebService.call($http, "catitem/ci03", dataDropDown, function(response) {
				//console.log(response)
				var specialize = [];
				var skillname = [];
				var level = [];
				var data = response.data.list;
				//console.log(data)
				if (data == 0) {
					console.log("Không có dữ liệu");
				} else {
					for (x in data) {
						if (data[x].categoryId == 13) {
							specialize.push(data[x]);
						} else if (data[x].categoryId == 14 && data[x].parentId == parent) {
							skillname.push(data[x]);
						}
						 else if (data[x].categoryId == 9) {
							level.push(data[x]);
						}
						}
					}					
				$scope.Specialize = specialize; 
				
				$scope.Skillname = skillname;
				$scope.selectSkillname = $scope.Skillname[0].id +"";
				$scope.Level = level;
				$scope.selectLevel = $scope.Level[0].id +"";
				}, "POST");
		}
		getDataDropDown()    
		$scope.changemodalskillName = function()
		{
			parent = $scope.selectcSpecialize;
			console.log (parent)
			
			getDataDropDown()
		}
	$scope.btnOpenModalSpecialize = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController',"Thêm mới Chuyên Môn",13, "");
	}
	$scope.btnOpenModalSkillname = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController',"Thêm mới Kỹ Năng",14, "");
	}
	$scope.btnOpenModalLevel = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController',"Thêm mới Trình độ/Bậc",9, "");
	}
	
	$scope.closeAdnewCatIModal = function(){
		$uibModalInstance.dismiss()
	}	
	$scope.saveClose = function(){
		var saveForm = {
			"client" :{
			"langCode":'vi'
			},
			"dto": {
		"idper": idPer,
		"skillgroup": $scope.selectcSpecialize,
        "skillname": $scope.selectSkillname,
        "yearexp": $scope.YearExp,
        "monthexp": $scope.MonThexp,
        "level": $scope.selectLevel,
        "note": $scope.Note1,
		"startdate":$scope.Startdate,
		"enddate":$scope.Enddate
		}
	}
	
	console.log(saveForm);	
	WebService.call($http, "personsk/personsk05", saveForm, function(response) {
			console.log(response)
			$uibModalInstance.close()
	
	}, "POST");
	}
	
	$scope.saveAdd = function(){
		var saveForm = {
			"client" :{
			"langCode":'vi'
			},
			"dto": {
		"idper": idPer,
		"skillgroup": $scope.selectcSpecialize,
        "skillname": $scope.selectSkillname,
        "yearexp": $scope.YearExp,
        "monthexp": $scope.MonThexp,
        "level": $scope.selectLevel,
        "note": $scope.Note1,
		"startdate":$scope.Startdate,
		"enddate":$scope.Enddate
		}
	}
	
	console.log(saveForm);	
	WebService.call($http, "personsk/personsk05", saveForm, function(response) {
			console.log(response)
			 fnClearData()
		$uibModalInstance.close()
	}, "POST");
	}
	
	function fnClearData() {
	$scope.selectcSpecialize = "";
	$scope.selectSkillname = "";
	$scope.YearExp = "";
	$scope.MonThexp = "";
	$scope.selectLevel = "";
	$scope.Note1 = "";
	$scope.Startdate = "";
	$scope.Enddate = "";
	}
	$(function() {
		$('#fromdate').datetimepicker({
			format: 'YYYY-MM-DD'
		});
		$('#todate').datetimepicker({
			format: 'YYYY-MM-DD'
		});

	});
	
	});
