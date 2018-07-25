import React from 'react';


export const Alert = ({isError , errorMessage, type}) => {
 return (
    isError && 
        <div className={"alert alert-" + type + " alert-dismissible mt10"}>
          {errorMessage}
          <button type="button" className="close" onClick={this.handleClick} data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       </div>
 )
}