CREATE TABLE students (
  student_id VARCHAR(50) PRIMARY KEY,
  student_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE,
  contact_number VARCHAR(20),
  class VARCHAR(20),
  section VARCHAR(1)
);

CREATE TABLE course (
  course_id VARCHAR(50) PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  course_objective VARCHAR(256),
  instructor_id VARCHAR(50),
  timetable_id VARCHAR(50),
  FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id),
  FOREIGN KEY (timetable_id) REFERENCES timetable(timetable_id)
);

CREATE TABLE attendance (
  student_id VARCHAR(50) NOT NULL,
  course_id VARCHAR(50) NOT NULL,
  accuracy INT NOT NULL, 
  time_stamp TIMESTAMP,
  date_attended DATE,
  day_of_week DATE,
  section VARCHAR(40) NOT NULL,
  status CHAR(1) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE instructor (
  instructor_id VARCHAR(50) PRIMARY KEY,
  instructor_name VARCHAR(150) NOT NULL,
  instructor_email VARCHAR(150) NOT NULL,
  ongoing_course VARCHAR(50),
  instructor_password VARCHAR(50) NOT NULL,
  contact_number VARCHAR(20),
  instructor_designation VARCHAR(20),
  office_status VARCHAR(20)
);

CREATE TABLE timetable (
  timetable_id  VARCHAR(50) PRIMARY KEY,
  period_type VARCHAR(50),
  days_of_week DATE[],
  start_time TIME[],
  end_time TIME[],
  venue VARCHAR(50)
);

CREATE TABLE enrollment (
  student_id VARCHAR(50) NOT NULL,
  course_id VARCHAR(50) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE association (
  student_id VARCHAR(50) NOT NULL,
  timetable_id VARCHAR(50) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (timetable_id) REFERENCES timetable(timetable_id)
);

CREATE TABLE people (
  people_id VARCHAR(50) PRIMARY KEY NOT NULL,
  people_password VARCHAR(50) NOT NULL,
  login_time TIME
);
