import React, {useEffect,useState} from 'react'
import Pic from '../images/sample.jpg'
import {useHistory} from 'react-router-dom'

const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const callAboutUs = async() =>{
        try{
            const res = await fetch('/about',{
                method: 'GET',
                headers: {
                    Accept: 'appllication/json',
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
            history.push('/login');
        }

    } 

    useEffect(()=>{
        callAboutUs();
    }, []);

    return (
        <>
          <div className='container emp-profile'>
              <form method="GET">
                  <div className='row'>
                      <div className='col-md-4'>
                          <div className='profile-img'>
                              <img src={Pic} alt='jasveen'></img>
                          </div>
                      </div>

                      <div className='col-md-6'>
                          <div className='profile-head'>
                              <h5>{userData.name}</h5>
                              <h6>{userData.work}</h6>
                              <p className='profile-rating mt-3 mb-5'>RANKINGS<span>1/10</span></p>

                              <ul className='nav nav-tabs' role='tablist'>
                                  <li className='nav-item'>
                                      <a className='nav-link active' id='home-tab' data-toggle='tab' href='#home' role='tab' aria-controls='home' aria-selected="true">About</a>
                                  </li>
                                  <li className='nav-item'>
                                      <a className='nav-link ' id='profile-tab' data-toggle='tab' href='#profile' role='tab' aria-controls='profile' aria-selected="false">Timeline</a>
                                  </li>
                              </ul>
                          </div>
                      </div>

                      <div className='col-md-2'>
                          <input type='submit' className='profile-edit-btn' name='btnAddMore' value='Edit Profile'></input>
                      </div>          
                  </div>

                  <div className='row'>
                      <div className='col-md-4'>
                           <div className='profile-work'>
                               <p>WORK LINK</p>
                               <a href='https://youtu.be/8f3e6rXB8Cw' target='jasveen'>Github</a> <br />
                               <a href='https://youtu.be/8f3e6rXB8Cw' target='jasveen'>Github</a> <br />
                               <a href='https://youtu.be/8f3e6rXB8Cw' target='jasveen'>Github</a> <br />
                               <a href='https://youtu.be/8f3e6rXB8Cw' target='jasveen'>Github</a> <br />
                               <a href='https://youtu.be/8f3e6rXB8Cw' target='jasveen'>Github</a> <br />
                           </div>
                      </div>


                    <div className='col-md-8 pl-5 about-info'>
                        <div className='tab-content profile-tab' id='myTabContent'>
                            <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p>User ID</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>123456789</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <p>Name</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>{userData.name}</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <p>Email</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <p>Phone</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>{userData.phone}</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <p>Profession</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>{userData.work}</p>
                                    </div>
                                </div>

                            </div>

                            <div className='tab-plane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                            <div className='row'>
                                    <div className='col-md-6'>
                                        <label>User ID</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>123456789</p>
                                    </div>

                                    <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <label>Name</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Jasveen Singh</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <label>Name</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Jasveen Singh</p>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <label>Name</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Jasveen Singh</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>



                  </div>
              </form>

          </div>
            
        </>
    )
}

export default About
