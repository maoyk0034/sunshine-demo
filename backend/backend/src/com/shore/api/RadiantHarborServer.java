package com.shore.api;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.Executors;

public class RadiantHarborServer {
  private static final int PORT = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
    server.createContext("/api/site", exchange -> routeJson(exchange, readSiteJson()));
    server.createContext("/api/health", exchange -> routeJson(exchange, "{\"status\":\"ok\"}"));
    server.setExecutor(Executors.newFixedThreadPool(4));
    server.start();

    System.out.println("Radiant Harbor API listening on http://localhost:" + PORT);
  }

  private static void routeJson(HttpExchange exchange, String body) throws IOException {
    try {
      applyJsonHeaders(exchange.getResponseHeaders());

      String method = exchange.getRequestMethod();
      if ("OPTIONS".equalsIgnoreCase(method)) {
        exchange.sendResponseHeaders(204, -1);
        return;
      }

      if (!"GET".equalsIgnoreCase(method)) {
        exchange.getResponseHeaders().set("Allow", "GET, OPTIONS");
        sendJson(exchange, 405, "{\"error\":\"method_not_allowed\"}");
        return;
      }

      sendJson(exchange, 200, body);
    } catch (IOException exception) {
      sendJson(exchange, 500, "{\"error\":\"internal_server_error\"}");
      throw exception;
    } finally {
      exchange.close();
    }
  }

  private static void applyJsonHeaders(Headers headers) {
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  private static void sendJson(HttpExchange exchange, int statusCode, String body) throws IOException {
    byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
    exchange.sendResponseHeaders(statusCode, bytes.length);

    try (OutputStream responseBody = exchange.getResponseBody()) {
      responseBody.write(bytes);
    }
  }

  private static String readSiteJson() throws IOException {
    // Prefer the backend working directory for local runs, but keep a repository-root
    // fallback so the same binary also works when launched from the workspace root.
    Path primary = Path.of("data", "site.json");
    if (Files.exists(primary)) {
      return Files.readString(primary, StandardCharsets.UTF_8);
    }

    Path fallback = Path.of("backend", "data", "site.json");
    return Files.readString(fallback, StandardCharsets.UTF_8);
  }
}
