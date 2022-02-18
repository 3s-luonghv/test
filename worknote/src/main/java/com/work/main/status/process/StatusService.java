package com.work.main.status.process;

import com.work.main.common.base.BaseResponse;
import com.work.main.status.dto.StatusRequest;

	public interface StatusService {
		void save(StatusRequest req);
		BaseResponse getAll();
		BaseResponse getByID(StatusRequest req);
		BaseResponse update( StatusRequest req);
		BaseResponse delete(StatusRequest req);
}
