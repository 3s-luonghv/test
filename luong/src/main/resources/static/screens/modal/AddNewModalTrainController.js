
app.controller('AddNewModalTrainController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	$scope.modalTitle = TitleparentParameter
	$scope.valueselectLanguage = "";
	var parent = 5

	$scope.FieldsOfStudy = "5"
	$scope.Specialized = "10"
	var getDataDrop = function() {
		//khai báo điều kiện để get dữ liệu lên Specialized
		var dataLanguage = {
			"client": fnGetClientInfo(),
			"dummySearch": {}

		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "catitem/ci03", dataLanguage, function(response) {
			console.log(response);
			var special = new Array();
			var system = new Array();
			var degree = new Array();
			var field = new Array();
			var rank = new Array();
			var data = response.data.list;
			if (data == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in data) {
					if (data[x].categoryId == 3 && data[x].parentId == parent) {
						special.push(data[x]);
					} else if (data[x].categoryId == 4) {
						system.push(data[x]);
					} else if (data[x].categoryId == 1) {
						degree.push(data[x]);
					} else if (data[x].categoryId == 2) {
						field.push(data[x]);
					} else if (data[x].categoryId == 5) {
						rank.push(data[x]);
					}
				}
				console.log(special);
				console.log(status);
				//tab thông tin chung
				$scope.specialized = special;
				$scope.Specialized = $scope.specialized[0].id + "";
				$scope.trainingSystem = system;
				$scope.TrainingSystem = $scope.trainingSystem[0].id + "";
				$scope.degreeTraining = degree;
				$scope.DegreeTraining = $scope.degreeTraining[0].id + "";
				$scope.fieldsOfStudy = field;
				//$scope.FieldsOfStudy = $scope.fieldsOfStudy[0].id + "";
				$scope.ratings = rank;
				$scope.Ratings = $scope.ratings[0].id + "";



				//loadGrid(response)
			}
		}, "POST");

	}
	$scope.deleteForm = function() {
		console.log("XOAFORM")
		$scope.Specialized = $scope.specialized[0].id;
		$scope.TrainingSystem = $scope.trainingSystem[0].id;
		$scope.DegreeTraining = $scope.degreeTraining[0].id

	}
	getDataDrop();
	// Bật modal Chuyên ngành
	$scope.insertSpecialized = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới chuyên ngành", 3, "");
	};

	//Bật modal Hệ đào tạo
	$scope.insertTrainingSystem = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới hệ đào tạo", 4, "");
	};

	// Bật modal Trình độ đào tạo
	$scope.insertDegreetraining = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới quá trình đào tạo", 1, "");
	};

	// Bật modal Lĩnh vực
	$scope.insertFieldsOfStudy = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới Lĩnh vực", 2, "");
	};

	// Bật modal Xếp hạng
	$scope.insertRatings = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới Lĩnh vực", 5, "");
	};
	
	
	function requestGrid(){
	var request = {
			"client": {


			},
			"dto": {
				"idper": parentParameter,
				"fromDate": $scope.FromDate,
				"toDate": $scope.ToDate,
				"degreeTrainingId": $scope.DegreeTraining,
				"fieldsOfStudyId": $scope.FieldsOfStudy,
				"specializedid": $scope.Specialized,
				"trainingSystemid": $scope.TrainingSystem,
				"ratingsId": $scope.Ratings,
				"trainingPlaces": $scope.TrainingPlaces,
				"remark": $scope.Remark,
				"useFlag": 1,
				"useFlagName": 1
			}
		}
 return request;
}
	function saveTrain(request) {
		
		console.log(request);
		WebService.call($http, "person/ps05", request, function(response) {
			if(response.data.isDone == true){
				ModalService.alert({ "modalTitle": "Success", "messenge": "Bạn đã thêm mới thành công" }, function(){}, "");
				$uibModalInstance.close() 
			}else{
				console.log("Lưu thất bại");
			}
			
			
		}, "POST"); 
	}
	
	function saveTrain1(request) {
		
		console.log(request);
		WebService.call($http, "person/ps05", request, function(response) {

			console.log("Lưu thành công");
			
		}, "POST");
	}

	

	$scope.changeSpecializedTraning = function() {
		parent = $scope.FieldsOfStudy
		console.log(parent)
		getDataDrop()
	}

	$scope.closeAdnewCatIModal = function() {
		$uibModalInstance.close()
	}
	$scope.saveNadd = function() {
		console.log("test luu va them")
		fnClearValidate();
		if(fnValidateForm() == true) {
			return;
		} else {
			saveTrain1(requestGrid());
		}
	}
	$scope.saveNclose = function() {
		console.log("test luu va dong")
		fnClearValidate();
		if(fnValidateForm() == true) {
			return;
		} else {
			saveTrain(requestGrid());
		}
		
	}
	
	// function validate
	function fnValidateForm() {
		var hasError = false;

		if (ValidateUltility.checkEmpty($scope.TrainingPlaces)) {
			$scope.placeMess = "Vui lòng nhập nơi đào tạo ";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.FromDate) ||  ValidateUltility.checkEmpty($scope.ToDate)) {
			$scope.timeMess = "Vui lòng chọn thời gian";
			hasError = true;
		}

		return hasError;
	}
	//fn clear validate
	function fnClearValidate(){
		$scope.placeMess = "";
		$scope.timeMess = "";
		
	}





	$(function() {
		$('#reservationdate_start').datetimepicker({
			format: 'YYYY-MM-DD'
		});
		$('#reservationdate_end').datetimepicker({
			format: 'YYYY-MM-DD'
		});

	});
});
