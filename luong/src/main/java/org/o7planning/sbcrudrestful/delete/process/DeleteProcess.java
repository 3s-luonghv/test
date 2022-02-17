package org.o7planning.sbcrudrestful.delete.process;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.o7planning.sbcrudrestful.delete.dto.DeleteRequest;
import org.o7planning.sbcrudrestful.delete.dto.DeleteResponse;
import org.springframework.stereotype.Component;

/**
 * 画面：業務マニュアルダウンロード 概要：検索
 * 
 * @param <DBStatement>
 * @param <DBStatement>
 */
@Component("procDelete")
public class DeleteProcess<DBStatement> {

	public DeleteProcess() {
		super();
	}
	
	public DeleteResponse process(DeleteRequest request, DeleteResponse response) throws Exception {
		ResultSet rs = null;
		if (ChechExist(request, response) == true) {
			System.out.print("không tồn tại id ");
			return response;
		} else {
			try {
				DeleteRequest reqDelete = (DeleteRequest) request;
				DeleteResponse resDelete = (DeleteResponse) response;
				String id = reqDelete.deleteCondition.ID;
				// SQL Query
				String strSql = "";
				strSql += " SELECT ";
				strSql += " name, limmitdate, proddate, status ";
				strSql += " FROM  ";
				strSql += "  time_to_doing ";
				strSql += " WHERE ID = ? ";
				strSql += (" ;");
				Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/data", "root", "123456");
				PreparedStatement pstmt = con.prepareStatement(strSql);
				int index = 1;
				pstmt.setString(index, id);
				index++;
				rs = pstmt.executeQuery();

				return resDelete;
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

	private Boolean ChechExist(DeleteRequest request, DeleteResponse response) throws Exception {
		ResultSet rs = null;
		try {
			String id = request.deleteCondition.ID;
			// SQL Query
			String strSql = "";
			strSql += " SELECT ";
			strSql += " name, limmitdate, proddate, status ";
			strSql += " FROM  ";
			strSql += "  time_to_doing ";
			strSql += " WHERE  ";
			strSql += " ID = ?  ";
			strSql += (" ;");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/data", "root", "123456");
			PreparedStatement pstmt = con.prepareStatement(strSql);
			int index = 1;
			pstmt.setString(index, id);
			index++;
			rs = pstmt.executeQuery();

			if (rs.next()) {
				return true;
			} else
				return false;

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
