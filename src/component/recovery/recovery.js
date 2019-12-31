import React from 'react';
import { connect } from 'react-redux';

class Recovery extends React.Component{

    render(){   

        return <div>
        <h1>This is connect</h1>
    </div>;
        
    }


}

export default connect((store)=>{

    return {}

})(Recovery);