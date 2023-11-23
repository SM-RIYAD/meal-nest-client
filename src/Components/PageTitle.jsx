import React from 'react';
import {Helmet} from "react-helmet";
const PageTitle = ({title}) => {
    return (
        <Helmet>
      
        <title>Meal Nest | {title}</title>
    
    </Helmet>
    );
};

export default PageTitle;