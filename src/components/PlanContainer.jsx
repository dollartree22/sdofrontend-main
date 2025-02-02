import React from 'react'
import PriceCard from './PriceCard.jsx';
import "./global.css"

const PlanContainer = ({setshowModal,setid,plans,update}) => {
  return (
    <div style={{ marginTop: "10vh" }} className={``}>
      <h1 data-aos="zoom-in" style={{ fontSize: "40px" }} className={`my-4 text-center`} >
        Membership Plans
      </h1>
      <div className="artists">
        {
          plans.map((item, index) => {
            return <PriceCard update={update} setid={setid} setshowModal={setshowModal} key={index} id={item._id} title={item.title} price={item.price} profit={item.profit} duration={item.duration} />
          })
        }
      </div>
      <hr style={{ maxWidth: "70vw", marginTop: "2rem" }} />
      
    </div>
  )
}

export default PlanContainer