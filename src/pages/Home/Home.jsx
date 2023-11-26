
import Banner from './Banner/Banner';
import PageTitle from '../../Components/PageTitle';
import Mealtab from './Mealtab';
import Banner2 from './Banner/Banner2';
import Membership from './Membership/Membership';

const Home = () => {
    return (
        <div className=''>
            
            <Banner></Banner>
            
        <PageTitle title={"Home" }/>
          
            <Mealtab/>
<Membership></Membership>

        </div>
    );
};

export default Home;