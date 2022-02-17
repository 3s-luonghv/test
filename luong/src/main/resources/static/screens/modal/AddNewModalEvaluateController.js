
app.controller('AddNewModalEvaluateController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	$scope.valueselectLanguage = 'vi';
	$scope.titlModalCatalogyItem = TitleparentParameter;
	$scope.saveEdit = function(response) {
		fnClearMessage();
		//Gọi đến popup để xác nhận có muốn lưu hay không (popup yes & No hiện lên khi click nút save)
		if (fnValidateForm() == true) {
			return;
		}

		else {

			var yesCallBack = function() {
				var adddata = {
					"objectSource": {
						"useFlag": $scope.useFlagModal,
						"name": $scope.namedb,
						"code": $scope.codedb,
						"catalogId": parentParameter

					}
				}

				WebService.call($http, "catitem/rsv005", adddata, function(response) {
					var yesCallBack = function() {
						$uibModalInstance.close(response)
					}
					var noCallBack = function() { }
					ModalService.alert({ 'modalTitle': 'Info', 'messenge': 'Thêm mới thành công' }, yesCallBack, noCallBack)


				}, "POST");
			

			}
			var noCallBack = function() { }

			// Gọi đến popup để xác nhận có muốn lưu hay không (popup yes & No hiện lên khi click nút save)
			ModalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn có chắc muốn thêm vào không?' }, yesCallBack, noCallBack)

		}
	}

	// đóng modal insert dữ liệu
	$scope.closeAdnewCatIModal = function() {
		$uibModalInstance.dismiss();
		
	};
	// feed lỗi nhập liệu
	function fnClearMessage() {
		$scope.SttCodeMessage = "";
		$scope.SttCodeMessage1 = "";
		$scope.SttCodeMessage2 = "";
	}
	function fnValidateForm() {
		var hasError = false;
		if (ValidateUltility.checkEmpty($scope.useFlagModal)) {
			$scope.SttCodeMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.namedb)) {
			$scope.SttCodeMessage1 = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.codedb)) {
			$scope.SttCodeMessage2 = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		return hasError;
	}
	
	$(function() {
$('#dayreviewedit').datetimepicker({
format: 'YYYY-MM-DD'
});
	
});

$scope.btnResult= function() {
	ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', 'Kết luận hồ sơ', '', function(reponse) {
	 });
		};
$scope.btnResult2 = function() {
	ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalControllerEditor', 'Kết luận', id , function(reponse) {
	 });
};
//modal evaluate
	var getDataDropDownAll = function() {
			//khai báo điều kiện để get dữ liệu lên Level
			var dataDropDownAll = {
				"client": fnGetClientInfo(),
				"dummySearch":{}
			}
			//gọi để hiển thị data lên drop Level
			WebService.call($http, "catitem/ci03", dataDropDownAll, function(response) {

				var resultProfile = [];
				var result = [];
				var data = response.data.list;
				if (data == 0) {
					console.log("không có dữ liệu");
				} else {
					console.log("OK dropdown modal Theem mowis");
					for (x in data) {
						if (data[x].categoryId ==15) {
							resultProfile.push(data[x]);
						} else if (data[x].categoryId ==16) {
							result.push(data[x]);
						}
					}  

					$scope.ResultProfile = resultProfile;			
					$scope.selectResultProfile = $scope.ResultProfile[0].id +"";
					$scope.Result = result;
					$scope.selectResult = $scope.Result[0].id +"";
				}
			}, "POST");
		};
		getDataDropDownAll();
		//end
		// phạm vi review
			var getDataDropDownAll1 = function() {
			//khai báo điều kiện để get dữ liệu lên Level
			var dataDropDownAll1 = {
				"client": fnGetClientInfo(),
				"dummySearch":{}
			}
			//gọi để hiển thị data lên drop Level
			WebService.call($http, "candidatetest/candidatetest03", dataDropDownAll1, function(response) {

				var pviReviewEdit = [];
				var data = response.data.list;
				if (data == 0) {
					console.log("không có dữ liệu candiate review");
				} else {
					console.log("OK dropdown phạm vi review");
					for (x in data) {
						 if (data[x].id) {
							pviReviewEdit.push(data[x]);
						}
					}
					$scope.pviReview = pviReviewEdit;
					$scope.selectpviReview = $scope.pviReview[0].id +"";
				
				}
			}, "POST");
		};
		getDataDropDownAll1();
//save and next
function saveEvalute() {
var request = {
"client": {
"langCode": $scope.valueselectLanguage

},
"list result": {
"dateview": $scope.Dateview,
"useview": $scope.Useview,
"scopeview": $scope.selectpviReview,

"dayduttc": $scope.daydu_ttc,
"rorangttc":$scope.rorang_ttc,
"chinhxacttc":$scope.chinhxac_ttc,
"tincayttc":$scope.tincay_ttc,
"datttc":$scope.dat_ttc,
"ykienreview0_ttc": $scope.ykienreview0_ttc,

"dayduttnl": $scope.daydu_ttnl,
"rorangttnl":$scope.rorang_ttnl,
"chinhxacttnl":$scope.chinhxac_ttnl,
"tincayttnl":$scope.tincay_ttnl,
"datttnl":$scope.dat_ttnl,
"ykienreview0_ttnl": $scope.ykienreview1_ttnl,

"dayduttkn": $scope.daydu_ttkn,
"rorangttkn":$scope.rorang_ttkn,
"chinhxacttkn":$scope.chinhxac_ttkn,
"tincayttkn":$scope.tincay_ttkn,
"datttkn":$scope.dat_ttkn,
"ykienreview0_ttkn": $scope.ykienreview2_ttkn,

"daydustst": $scope.daydu_stst,
"rorangstst":$scope.rorang_stst,
"chinhxacstst":$scope.chinhxac_stst,
"tincaystst":$scope.tincay_stst,
"datstst":$scope.dat_stst,
"ykienreview0_stst": $scope.ykienreview3_stst,

"dayduttdt": $scope.daydu_ttdt,
"rorangttdt":$scope.rorang_ttdt,
"chinhxacttdt":$scope.chinhxac_ttdt,
"tincayttdt":$scope.tincay_ttdt,
"datttdt":$scope.dat_ttdt,
"ykienreview0_ttdt": $scope.ykienreview4_ttdt,


"resultpro": $scope.selectResultProfile,

"diemthaido" : $scope.diemthaido,
"reviewchitiet6" : $scope.reviewchitiet6,
"diemchuyenmon" : $scope.diemchuyenmon,
"reviewchitiet7" : $scope.reviewchitiet7,
"diemkinhnghiem" : $scope.diemkinhnghiem,
"reviewchitiet8" : $scope.reviewchitiet8,
"diemkynang" : $scope.diemkynang,
"reviewchitiet9" : $scope.reviewchitiet9,
"diemngoaingu" : $scope.diemngoaingu,
"reviewchitiet10" : $scope.reviewchitiet10,
"khac" : $scope.khac,
"reviewchitiet11" : $scope.reviewchitiet11,

"conclusion": $scope.Conclusion,
"result": $scope.selectResult,
"gtrixephang" : $scope.rank,
"note": $scope.Note
}
}
console.log(request);
WebService.call($http, "catitem/ci05", request, function(response) {

console.log("Lưu thành công");

}, "POST");
}
//end
		getDataDropDownAll();

$scope.saveNnext = function() {
	console.log("lưu và tiếp")
	saveEvalute();
}
$scope.saveNclose = function() {
	console.log("lưu và đóng")
}
// tổng điểm các cột CHÚ Ý
$(document).ready(function(){

		$(".txt").each(function() {

			$(this).keyup(function(){
				calculateSum();
			});
		});

	});

// user review dropdown
	var getDataDropDownUser = function() {
			//khai báo điều kiện để get dữ liệu lên Level
			var dataDropDownUser = {
				"client": fnGetClientInfo(),
				"dummySearch":{}
			}
			//gọi để hiển thị data lên drop Level
			WebService.call($http, "userreview/userreview03", dataDropDownUser, function(response) {

				var userDropdown = [];
				var data = response.data.list;
				if (data == 0) {
					console.log("không có dữ liệu candiate review");
				} else {
					console.log("OK dropdown user dropdown");
					for (x in data) {
						 if (data[x].id) {
							userDropdown.push(data[x]);
						}
					}
					$scope.useedit = userDropdown;
					$scope.selectUseEdit = $scope.useedit[0].id +"";
				
				}
			}, "POST");
		};
		console.log("test user dropdown")
		getDataDropDownUser();
	//end
	//save and close
	$scope.saveNclose = function() {
console.log(parentParameter.id)
var datarequestAddClose =
{
"client": {

},
"dto": {
"idper": idPer,
"dateview": $scope.Dateview,
"useview": $scope.selectUseEdit,
"scopeview": $scope.selectpviReview,
"result": $scope.selectResultProfile,
"pointview":$scope.Conclusion,
"rankview": $scope.rank,
"conclusion": $scope.selectResult,
"note": $scope.Note
}
}

console.log(datarequestAddClose);

WebService.call($http, "candireview/candireview05", datarequestAddClose, function(response) {
console.log(response)
$uibModalInstance.close();
}, "POST");
}
	//end
});

