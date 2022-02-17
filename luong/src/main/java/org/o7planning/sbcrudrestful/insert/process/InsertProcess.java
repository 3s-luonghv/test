package org.o7planning.sbcrudrestful.insert.process;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import java.util.Date;

import org.o7planning.sbcrudrestful.dto.ValidateUtility;
import org.o7planning.sbcrudrestful.insert.dto.InsertRequest;
import org.o7planning.sbcrudrestful.insert.dto.InsertResponse;
import org.springframework.stereotype.Component;

@Component("procInsert")
public class InsertProcess<DBStatement> {

	public InsertProcess() {
		super();
	}

	public void process(InsertRequest request, InsertResponse response) throws Exception {
		ResultSet rs = null;
		
			try {
				InsertRequest reqInsert = (InsertRequest) request;
				InsertResponse resInsert = (InsertResponse) response;
				String name = reqInsert.insertCondition.NAME;
				String limitdate = reqInsert.insertCondition.LIMMITDATE;
				String proddate = reqInsert.insertCondition.PRODDATE;
				String status = reqInsert.insertCondition.STATUS;
		        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		        Date d1 = null;
		        Date d2 = null;
		        d1 = format.parse(proddate);
		        d2 = format.parse(limitdate);
		        long diff = d2.getTime() - d1.getTime();
		        
				if(ValidateUtility.IsDate(limitdate) || ValidateUtility.IsDate(proddate)) {
					System.out.print("Sai định dạng ngày tháng");
				}else if(diff <0) {
					System.out.print("Ngày bắt đầu không được lơn hơn ngày kết thúc");
				}else {
				
				String strSql = "";
				strSql += " INSERT INTO ";
				strSql += "  time_to_doing ";
				strSql += " (name, limmitdate, proddate,status) ";
				strSql += (" VALUES (?, ?, ?,?);");
				Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/data", "root", "123456");
				PreparedStatement pstmt = con.prepareStatement(strSql);
				int index = 1;
				pstmt.setString(index, name);
				index++;
				pstmt.setString(index, limitdate);
				index++;
				pstmt.setString(index, proddate);
				index++;
				pstmt.setString(index, status);
				index++;
				rs = pstmt.executeQuery();
				}
				
			} catch (SQLException e) {
				throw new Exception(e);
			} finally {
				try {
					if (rs != null)
						rs.close();
				} catch (SQLException e) {
					throw new Exception(e);
				}
			}
		
	
	}
}
