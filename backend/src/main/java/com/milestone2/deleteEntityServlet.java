package com.milestone2;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class deleteEntityServlet
 * Mapped to /deleteData.do in web.xml.
 */
public class deleteEntityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public deleteEntityServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Connection connection=null;
		try{
			connection = DBConfig.getConnection();
			String deleteId = request.getParameter("deleteId");
			String query = "DELETE FROM invoice_details WHERE doc_id = (?)";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, deleteId);
			int no_of_rows = statement.executeUpdate();
			System.out.println("No of rows affected : "+ no_of_rows);
		}
		catch(SQLException se)
		{
		    //Handling errors for JDBC
		    se.printStackTrace();
		}
		catch(Exception e)
		{
		    //Handling errors for Class.forName
		    e.printStackTrace();
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
