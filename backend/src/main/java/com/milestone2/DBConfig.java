package com.milestone2;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConfig {
    private static final String url;
    private static final String user;
    private static final String pass;

    static {
        try (InputStream in = DBConfig.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (in == null) throw new RuntimeException("db.properties not found — copy db.properties.example to db.properties and fill in your credentials");
            Properties props = new Properties();
            props.load(in);
            url  = props.getProperty("db.url");
            user = props.getProperty("db.user");
            pass = props.getProperty("db.pass");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load db.properties", e);
        }
    }

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        return DriverManager.getConnection(url, user, pass);
    }
}
