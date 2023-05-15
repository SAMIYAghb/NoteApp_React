import React, {useEffect, useState} from 'react'

import axios  from 'axios';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {
    //get all notes
    const baseUrl = 'https://sticky-note-fe.vercel.app/';
    const token = localStorage.getItem("userToken");
    const decoded = jwt_decode(token);
    // console.log(decoded);
    const userID = decoded._id;
    // console.log(userID);

    const[notes, setNotes] = useState([]);
    const[note, setNote] = useState({
        "title":"",
        "desc":"",
        token,
        "citizenID" :userID 
    });


    const getAllNotes =async () => {
        const {data} = await axios.post(baseUrl + 'getUserNotes', {token, userID});
        // console.log(data);
        setNotes(data.Notes);   
    }
    // console.log(notes);

    useEffect(() => {
        getAllNotes()     
    }, []);


    const getNote = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
   
    
    const addNote =async (e) =>{
        e.preventDefault();
        let{data} = await axios.post(baseUrl+'addNote', 
        {...note, 
            citizenID: userID,
            token: token
        });
        // console.log(data);
        // console.log(note)
        if(data.message === 'success'){
            document.getElementById('add-form').reset(); //pour vider les champs
            getAllNotes();     
            Swal.fire('Thank you! Note added whith success');     
        }

        
    }


    const deleteNote = async (NoteID) =>{ 
        // console.log(NoteID);
        
        const Swal = require('sweetalert2')
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
  
  
            (async()=>{
              let {data} = await axios.delete(baseUrl + 'deleteNote', {
                data:
                {
                  "token": token, 
                  "NoteID": NoteID}
                });
              // console.log(data);
              if(data.message === 'deleted'){
                getAllNotes();
              } 
            })();
  
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
        
    }


    //update
    const getNoteid = (index) =>{
        // console.log(index);
        // console.log(notes[index]);
        // console.log(notes[index].title);
        // console.log(notes[index].desc);
        document.querySelector('#exampleModal1 input').value = notes[index].title;
        document.querySelector('#exampleModal1 textarea').value = notes[index].desc;

        // console.log(setNote({...note, 
        //   "title": notes[index].title,
        //   "desc": notes[index].desc,
        //   "NoteID": notes[index]._id,  
        // }));

        setNote({...note, 
          "title": notes[index].title,
          "desc": notes[index].desc,
          "NoteID": notes[index]._id
        })
        
    }
    const updateNote =async(e)=>{
      e.preventDefault();
      let {data }= await axios.put(baseUrl + 'updateNote', note
      )
      // console.log(data);
      getAllNotes() 
    }

  //  end update


  return <>
  <div className="container my-5">
      <div className="col-md-12 text-end">
          <Link className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add New</Link>
      </div>
  </div>

<div className="container">
      <div className="row">
        {notes && notes.map( (note, index)=> 
        <div key={note._id} className="col-md-4 my-4">
        
        <div className="note p-4">
            <h3 className="float-start">{note.title}</h3>
            <Link 
            onClick={() => {getNoteid(index)}}data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i 
               className="fas fa-edit float-end edit"></i></Link>
            <Link> <i 
            onClick={() => {deleteNote(note._id)}} className="fas fa-trash-alt float-end px-3 del"></i></Link>
            <span className="clearfix"></span>
            <p>{note.desc}</p>     
  </div> 
    </div>
        ) 
        
        }
      </div>
</div>
  


  {/* <!-- Add Modal --> */}
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form id="add-form" onSubmit={addNote}>
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                      <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                  </div>
              </div>
          </div>
      </form>
  </div>

  {/* <!-- Edit Modal --> */}
  <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form id="edit-form"  onSubmit={updateNote}>
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <input
                      onChange={getNote}
                      placeholder="Type Title" name="title" className="form-control" type="text" />
                      <textarea 
                      onChange={getNote}
                      className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>

                      <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>

                  </div>
              </div>
          </div>
      </form>
  </div>

</>
}


