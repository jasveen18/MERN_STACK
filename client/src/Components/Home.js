import React,{useState,useEffect} from 'react'

const Home = () => {
    const [userName, setUserName] = useState('');

    const homePage = async () =>{
        try{
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUserName(data.name);

        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        homePage();
    }, []);

    return (
        <>
            <div className='home-page'>
                <h2>welcome</h2>
                <h1>{userName}</h1>
            </div>
        </>
    )
}

export default Home
