import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/booking.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/bookings'; //Replace it with the ipV4 address of your device

  static Future<List<Booking>> fetchBookings() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final List data = json.decode(response.body);
      return data.map((json) => Booking.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load bookings');
    }
  }

  static Future<void> createBooking(String userId, DateTime start, DateTime end) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'userId': userId,
        'startTime': start.toUtc().toIso8601String(),
        'endTime': end.toUtc().toIso8601String(),
      }),
    );

    if (response.statusCode != 201) {
      throw Exception(json.decode(response.body)['error']);
    }
  }

  static Future<void> updateBooking({
    required String id,
    required String userId,
    required DateTime start,
    required DateTime end,
  }) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'userId': userId,
        'startTime': start.toUtc().toIso8601String(),
        'endTime': end.toUtc().toIso8601String(),
      }),
    );

    if (response.statusCode != 200) {
      throw Exception(json.decode(response.body)['error']);
    }
  }

  static Future<void> deleteBooking(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception(json.decode(response.body)['error']);
    }
  }
}
