import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import PageNotFound from './pages/404';


const RoutesPath = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/filme/:id' element={<Filme />} />
                <Route exact path='/favoritos' element={<Favoritos />} />
                <Route path='/404' element={<PageNotFound />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesPath;