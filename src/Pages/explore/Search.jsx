import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Slide } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Search(props) {
    const [search, setSearch] = useState(null);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false)
  
    function findUser(e) {
      setSearch(e.target.value);
      if (e.target.value.length === 0) {
        setLoading(false)
      }
      else{
        setLoading(true)
      }
      
    }
    useEffect(() => {
      axios.post("https://instaclonebe-rfqu.onrender.com/api/search", { search: search }).then((res) => {
        if (search) {
        setLoading(false)
          setResult(res.data);
        } else {
          setResult([]);
        }
      });
    }, [search]);

  return (
    <div className="searchSec z-3 bg-light vh-100 d-none d-md-block col-12 rounded position-absolute" >
    <CloseRoundedIcon onClick={props.closeSearch} className='position-absolute end-0 m-2' />
         <div className="mt-5 w-100 p-2">
          <input
            onChange={findUser}
            placeholder="  Search.."
            className="col-12 border-0 bg-body-secondary rounded p-1 px-2"
            maxLength={30}
            type="text"
          />
{loading? <div className="spinner-border m-5 text-center" role="status"></div> : null }

          {search ? <div className="mt-3 position-absolute bg-light col-7 p-2 rounded" >
            {result.map((e,index) => {
              return (
                <Slide in={true} key={index}  direction='right' ><a href={"/"+e.username} >
                <div className="d-flex align-items-center">
                  <img
                    src={e.profile ? e.profile : "/blankProfile.png"}
                    className="rounded-circle me-2"
                    style={{ height: "40px" }}
                    alt=""
                  />
                  <p className="fw-bolder">{e.username}</p>
                </div></a></Slide>
              );
            })}
          </div> : null }
        </div>
    </div>
  )
}

export default Search