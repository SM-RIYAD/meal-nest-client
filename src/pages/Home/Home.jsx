
import Banner from './Banner/Banner';
import PageTitle from '../../Components/PageTitle';
import Mealtab from './Mealtab';
import Banner2 from './Banner/Banner2';
import Membership from './Membership/Membership';
import FAQ from './FAQ/FAQ';

import Subscribe from './Subscribe/Subscribe';
import Chefs from './Chefs/Chefs';
import YourLiking from './yourLiking/YourLiking';

const Home = () => {
    return (
        <div className=''>
            
            <Banner></Banner>
            
        <PageTitle title={"Home" }/>
          
            <Mealtab/>
          
            <YourLiking></YourLiking>
            <Membership></Membership>
            <Subscribe></Subscribe>
            <Chefs></Chefs>

            <FAQ></FAQ>






        </div>
    );
};

export default Home;