package com.shore.api;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.Executors;

public class RadiantHarborServer {
  private static final int PORT = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
    server.createContext("/api/site", exchange -> handleJson(exchange, readSiteJson()));
    server.createContext("/api/health", exchange -> handleJson(exchange, "{\"status\":\"ok\"}"));
    server.setExecutor(Executors.newFixedThreadPool(4));
    server.start();

    System.out.println("Radiant Harbor API listening on http://localhost:" + PORT);
  }

  private static void handleJson(HttpExchange exchange, String body) throws IOException {
    Headers headers = exchange.getResponseHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
      exchange.sendResponseHeaders(204, -1);
      exchange.close();
      return;
    }

    byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
    exchange.sendResponseHeaders(200, bytes.length);
    exchange.getResponseBody().write(bytes);
    exchange.close();
  }

  private static String readSiteJson() throws IOException {
    Path primary = Path.of("data", "site.json");
    if (Files.exists(primary)) {
      return Files.readString(primary, StandardCharsets.UTF_8);
    }

    Path fallback = Path.of("backend", "data", "site.json");
    return Files.readString(fallback, StandardCharsets.UTF_8);
  }
}
