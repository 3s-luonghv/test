package com.work.main.worknote.dto;

import java.sql.Date;

import com.work.main.Entity.Status;
import com.work.main.common.base.BaseRequest;

public class WorknoteRequest  extends BaseRequest{
private Long workID;	

	private String name;
	
	private Date startDate;
	

	private Date endDate;
	
	private Long statusID;

	public WorknoteRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorknoteRequest(int pageNum, int pageSize) {
		super(pageNum, pageSize);
		// TODO Auto-generated constructor stub
	}

	public WorknoteRequest(Long workID, String name, Date startDate, Date endDate, Long status) {
		super();
		this.workID = workID;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.statusID = status;
	}

	public Long getWorkID() {
		return workID;
	}

	public void setWorkID(Long workID) {
		this.workID = workID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Long getStatusID() {
		return statusID;
	}

	public void setStatusID(Long status) {
		this.statusID = status;
	}
	
	
}
