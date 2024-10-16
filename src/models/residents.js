class Resident{
    constructor(resident_id = null, apartment_id, firstname, lastname, date_of_birth, email, phone, SSN, status, password, delflag){
        this.resident_id = resident_id;  // resident_id is primary key
        this.apartment_id = apartment_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.phone = phone;
        this.SSN = SSN;
        this.status = status;
        this.password = password;
        this.delflag = delflag;
    }
  }

  
module.exports = Resident;