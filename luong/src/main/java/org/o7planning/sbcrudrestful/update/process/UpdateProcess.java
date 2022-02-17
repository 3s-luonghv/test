package org.o7planning.sbcrudrestful.update.process;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import java.util.Date;

import org.o7planning.sbcrudrestful.dto.ValidateUtility;
import org.o7planning.sbcrudrestful.update.dto.UpdateRequest;
import org.o7planning.sbcrudrestful.update.dto.UpdateResponse;
import org.springframework.stereotype.Component;

@Component("procUpdate")
public class UpdateProcess<DBStatement> {

	public UpdateProcess() {
		super();
	}

	public void process(UpdateRequest request, UpdateResponse response) throws Exception {
		ResultSet rs = null;
		
			try {
				UpdateRequest reqUpdate = (UpdateRequest) request;
				UpdateResponse resUpdate = (UpdateResponse) response;
				String id = reqUpdate.UpdateCondition.ID;
				String name = reqUpdate.UpdateCondition.NAME;
				String limitdate = reqUpdate.UpdateCondition.LIMMITDATE;
				String proddate = reqUpdate.UpdateCondition.PRODDATE;
				String status = reqUpdate.UpdateCondition.STATUS;
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
				strSql += "update  ";
				strSql += "  time_to_doing ";
				strSql += " SET name = ?, limmitdate = ?, proddate = ?,status = ? ";
				strSql += (" WHERE ID = ?; ");
				Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/data", "root", "123456");
				PreparedStatement pstmt = con.prepareStatement(strSql);
				int index = 1;
				pstmt.setString(index, id);
				index++;
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
