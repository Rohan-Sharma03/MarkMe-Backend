CREATE TABLE Students (
  student_id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE,
  roll_number VARCHAR(20) UNIQUE,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  course_opted VARCHAR(50)[],
  section VARCHAR(1)
);

CREATE TABLE Courses (
  course_id VARCHAR(50) PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  course_timing VARCHAR(50),
  day VARCHAR(20),
  start_time TIME,
  end_time TIME,
  venue VARCHAR(50),
  course_message VARCHAR(256),
  instructor_id VARCHAR(50),
  FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE Attendance (
  attendance_id SERIAL PRIMARY KEY,
  student_id VARCHAR(50),
  time TIME,
  date DATE,
  course_id VARCHAR(50),
  instructor_id VARCHAR(50),
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Instructors (
  instructor_id VARCHAR(50) PRIMARY KEY,
  instructor_name VARCHAR(150) NOT NULL,
  ongoing_course VARCHAR(50),
  password VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20),
  office_status VARCHAR(20)
);

CREATE TABLE Timetable (
  period_id SERIAL PRIMARY KEY,
  course_id VARCHAR(50) [],
  instructor_id VARCHAR(50),
  FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);
