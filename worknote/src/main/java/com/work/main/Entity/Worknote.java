package com.work.main.Entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "work")
public class Worknote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "work_id", nullable = false)
	private Long workID;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "start_date", nullable = false)
	private Date startDate;
	
	@Column(name = "end_date", nullable = false)
	private Date endDate;
	
	@ManyToOne
	@JoinColumn(name = "status")
	private Status status;

	public Worknote() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Worknote(Long workID, String name, Date startDate, Date endDate, Status status) {
		super();
		this.workID = workID;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
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

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	

	
}
