package com.work.main.status.dto;

import com.work.main.common.base.BaseRequest;

public class StatusRequest extends BaseRequest {

	private Long statusID;

	private String name;

	public StatusRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatusRequest(int pageNum, int pageSize) {
		super(pageNum, pageSize);
		// TODO Auto-generated constructor stub
	}

	public StatusRequest(Long statusID, String name) {
		super();
		this.statusID = statusID;
		this.name = name;
	}

	public Long getStatusID() {
		return statusID;
	}

	public void setStatusID(Long statusID) {
		this.statusID = statusID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
