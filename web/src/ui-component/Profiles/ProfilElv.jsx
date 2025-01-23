/* eslint-disable prettier/prettier */
import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from 'hooks/useFetch';
import User1 from 'assets/images/users/user-round.svg';



const ProfilElv = ({ id }) => {
    const [dataStudent, setDataStudent] = useState({});
    const { data, loading } = useFetch(`http://localhost:3001/api1/v1/students/getStudent/${id}`);

    useEffect(() => {
        if (data) {
            setDataStudent(data.student);
        }
    }, [data]);

    let fil = "";
    let sem = "";

    if (data) {
        fil = data.student.filieres.nomFiliere;
        sem = data.student.semestre.nomSemestre;
    }

    return (
        <>
            {loading ? "loading ...." :
                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    {/* Cover Header */}
                    <div style={{ backgroundColor: '#5D6D7E', color: '#fff', padding: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', display: 'flex', alignItems: 'center' }}>
                        {/* Image */}
                        <div style={{ marginRight: '20px' }}>
                            <img src={User1} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '5px solid white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} />
                        </div>
                        {/* Lecturer's Name */}
                        <div>
                            <h1 style={{ color: "white" }}>{dataStudent.nom} {dataStudent.prenom}</h1>
                            <h3 style={{ color: "white" }}>Lecturer</h3>
                        </div>
                    </div>
                    {/* Information */}
                    <div style={{ marginTop: '20px', color: '#333' }}>
                        <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                <div>
                                    <h4 >ID No:</h4>
                                    <p>{dataStudent.cin}</p>
                                </div>
                                <div>
                                    <h4 >Telephone :</h4>
                                    <p>{dataStudent.telephone}</p>
                                </div>
                                <div>
                                    <h4 >Date of Birth :</h4>
                                    <p>{dataStudent.dateDeNaissance}</p>
                                </div>
                                <div>
                                    <h4 >Place of Birth :</h4>
                                    <p>{dataStudent.lieuDeNaissance}</p>
                                </div>
                                <div>
                                    <h4 >Address :</h4>
                                    <p>{dataStudent.adresse}</p>
                                </div>
                                <div>
                                    <h4 >Academic program :</h4>
                                    <p>{fil}</p>
                                </div>
                                <div>
                                    <h4 >Semester :</h4>
                                    <p>{sem}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProfilElv;

