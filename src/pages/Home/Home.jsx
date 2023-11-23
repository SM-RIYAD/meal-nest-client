
import Banner from './Banner/Banner';
import PageTitle from '../../Components/PageTitle';
import Mealtab from './Mealtab';

const Home = () => {
    return (
        <div className=''>
            
            <Banner></Banner>
        <PageTitle title={"Home" }/>
            <p>this is home</p> 
            <Mealtab/>


        </div>
    );
};

export default Home;