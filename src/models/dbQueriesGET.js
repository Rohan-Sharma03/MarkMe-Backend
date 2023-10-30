// User.js
const dbService = require("../services/dbService");

const dbQueriesGET = {
  async getAllUsers() {
    const query = "SELECT * FROM students";
    const users = await dbService.query(query);
    return users;
  },

  async getAllCourses() {
    const query = "SELECT * FROM course";
    const courses = await dbService.query(query);
    return courses;
  },

  async getTimeTable(course_id) {
    try {
      const query = `
      SELECT 
      a.timetable_id AS association_timetable_id, 
      t.timetable_id, 
      t.period_type, 
      t.days_of_week, 
      t.start_time, 
      t.end_time, 
      t.venue 
  FROM 
      association a 
  LEFT JOIN 
      timetable t ON a.timetable_id = t.timetable_id 
  WHERE 
      a.course_id = UPPER('${course_id}');  
      `;
      const timetable = await dbService.query(query);
      if (timetable && timetable.length > 0) {
        console.log("Timetable data:", timetable);
        return {
          status: 200,
          success: true,
          message: "Data retrieved successfully",
          data: timetable,
        };
      } else {
        console.log("Data unavailable");
        return {
          success: false,
          message: "No data found for the provided course",
        };
      }
    } catch (err) {
      console.error("Error fetching timetable:", err);
      return { success: false, message: "Failed to fetch timetable data" };
    }
  },

  // other model methods...
};

module.exports = dbQueriesGET;
