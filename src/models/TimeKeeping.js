class TimeKeeping {
    constructor(timekeeping_id = null, employee_id, start_time, end_time, wdate,timework, overtime_hours, status,delflag) {
        this.timekeeping_id = timekeeping_id;
        this.employee_id = employee_id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.wdate = wdate;
        this.timework = timework;
        this.overtime_hours = overtime_hours;
        this.status = status;
        this.delflag = delflag;
    }
}

module.exports = TimeKeeping;