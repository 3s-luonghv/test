package com.work.main.worknote.process;

import com.work.main.common.base.BaseResponse;
import com.work.main.worknote.dto.WorknoteRequest;

public interface WorknoteService {
	void save(WorknoteRequest req);

	//void savelist(ListProvinceRequest listCreateProvinceRequest);
	BaseResponse getAllSort(WorknoteRequest req);
	BaseResponse getAll();
	BaseResponse getByID(WorknoteRequest req);
	BaseResponse update( WorknoteRequest req);
	BaseResponse delete(WorknoteRequest req);

}