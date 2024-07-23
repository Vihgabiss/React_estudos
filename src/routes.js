import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Erro from './pages/Erro';
import Produto from './pages/Produto';

import Header from './components/Header';

const AppRoutes = () => {
    return(
       <BrowserRouter>
       <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />

            {/* Rota para renderizar página com id*/}  
            <Route path="/produto/:id" element={<Produto />} />

            {/* Rota para renderizar página de erro, quando uma página não for encontrada*/}  
            <Route path="*" element={<Erro />} />
            
            {/* Rota para renderizar mais de uma página ao mesmo tempo */}  
            <Route path="/both" element={<>
                <Home/>
                <Sobre/>
            </>} />


        </Routes>
       </BrowserRouter> 
    )
}

export default AppRoutes;