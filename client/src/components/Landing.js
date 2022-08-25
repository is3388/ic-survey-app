import React from 'react'
import {FaRegSmile, FaRegSadCry, FaRegAngry, FaRegSmileWink, FaQuestionCircle} from 'react-icons/fa'

const Landing = () => {
    return (
        <div className='center'>
            <div className="col s12 m7">
                <div className='header spacing'> 
                <FaQuestionCircle className='icon-size' />
                <FaRegSmile className='icon-size' />
                <FaRegSmileWink className='icon-size' />
                <span className='text-header'>COLLECT FEEDBACK FROM USERS</span>
                <FaRegAngry className='icon-size' />
                <FaRegSadCry className='icon-size' />
                <FaQuestionCircle className='icon-size' />
                </div>
    <div className="card horizontal">
      <div className="card-image">
        <img src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=600" alt='' />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p style={{textAlign: 'left'}}><span style={{fontWeight:'600'}}>Collecting</span> customers feedback is crucial in managing customer satisfaction and loyalty. But how can you be sure that your efforts bring desired results? Their opinions about experience they have with your brand is helpful information that you can use to adjust your business to fit their needs more accurately.</p><br /> 
          <p style={{textAlign: 'left'}}>If you want to stay on top of things you should put your customers in a center of your business and treat their feedback as the most valuable source for information in your company. They are the ones who use your products and services, so they know best what could be improved to make them even more happy. Remember make use of customer feedback at all corporate levels and across all departments in your company. Insights will help you develop your products, improve customer service, and manage customer satisfaction. </p>
        </div>
        
      </div>
    </div>
  </div>
        </div>
    )
}

export default Landing