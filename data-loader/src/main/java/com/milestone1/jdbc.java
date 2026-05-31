package com.milestone1;

//Importing all the I/O related Classes
import java.io.File;
import java.io.InputStream;
import java.util.Properties;
import java.util.Scanner;

//Importing all the required Data Structures
import java.math.BigDecimal;
import java.util.ArrayList;

//Importing all JDBC related Classes
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

//Importing all time related Classes
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

//Importing any possible exceptions
import java.io.FileNotFoundException;
import java.sql.SQLException;

public class jdbc
{
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL;
	static final String USER;
	static final String PASS;

	static {
		try (InputStream in = jdbc.class.getClassLoader().getResourceAsStream("db.properties")) {
			if (in == null) throw new RuntimeException("db.properties not found — copy db.properties.example to db.properties");
			Properties props = new Properties();
			props.load(in);
			DB_URL = props.getProperty("db.url");
			USER   = props.getProperty("db.user");
			PASS   = props.getProperty("db.pass");
		} catch (Exception e) {
			throw new RuntimeException("Failed to load db.properties", e);
		}
	}

	// Default CSV location (relative to this module dir, i.e. ../database when
	// run via `mvn exec:java`). Can be overridden by passing a path as the
	// first command-line argument.
	static final String DEFAULT_CSV = "../database/1805362.csv";

	private static PreparedStatement func_to_return_query(Manager obj, PreparedStatement stm) throws SQLException, ClassNotFoundException
	{

		stm.setString(1, obj.getBusiness_code());
		stm.setString(2, obj.getCust_number());
		stm.setString(3, obj.getName_customer());

		if(obj.getClear_date() == null)
			stm.setNull(4,java.sql.Types.NULL);
		else
			stm.setObject(4,Timestamp.valueOf(obj.getClear_date()));

		stm.setInt(5, obj.getBusiness_year());
		stm.setLong(6, obj.getDoc_id());
		stm.setDate(7, Date.valueOf(obj.getPosting_date()));
		stm.setDate(8, Date.valueOf(obj.getDoc_create_date()));
		stm.setDate(9, Date.valueOf(obj.getDue_in_date()));
		stm.setString(10, obj.getInv_currency());
		stm.setString(11, obj.getDoc_type());
		stm.setInt(12,obj.getPosting_id());

		if(obj.getBusiness_area() == null)
			stm.setNull(13,java.sql.Types.NULL);
		else
			stm.setString(13, obj.getBusiness_area());

		stm.setDouble(14, obj.getTotal_open_amount());
		stm.setDate(15, Date.valueOf(obj.getBaseline_create_date()));
		stm.setString(16, obj.getCust_payment_terms());

		if(obj.getInvoice_id()==null)
			stm.setNull(17,java.sql.Types.NULL);
		else
			stm.setLong(17, obj.getInvoice_id());

		stm.setInt(18, obj.getIsOpen());

		return stm;
	}

	private static ArrayList<Manager> setData(String csvPath) throws FileNotFoundException
	{
		//Array List to be Returned
		ArrayList<Manager> list = new ArrayList<>();
		//Array List to check for Duplicacy in rows
		ArrayList<Long> doc_id = new ArrayList<>();

		//Instance of our given File
		File file= new File(csvPath);

		//To read each line of our File
		Scanner sc = new Scanner(file);

		//To remove the line with the Column Headers
		String data= sc.nextLine();
		DateTimeFormatter formatter = null;

		while(sc.hasNextLine())
		{
			data= sc.nextLine();
			//Storing each data or column values of each row
			String[] values= data.split(",");

			//Temporary Object to be added in our required ArrayList
			Manager obj = new Manager();

			//Checking for Duplicate Value
			if(doc_id.contains((new BigDecimal(values[5])).longValue()))
				continue;

			doc_id.add(((new BigDecimal(values[5])).longValue()));

			obj.setBusiness_code(values[0]);
			obj.setCust_number(values[1]);
			obj.setName_customer(values[2]);

			if(!values[3].isEmpty())
			{
				formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				obj.setClear_date(LocalDateTime.parse(values[3], formatter));
			}

			obj.setBusiness_year(((new BigDecimal(values[4])).intValue()));
			obj.setDoc_id((new BigDecimal(values[5])).longValue());

			formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			obj.setPosting_date(LocalDate.parse(values[6], formatter));

			formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
			obj.setDoc_create_date(LocalDate.parse(values[7], formatter));

			formatter = DateTimeFormatter.ofPattern("yyyyMMdd.H");
			obj.setDue_in_date(LocalDate.parse(values[9], formatter));

			obj.setInv_currency(values[10]);
			obj.setDoc_type(values[11]);
			obj.setPosting_id(((new BigDecimal(values[12])).intValue()));

			if(!values[13].isEmpty())
				obj.setBusiness_area(values[13]);

			obj.setTotal_open_amount(Double.parseDouble(values[14]));
			obj.setBaseline_create_date(LocalDate.parse(values[15],formatter));

			obj.setCust_payment_terms(values[16]);

			if(!values[17].isEmpty())
				obj.setInvoice_id(((new BigDecimal(values[17])).longValue()));

			obj.setIsOpen(Integer.parseInt(values[18]));

			list.add(obj);
		}
		sc.close();
		return list;
	}

	public static void main(String[] args)
	{
		Connection conn = null;
		PreparedStatement stmt = null;

		//Allow the CSV path to be passed as the first argument; otherwise use the default.
		String csvPath = (args.length > 0) ? args[0] : DEFAULT_CSV;
		System.out.println("Reading CSV from: " + csvPath);

		try
		{
			//Array List of Manager Classes to Store the required data from csv file
			ArrayList<Manager> list = setData(csvPath);
			System.out.println("Parsed rows: " + list.size());

			//Registering the Driver
			Class.forName(JDBC_DRIVER);

			//Establishing Connection with the Required Database
			conn = DriverManager.getConnection(DB_URL,USER,PASS);

			//Creating the Statement Object (columns listed explicitly so the
			//extra `notes` column added in milestone2 does not break the insert)
			stmt = conn.prepareStatement("INSERT INTO invoice_details ("
					+ "business_code, cust_number, name_customer, clear_date, business_year, "
					+ "doc_id, posting_date, document_create_date, due_in_date, invoice_currency, "
					+ "document_type, posting_id, area_business, total_open_amount, baseline_create_date, "
					+ "cust_payment_terms, invoice_id, isOpen) "
					+ "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

			for(int i = 0;i<list.size();i++)
			{
				//Getting the required Prepared Statement with Values set in it
				stmt = func_to_return_query(list.get(i),stmt);

				//Adding the Prepared Statement to the Batch
				stmt.addBatch();

				//Executing the Batch at an interval of 1000 Entries
				if((i+1)%1000 == 0)
				{
					stmt.executeBatch();
					System.out.println("Executed rows: "+(i+1));
				}
			}

			//Executing any Remaining Statements
			stmt.executeBatch();

			stmt.close();
			conn.close();
			System.out.println("Done. Inserted " + list.size() + " rows.");
		}

		//Exception Handling
		catch(FileNotFoundException fnfe)
		{
			System.out.println("No such file exists / wrong path given");
			fnfe.printStackTrace();
		}
		catch(SQLException se)
		{
			se.printStackTrace();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(stmt!=null)
					stmt.close();
				if(conn!=null)
					conn.close();
			}
			catch(SQLException se)
			{
				se.printStackTrace();
			}
		}
	}
}
