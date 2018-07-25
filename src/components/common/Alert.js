import React from 'react';


export const Alert = ({isError , errorMessage, type}) => {
 return (
    isError && 
        <div className={"alert alert-" + type + " mt10"}>
          {errorMessage}
          <button type="button" className="close" onClick={this.handleClick} ><span aria-hidden="true">&times;</span></button>
       </div>
 )
}