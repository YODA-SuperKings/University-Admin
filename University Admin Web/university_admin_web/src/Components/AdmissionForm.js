import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

function AdmissionForm(){
    const navigate = useNavigate();
    //General Details
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [dob, setDOB] = useState(null);
    const [male, setMale] = useState(null);
    const [female, setFemale] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    //Admission Information
    const [applicationType, setApplicationType] = useState(null);
    const [semester, setSemester] = useState(null);
    const [courseAppliedFor, setCourseAppliedFor] = useState(null);
    //High School Education
    const [lastHighSchoolName, setLastHighSchoolName] = useState(null);
    const [graduatedYear, setGraduatedYear] = useState(null);
    const [highSchoolPercentage, setHighSchoolPercentage] = useState(0);
    const [highSchoolAddress, setHighSchoolAddress] = useState(null);
    const [highSchoolCity, setHighSchoolCity] = useState(null);
    const [highSchoolState, setHighSchoolState] = useState(null);
    const [highSchoolZipCode, setHighSchoolZipCode] = useState(null);
    const [highSchoolCountry, setHighSchoolCountry] = useState(null);
    //Parent Details
    const [fatherName, setFatherName] = useState(null);
    const [motherName, setMotherName] = useState(null);
    const [guardianOccupation, setGuardianOccupation] = useState(null);
    const [guardianIncome, setGuardianIncome] = useState(null);
    const [guardianPhoneNumber, setGuardianPhoneNumber] = useState(null);
    const [guardianAddress, setGuardianAddress] = useState(null);
    const [guardianCity, setGuardianCity] = useState(null);
    const [guardianState, setGuardianState] = useState(null);
    const [guardianZipCode, setGuardianZipCode] = useState(null);
    const [guardianCountry, setGuardianCountry] = useState(null);
    const [countries, setCountries] = useState([]);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        //General Details
        if(id === "firstName")
            setFirstName(value);
        if(id === "lastName")
            setLastName(value);
        if(id === "dob")
            setDOB(value);
        if(id === "gender_male")
            setMale(value);
        else
            setFemale(value);
        if(id === "email")
            setEmail(value);
        if(id === "phoneNumber")
            setPhoneNumber(value);
        //Admission information
        if(id === "applicationType")
            setApplicationType(value);
        if(id === "semester")
            setSemester(value);
        if(id === "courseAppliedFor")
            setCourseAppliedFor(value);
        //High School Education
        if(id === "lastHighSchoolName")
            setLastHighSchoolName(value);
        if(id === "graduatedYear")
            setGraduatedYear(value);
        if(id === "highSchoolPercentage")
            setHighSchoolPercentage(value);
        if(id === "highSchoolAddress")
            setHighSchoolAddress(value);
        if(id === "highSchoolCity")
            setHighSchoolCity(value);
        if(id === "highSchoolState")
            setHighSchoolState(value);
        if(id === "highSchoolZipCode")
            setHighSchoolZipCode(value);
        if(id === "highSchoolCountry")
            setHighSchoolCountry(value);
        //Parent Details
        if(id === "fatherName")
            setFatherName(value);
        if(id === "motherName")
            setMotherName(value);
        if(id === "guardianOccupation")
            setGuardianOccupation(value);
        if(id === "guardianIncome")
            setGuardianIncome(value);
        if(id === "guardianPhoneNumber")
            setGuardianPhoneNumber(value);
        if(id === "guardianAddress")
            setGuardianAddress(value);
        if(id === "guardianCity")
            setGuardianCity(value);
        if(id === "guardianState")
            setGuardianState(value);
        if(id === "guardianZipCode")
            setGuardianZipCode(value);
        if(id === "guardianCountry")
            setGuardianCountry(value);
    }

    const getCountries= () => {
        fetch('https://localhost:44343/api/Countries/GetCountries', 
        { 
            method: 'GET',
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            setCountries(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getCountries();
     }, [])

     const saveAdmission = () => {
        debugger;
        let toastColor = '';
        const postBody = {
            FirstName: firstName,
            LastName: lastName,
            DateofBirth: dob,
            Email: email,
            PhoneNumber: phoneNumber,
            Gender: (male !== null) ? "Male" : "Female",
            ApplicationType: applicationType,
            Semester: semester,
            CourseAppliedType: courseAppliedFor,
            SchoolName: lastHighSchoolName,
            GraduatedYear: graduatedYear,
            Percentage: parseFloat(highSchoolPercentage),
            Address: highSchoolAddress,
            City: highSchoolCity,
            State: highSchoolState,
            ZipCode: highSchoolZipCode,
            Country: highSchoolCountry,
            FatherName: fatherName,
            MotherName: motherName,
            Occupation: guardianOccupation,
            Income: parseFloat(guardianIncome),
            FatherPhoneNumber: guardianPhoneNumber,
            CurrentAddress: guardianAddress,
            CurrentCity: guardianCity,
            CurrentState: guardianState,
            CurrentZipCode: guardianZipCode,
            CurrentCountry: guardianCountry
        };
        fetch('https://localhost:44343/api/Student/CreateStudent', 
        { 
            method: 'POST',
            body: JSON.stringify(postBody),
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            if(data === "Email already exists.")
                toastColor = 'Red';
            else{
                toastColor = 'Green';
            }
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     };

    const handleSaveSubmit  = (e) => {
        if(firstName === null || firstName === "")
        {
            toast(<><b style={{ color: 'Red' }}>First Name Required.</b></>, { position: 'top-right' });
        }
        else if(lastName === null || lastName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Last Name Required.</b></>, { position: 'top-right' });
        }
        else if(dob === null || dob === "")
        {
            toast(<><b style={{ color: 'Red' }}>Date Of Birth Required.</b></>, { position: 'top-right' });
        }
        else if(email === null || email === "")
        {
            toast(<><b style={{ color: 'Red' }}>Email Required.</b></>, { position: 'top-right' });
        }
        else if(phoneNumber === null || phoneNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>Phone Number Required.</b></>, { position: 'top-right' });
        }
        else if(applicationType === null)
        {
            toast(<><b style={{ color: 'Red' }}>Application Type Required.</b></>, { position: 'top-right' });
        }
        else if(semester === null)
        {
            toast(<><b style={{ color: 'Red' }}>Admission Application For Required.</b></>, { position: 'top-right' });
        }
        else if(courseAppliedFor === null)
        {
            toast(<><b style={{ color: 'Red' }}>Course Applied For Required.</b></>, { position: 'top-right' });
        }
        else if(lastHighSchoolName === null || lastHighSchoolName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Name Of Last High School Attended Required.</b></>, { position: 'top-right' });
        }
        else if(graduatedYear === null || graduatedYear === "")
        {
            toast(<><b style={{ color: 'Red' }}>Graduated Year Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolPercentage === null || highSchoolPercentage === "")
        {
            toast(<><b style={{ color: 'Red' }}>Percentage Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolAddress === null || highSchoolAddress === "")
        {
            toast(<><b style={{ color: 'Red' }}>High School - Address Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolCity === null || highSchoolCity === "")
        {
            toast(<><b style={{ color: 'Red' }}>High School - City Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolState === null || highSchoolState === "")
        {
            toast(<><b style={{ color: 'Red' }}>High School - State Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolZipCode === null || highSchoolZipCode === "")
        {
            toast(<><b style={{ color: 'Red' }}>High School - Zip Code Required.</b></>, { position: 'top-right' });
        }
        else if(highSchoolCountry === null || highSchoolCountry === "")
        {
            toast(<><b style={{ color: 'Red' }}>High School - Country Required.</b></>, { position: 'top-right' });
        }
        else if(fatherName === null || fatherName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Father Name Required.</b></>, { position: 'top-right' });
        }
        else if(motherName === null || motherName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Mother Name Required.</b></>, { position: 'top-right' });
        }
        else if(guardianPhoneNumber === null || guardianPhoneNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - Phone Number Required.</b></>, { position: 'top-right' });
        }
        else if(guardianAddress === null || guardianAddress === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - Address Required.</b></>, { position: 'top-right' });
        }
        else if(guardianCity === null || guardianCity === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - City Required.</b></>, { position: 'top-right' });
        }
        else if(guardianState === null || guardianState === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - State Required.</b></>, { position: 'top-right' });
        }
        else if(guardianZipCode === null || guardianZipCode === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - Zip Code Required.</b></>, { position: 'top-right' });
        }
        else if(guardianCountry === null || guardianCountry === "")
        {
            toast(<><b style={{ color: 'Red' }}>Parent Details - Country Required.</b></>, { position: 'top-right' });
        }
        else{
            saveAdmission();
            navigate("/");
        }
    }

    const handleCancelSubmit  = (e) => {
        navigate("/");
    }

    return (
        <div className="form-admission">
         <div><h1 className= "document_header">ADMISSION FORM</h1></div>
        <div className="form-admission-body">
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h1 className="formsection">General Details</h1></Accordion.Header>
                <Accordion.Body>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="firstName">First Name </label><br></br>
                        <input className="form-control" type="text" id="firstName" value={firstName} onChange = {(e) => handleInputChange(e)} placeholder="First Name"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="lastName">Last Name </label><br></br>
                        <input className="form-control" type="text" id="lastName" value={lastName} onChange = {(e) => handleInputChange(e)} placeholder="Last Name"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="dob">Date of Birth </label><br></br>
                        <input  type="date" name="" id="dob" className="form-control" value={dob} onChange = {(e) => handleInputChange(e)} placeholder="Date of Birth"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="email">Email </label><br></br>
                            <input  type="email" id="email" className="form-control" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                        </div>
                        <div className='col-md-4' style={{paddingLeft: "1.5%"}}>
                            <label className="form_label" for="phoneNumber">Phone Number </label><br></br>
                            <input className="form-control" type="number" id="phoneNumber" value={phoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="Phone Number"/>
                        </div>
                        <div className='col-md-4' style={{paddingLeft: "2%"}}>
                            <label className="form_label" for="gender">Gender </label><br></br>
                            <div id="gender" onChange={(e) => handleInputChange(e)}>
                                <input type="radio" id="gender_male" defaultChecked value={male} name="gender" /> Male &nbsp;
                                <input type="radio" id="gender_female" value={female} name="gender" /> Female
                            </div>
                        </div>
                    </div>
                </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header> <h1 className="formsection">Admission Information</h1></Accordion.Header>
                <Accordion.Body>
                  <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="applicationType">Application Type </label><br></br>
                        <select className="form-control" id="applicationType" value={applicationType} onChange = {(e) => handleInputChange(e)}>
                            <option value={0}>-Select-</option>
                            <option value={1}>Freshman</option>
                            <option value={2}>Transferee</option>
                            <option value={3}>Other</option>
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="semester">Semester </label><br></br>
                        <select className="form-control" id="semester" value={semester} onChange = {(e) => handleInputChange(e)}>
                            <option value={0}>-Select-</option>
                            <option value={1}>Semester 1</option>
                            <option value={2}>Semester 2</option>
                            <option value={3}>Semester 3</option>
                            <option value={4}>Semester 4</option>
                            <option value={5}>Semester 5</option>
                            <option value={6}>Semester 6</option>
                            <option value={7}>Semester 7</option>
                            <option value={8}>Semester 8</option>
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="courseAppliedFor">Course Applied Type </label><br></br>
                        <select className="form-control" id="courseAppliedFor" value={courseAppliedFor} onChange = {(e) => handleInputChange(e)}>
                            <option value={0}>-Select-</option>
                            <option value={1}>ECE</option>
                            <option value={2}>EEE</option>
                            <option value={3}>IT</option>
                            <option value={4}>CSE</option>
                            <option value={5}>MECH</option>
                        </select>
                    </div>
                 </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
             <Accordion.Header> <h1 className="formsection">High School Education</h1></Accordion.Header>
             <Accordion.Body>
             <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="lastHighSchoolName">School Name </label><br></br>
                        <input className="form-control" type="text" id="lastHighSchoolName" value={lastHighSchoolName} onChange = {(e) => handleInputChange(e)} placeholder="Name Of Last High School Attended"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="graduatedYear">Graduated Year </label><br></br>
                        <input  type="date" name="" id="graduatedYear" className="form-control" value={graduatedYear} onChange = {(e) => handleInputChange(e)} placeholder="Graduated Year"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolPercentage">Percentage </label><br></br>
                        <input className="form-control" type="number" id="highSchoolPercentage" value={highSchoolPercentage} onChange = {(e) => handleInputChange(e)} placeholder="Percentage"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolAddress">Address </label><br></br>
                        <input  type="text" name="" id="highSchoolAddress" className="form-control" value={highSchoolAddress} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolCity">City </label><br></br>
                        <input  type="text" name="" id="highSchoolCity" className="form-control" value={highSchoolCity} onChange = {(e) => handleInputChange(e)} placeholder="City"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolState">State </label><br></br>
                        <input  type="text" name="" id="highSchoolState" className="form-control" value={highSchoolState} onChange = {(e) => handleInputChange(e)} placeholder="State"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolZipCode">Zip Code </label><br></br>
                        <input  type="text" name="" id="highSchoolZipCode" className="form-control" value={highSchoolZipCode} onChange = {(e) => handleInputChange(e)} placeholder="Zip Code"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="highSchoolCountry">Country </label><br></br>
                        <select className="form-control" id="highSchoolCountry" value={highSchoolCountry} onChange = {(e) => handleInputChange(e)}>
                          {countries.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </select>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
             <Accordion.Header> <h1 className="formsection">Parental Details</h1></Accordion.Header>
             <Accordion.Body>
             <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="fatherName">Father Name </label><br></br>
                        <input className="form-control" type="text" id="fatherName" value={fatherName} onChange = {(e) => handleInputChange(e)} placeholder="Father Name"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="motherName">Mother Name </label><br></br>
                        <input className="form-control" type="text" id="motherName" value={motherName} onChange = {(e) => handleInputChange(e)} placeholder="Mother Name"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianPhoneNumber">Phone Number </label><br></br>
                        <input className="form-control" type="number" id="guardianPhoneNumber" value={guardianPhoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="Phone Number"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianOccupation">Occupation </label><br></br>
                        <input  type="text" name="" id="guardianOccupation" className="form-control" value={guardianOccupation} onChange = {(e) => handleInputChange(e)} placeholder="Occupation"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianIncome">Income </label><br></br>
                        <input  type="number" name="" id="guardianIncome" className="form-control" value={guardianIncome} onChange = {(e) => handleInputChange(e)} placeholder="Income"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianAddress">Address </label><br></br>
                        <input  type="text" name="" id="guardianAddress" className="form-control" value={guardianAddress} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianCity">City </label><br></br>
                        <input  type="text" name="" id="guardianCity" className="form-control" value={guardianCity} onChange = {(e) => handleInputChange(e)} placeholder="City"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianState">State </label><br></br>
                        <input  type="text" name="" id="guardianState" className="form-control" value={guardianState} onChange = {(e) => handleInputChange(e)} placeholder="State"/>
                    </div>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianZipCode">Zip Code </label><br></br>
                        <input  type="text" name="" id="guardianZipCode" className="form-control" value={guardianZipCode} onChange = {(e) => handleInputChange(e)} placeholder="Zip Code"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className="form_label" for="guardianCountry">Country </label><br></br>
                        <select className="form-control" id="guardianCountry" value={guardianCountry} onChange = {(e) => handleInputChange(e)}>
                          {countries.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </select>
                    </div>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'></div>
                </div>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            
            <div className="admission_footer">
                <div style={{ width: "25%", marginLeft: "39%" }}>
                    <button onClick={(e)=>handleSaveSubmit(e)} type="submit" class="btn_student_save">Submit</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdmissionForm;