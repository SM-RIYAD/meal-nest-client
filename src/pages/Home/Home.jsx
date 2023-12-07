
import Banner from './Banner/Banner';
import PageTitle from '../../Components/PageTitle';
import Mealtab from './Mealtab';
import Banner2 from './Banner/Banner2';
import Membership from './Membership/Membership';
import FAQ from './FAQ/FAQ';

import Subscribe from './Subscribe/Subscribe';

const Home = () => {
    return (
        <div className=''>
            
            <Banner></Banner>
            
        <PageTitle title={"Home" }/>
          
            <Mealtab/>
            <Subscribe></Subscribe>
<Membership></Membership>

<FAQ></FAQ>

        </div>
    );
};

export default Home;