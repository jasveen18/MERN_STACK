import React, {useEffect,useState} from 'react'

function Contact() {

    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    const callContactUs = async() =>{
        try{
            const res = await fetch('/about',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
        }

    } 

    useEffect(()=>{
        callContactUs();
    }, []);

    const handleInputs = (e) =>{
      const name = e.target.name;
      const value = e.target.value;

      setUserData({...userData, [name]:value});

    }

    const Message = async(e) =>{
      e.preventDefault();

      const {name,email,phone,message} = userData;

      const res = await fetch('/contact', {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,email,phone,message
        })
      });

      const data = await res.json();

      if(!data){
        console.log('message not send');
      }
      else{
        alert('Message Send');
        setUserData({...userData, message:""});
      }

    }


  return (
    <>
      <h1 className="text-center mt-4">Get in Touch</h1>

      <div className="container">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Your Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Your Name"
              name="name"
              value={userData.name}
              onChange={handleInputs}
            />
          </div>

          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Your Email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Your Phone</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Your Phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputs}
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Your Message</label>
            <textarea
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Your Message"
              name="message"
              value={userData.message}
              onChange={handleInputs}
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary  m-4" onClick={Message}>
              Send Message
            </button>
          </div>
          
        </form>
      </div>
    </>
  );
}

export default Contact;
