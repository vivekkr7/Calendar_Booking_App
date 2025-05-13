class Booking {
  final String id;
  final String userId;
  final DateTime startTime;
  final DateTime endTime;

  Booking({
    required this.id,
    required this.userId,
    required this.startTime,
    required this.endTime,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'],
      userId: json['userId'],
      startTime: DateTime.parse(json['startTime']),
      endTime: DateTime.parse(json['endTime']),
    );
  }
}
