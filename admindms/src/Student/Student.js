import axios from 'axios';
import {useEffect, useState } from "react";

function Student()
{
  const [id, setId] = useState('');
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [payment, setpayment] = useState("");


  const [students, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

  
  
  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8085/api/student/");
         setUsers(result.data.data);
         console.log(result.data);
  }
 
    
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8085/api/student/add",
        {
        
          stname: stname,
          course: course,
          payment: payment
        
        });
          alert("Student Registation Successfully");
         
         
          Load();
        
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }
   async function editStudent(students)
   {
    setName(students.stname);
    setCourse(students.course);
    setpayment(students.payment); 
 
    setId(students.id);
    
   }



   async function DeleteStudent(id)
   {
       
        await axios.delete("http://localhost:8085/api/student/delete/" + id); 
        alert("Student deleted Successfully");
        Load();
   
   }



   async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://localhost:8085/api/student/update/"+ students.find(u => u.id === id).id || id,
       {
         id: id,
         stname: stname,
         course: course,
         payment: payment
       
       });
         alert("Registation Updateddddd");
      
       
       }
   catch(err)
       {
         alert(" Registation Failed");
       }
  }



  return (
    <div>
       <h1>Student Details</h1>
       <div class="container mt-4" >
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="student_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
               
               />
                <label>Student Name</label>
                <input  type="text" class="form-control" id="name"
                value={stname}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>Course</label>
                <input  type="text" class="form-control" id="course" 
                 value={course}
                  onChange={(event) =>
                    {
                      setCourse(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>payment</label>
                <input type="text" class="form-control" id="payment" 
                  value={payment}
                onChange={(event) =>
                  {
                    setpayment(event.target.value);      
                  }}
                />
              </div>

                 <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>

<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Student Id</th>
      <th scope="col">Student Name</th>
      <th scope="col">Course</th>
      <th scope="col">payment</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {students.map(function fn(student)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>
                <td>{student.payment}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
 
export default Student;
